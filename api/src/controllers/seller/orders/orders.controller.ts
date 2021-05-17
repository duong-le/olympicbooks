import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { Order } from '../../../entities/orders.entity';
import { Seller } from '../../../entities/sellers.entity';
import { OrdersService } from '../../../services/orders.service';
import { ShippingState } from '../../../shared/Enums/shippings.enum';
import { UpdateOrderDto } from './orders.dto';

@ApiTags('Shop Orders')
@ApiBearerAuth()
@Controller('shops/:shopId/orders')
@UseGuards(AuthGuard())
export class ShopOrdersController {
  constructor(
    public service: OrdersService,
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) {}

  @ApiOperation({ summary: 'Retrieve many Order' })
  @Get()
  async getMany(@Param('shopId', ParseIntPipe) shopId: number, @UserInfo() seller: Seller): Promise<Order[]> {
    return await this.service.getManyOrdersByShopAndSeller(shopId, seller.id);
  }

  @ApiOperation({ summary: 'Retrieve a single Product' })
  @Get(':orderId')
  async getOne(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('orderId', ParseIntPipe) orderId: number,
    @UserInfo() seller: Seller
  ): Promise<Order> {
    const order = await this.service.getOneOrderByShopAndSeller(orderId, shopId, seller.id);
    if (!order) throw new NotFoundException(`Order ${orderId} not found`);
    return order;
  }

  @ApiOperation({ summary: 'Update a single Product' })
  @Patch(':orderId')
  async updateOne(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('orderId', ParseIntPipe) orderId: number,
    @UserInfo() seller: Seller,
    @Body() dto: UpdateOrderDto
  ): Promise<Order> {
    const order = await this.service.getOneOrderByShopAndSeller(orderId, shopId, seller.id);
    if (!order) throw new NotFoundException(`Order ${orderId} not found`);

    if (dto?.transaction?.state) order.transaction.state = dto.transaction.state;

    if (dto?.shipping?.state) {
      order.shipping.state = dto.shipping.state;

      switch (dto.shipping.state) {
        case ShippingState.DELIVERED:
          if (!order.shipping.deliveryDate) order.shipping.deliveryDate = new Date();
          break;
        case ShippingState.CANCELLED:
          order.shipping.deliveryDate = null;
          break;
      }
    }

    if (dto?.shipping?.fee) {
      order.transaction.value += -order.shipping.fee + dto.shipping.fee;
      order.shipping.fee = dto.shipping.fee;
    }

    if (dto?.shipping?.code) order.shipping.code = dto.shipping.code;

    if (dto?.buyerNote) order.buyerNote = dto.buyerNote;

    if (dto?.sellerNote) order.sellerNote = dto.sellerNote;

    return await this.orderRepository.save(order);
  }
}
