import { Controller, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudAuth, CrudController, Override, ParsedBody } from '@nestjsx/crud';
import { ShippingMethod } from 'src/entities/shipping-methods.entity';
import { TransactionMethod } from 'src/entities/transaction-methods.entity';
import { Repository } from 'typeorm';

import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { CartItem } from '../../../entities/carts.entity';
import { Customer } from '../../../entities/customers.entity';
import { OrderItem } from '../../../entities/orders-item.entity';
import { Order } from '../../../entities/orders.entity';
import { CartsService } from '../../../services/carts.service';
import { OrdersService } from '../../../services/orders.service';
import { CreateOrderDto } from './orders.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('customers/me/orders')
@UseGuards(AuthGuard())
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
      'shipping.shippingMethod': { eager: true },
      discount: { eager: true }
    },
    exclude: ['transactionId', 'shippingId', 'discountId']
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
  async createOne(@ParsedBody() dto: CreateOrderDto, @UserInfo() customer: Customer): Promise<Order[]> {
    const shippingMethod = await this.shippingMethodRepository.findOne(dto.shippingMethodId);
    if (!shippingMethod) throw new NotFoundException(`Shipping method ${dto.shippingMethodId} not found`);

    const transactionMethod = await this.transactionMethodRepository.findOne(dto.transactionMethodId);
    if (!transactionMethod)
      throw new NotFoundException(`Transaction method ${dto.transactionMethodId} not found`);

    // Split into multiple orders based on the product's shop
    const orders: Order[] = [];
    const cart = await this.cartService.getCartOrderedByShop(customer.id);

    for (const [shopId, cartItems] of Object.entries(cart)) {
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
        shopId: Number(shopId),
        buyerNote: dto.buyerNote
      });

      orders.push(order);
    }

    await this.cartRepository.delete({ customerId: customer.id });

    return orders;
  }
}
