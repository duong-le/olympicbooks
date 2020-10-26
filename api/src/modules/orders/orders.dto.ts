import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, ValidateNested, IsArray, Validate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTransactionDto, UpdateTransactionDto } from '../transactions/transactions.dto';
import { CreateShippingDto, UpdateShippingDto } from '../shippings/shippings.dto';
import { CreateOrderItemDto } from './orders-item/orders-item.dto';
import { Exist } from 'src/shared/Validators/exist/exist.service';
import { TransactionMethod } from '../transactions/transaction-methods.entity';
import { ShippingMethod } from '../shippings/shipping-methods.entity';
import { ArrayExist } from '../../shared/Validators/array-exist/array-exist.service';
import { Product } from '../products/products.entity';

export class CreateOrderDto {
  @ApiProperty({ type: CreateTransactionDto })
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateTransactionDto)
  @Validate(
    Exist,
    [
      TransactionMethod,
      ({ value: { transactionMethodId } }: { value: CreateTransactionDto }) => ({ id: transactionMethodId })
    ],
    {
      message: () => 'Transaction method not found'
    }
  )
  transaction: CreateTransactionDto;

  @ApiProperty({ type: CreateShippingDto })
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateShippingDto)
  @Validate(
    Exist,
    [ShippingMethod, ({ value: { shippingMethodId } }: { value: CreateShippingDto }) => ({ id: shippingMethodId })],
    {
      message: () => 'Shipping method not found'
    }
  )
  shipping: CreateShippingDto;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateOrderItemDto)
  @Validate(ArrayExist, [Product, 'id', 'productId'], {
    message: () => 'Product not found'
  })
  orderItems: CreateOrderItemDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  buyerNote: string;
}

export class UpdateOrderDto {
  @ApiPropertyOptional({ type: UpdateTransactionDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateTransactionDto)
  transaction: UpdateTransactionDto;

  @ApiPropertyOptional({ type: UpdateShippingDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateShippingDto)
  shipping: UpdateShippingDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  buyerNote: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sellerNote: string;
}
