import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard())
@Crud({
  model: { type: User },
  routes: {
    exclude: ['createOneBase', 'createManyBase', 'replaceOneBase']
  }
})
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
