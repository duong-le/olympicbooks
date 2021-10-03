import { BadRequestException, Controller, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudAuth, CrudController, Override, ParsedBody } from '@nestjsx/crud';
import { ShippingMethod } from 'src/entities/shipping-methods.entity';
import { TransactionMethod } from 'src/entities/transaction-methods.entity';
import { ProductStatus } from 'src/shared/Enums/products.enum';
import { Repository } from 'typeorm';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { JwtAuthGuard } from '../../../core/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/Guards/roles.guard';
import { CartItem } from '../../../entities/carts.entity';
import { Customer } from '../../../entities/customers.entity';
import { OrderItem } from '../../../entities/orders-item.entity';
import { Order } from '../../../entities/orders.entity';
import { CartsService } from '../../../services/carts.service';
import { OrdersService } from '../../../services/orders.service';
import { UserType } from '../../../shared/Enums/users.enum';
import { CreateOrderDto } from './orders.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('customers/me/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.CUSTOMER)
@Crud({
  model: { type: Order },
  routes: { only: ['getOneBase', 'getManyBase', 'createOneBase'] },
  query: {
    join: {
      orderItems: { eager: true, exclude: ['orderId', 'productId'] },
      'orderItems.product': { eager: true },
      transaction: { eager: true, exclude: ['transactionMethodId'] },
      'transaction.transactionMethod': { eager: true },
      shipping: { eager: true, exclude: ['shippingMethodId'] },
      'shipping.shippingMethod': { eager: true }
    },
    exclude: ['transactionId', 'shippingId']
  },
  dto: { create: CreateOrderDto }
})
@CrudAuth({
  property: 'user',
  filter: (customer: Customer) => ({ customerId: customer.id })
})
export class OrdersController implements CrudController<Order> {
  constructor(
    public service: OrdersService,
    public cartService: CartsService,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(ShippingMethod) private shippingMethodRepository: Repository<ShippingMethod>,
    @InjectRepository(TransactionMethod) private transactionMethodRepository: Repository<TransactionMethod>,
    @InjectRepository(CartItem) private cartRepository: Repository<CartItem>
  ) {}

  @Override()
  async createOne(@ParsedBody() dto: CreateOrderDto, @UserInfo() customer: Customer): Promise<Order> {
    if (!customer.address || !customer.phoneNumber)
      throw new BadRequestException('Missing address or phone number');

    const shippingMethod = await this.shippingMethodRepository.findOne(dto.shippingMethodId);
    if (!shippingMethod) throw new NotFoundException(`Shipping method ${dto.shippingMethodId} not found`);
    if (shippingMethod.disabled) throw new BadRequestException('Shipping method is disabled');

    const transactionMethod = await this.transactionMethodRepository.findOne(dto.transactionMethodId);
    if (!transactionMethod)
      throw new NotFoundException(`Transaction method ${dto.transactionMethodId} not found`);
    if (transactionMethod.disabled) throw new BadRequestException('Transaction method is disabled');

    const cartItems = await this.cartRepository.find({ customerId: customer.id });
    for (const cartItem of cartItems) {
      if (cartItem?.product?.status !== ProductStatus.ACTIVE)
        throw new BadRequestException(`Product ${cartItem.productId} is not active`);
    }

    const orderItems: OrderItem[] = [];

    for (const cartItem of cartItems) {
      const orderItem = this.orderItemRepository.create({
        quantity: cartItem.quantity,
        totalValue: cartItem.quantity * cartItem.product.price,
        productTitle: cartItem.product.title,
        productId: cartItem.product.id
      });
      orderItems.push(orderItem);
    }

    const order = await this.orderRepository.save({
      customerId: customer.id,
      transaction: {
        transactionMethodId: dto.transactionMethodId,
        value: this.service.calculateOrderValue(orderItems, shippingMethod.fee)
      },
      shipping: {
        name: customer.name,
        address: customer.address,
        phoneNumber: customer.phoneNumber,
        shippingMethodId: shippingMethod.id,
        fee: shippingMethod.fee
      },
      orderItems,
      buyerNote: dto.buyerNote
    });

    await this.cartRepository.delete({ customerId: customer.id });

    return order;
  }
}
