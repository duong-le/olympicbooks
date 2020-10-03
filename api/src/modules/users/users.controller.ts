import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Get, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody, CrudRequestInterceptor } from '@nestjsx/crud';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UpdateMeDto } from './users.dto';
import { UserInfo } from 'src/shared/Decorators/user-info.decorator';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';

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
  @UseInterceptors(CrudRequestInterceptor, ClassSerializerInterceptor)
  @Get('/me')
  getMe(@UserInfo() user: User): User {
    return user;
  }

  @ApiOperation({ summary: 'Update my User' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(CrudRequestInterceptor, ClassSerializerInterceptor)
  @Patch('/me')
  updateMe(@Body() me: UpdateMeDto, @UserInfo() user: User): Promise<User> {
    return this.service.updateUser(user.id, me);
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
