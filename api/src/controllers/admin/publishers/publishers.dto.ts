import { IsDefined, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePublisherDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;
}

export class UpdatePublisherDto extends PartialType(CreatePublisherDto) {}
