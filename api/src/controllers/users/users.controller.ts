import { Body, Controller, Get, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, CrudRequestInterceptor, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';

import { Roles } from '../../core/Decorators/roles.decorator';
import { UserInfo } from '../../core/Decorators/user-info.decorator';
import { UsersService } from '../../services/users.service';
import { Role } from '../../shared/Enums/roles.enum';
import { CreateUserDto, UpdateMeDto, UpdateUserDto } from './users.dto';
import { User } from './users.entity';

@ApiTags('Users')
@Controller('users')
@Crud({
  model: { type: User },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
    getOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    getManyBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    deleteOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] }
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

  @Override()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Roles(Role.ADMIN)
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UpdateUserDto): Promise<User> {
    return this.service.updateUser(req.parsed.paramsFilter[0].value, dto);
  }
}
