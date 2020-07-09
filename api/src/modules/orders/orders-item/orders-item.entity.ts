import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../../products/products.entity';
import { Order } from '../orders.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  totalValue: number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @ManyToOne((type) => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne((type) => Product, (product) => product.orderItems, { eager: true })
  product: Product;
}
