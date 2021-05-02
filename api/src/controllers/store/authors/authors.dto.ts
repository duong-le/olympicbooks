import { IsDefined, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;
}

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
