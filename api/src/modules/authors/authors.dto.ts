import { IsDefined, IsString, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;
}

export class CreateAuthorWithProductDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  id: number;
}

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
