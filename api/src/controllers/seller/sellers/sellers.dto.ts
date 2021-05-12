import { OmitType } from '@nestjs/swagger';

import { CreateUserDto } from '../../../shared/Dto/users.dto';

export class CreateSellerDto extends CreateUserDto {}

export class UpdateSellerDto extends OmitType(CreateSellerDto, ['email'] as const) {}
