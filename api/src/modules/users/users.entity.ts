import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from 'src/shared/Enums/roles.enum';
import { Order } from '../orders/orders.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  phoneNumber: string;

  @Column({ default: false })
  isBlock: boolean;

  @Column({ enum: Role, default: Role.CUSTOMER })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[];
}
