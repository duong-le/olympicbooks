import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';

import { ArrayExist } from '../../../core/Validators/array-exist/array-exist.service';
import { Exist } from '../../../core/Validators/exist/exist.service';
import { Product } from '../../../entities/products.entity';
import { ShippingMethod } from '../../../entities/shipping-methods.entity';
import { TransactionMethod } from '../../../entities/transaction-methods.entity';
import { CreateShippingDto, UpdateShippingDto } from '../shippings/shippings.dto';
import { CreateTransactionDto, UpdateTransactionDto } from '../transactions/transactions.dto';
import { CreateOrderItemDto } from './orders-item/orders-item.dto';

export class CreateOrderDto {
  @ApiProperty({ type: CreateTransactionDto })
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateTransactionDto)
  @Validate(
    Exist,
    [TransactionMethod, ({ value: { transactionMethodId } }: { value: CreateTransactionDto }) => ({ id: transactionMethodId })],
    {
      message: () => 'Transaction method not found'
    }
  )
  transaction: CreateTransactionDto;

  @ApiProperty({ type: CreateShippingDto })
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateShippingDto)
  @Validate(Exist, [ShippingMethod, ({ value: { shippingMethodId } }: { value: CreateShippingDto }) => ({ id: shippingMethodId })], {
    message: () => 'Shipping method not found'
  })
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
