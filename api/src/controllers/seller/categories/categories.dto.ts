import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateAttributeValueDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  value: string;
}

export class UpdateAttributeValueDto extends PartialType(CreateAttributeValueDto) {}
