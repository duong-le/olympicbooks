import { Body, Controller, Get, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor, Override, ParsedBody } from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';

import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { User } from '../../../entities/users.entity';
import { UsersService } from '../../../services/users.service';
import { CreateUserDto, UpdateMeDto, UpdateUserDto } from './users.dto';

@ApiTags('Users')
@Controller('users')
@Crud({
  model: { type: User },
  routes: {
    only: ['createOneBase']
  },
  dto: { create: CreateUserDto, update: UpdateUserDto }
})
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @ApiOperation({ summary: 'Retrieve my User' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(CrudRequestInterceptor)
  @Get('me')
  getMe(@UserInfo() user: User): User {
    return user;
  }

  @ApiOperation({ summary: 'Update my User' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(CrudRequestInterceptor)
  @Patch('me')
  async updateMe(@Body() me: UpdateMeDto, @UserInfo() user: User): Promise<User> {
    const updatedUser = await this.service.updateUser(user.id, me);
    return plainToClass(User, updatedUser);
  }

  @Override()
  createOne(@ParsedBody() dto: CreateUserDto): Promise<User> {
    return this.service.createUser(dto);
  }
}
