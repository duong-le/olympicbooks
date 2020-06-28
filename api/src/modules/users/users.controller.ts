import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Get, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody, CrudRequestInterceptor } from '@nestjsx/crud';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UpdateUserDto, UpdateMeDto } from './users.dto';
import { UserInfo } from 'src/shared/Decorators/user-info.decorator';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard())
@Crud({
  model: { type: User },
  routes: {
    exclude: ['createOneBase', 'createManyBase', 'replaceOneBase'],
    getOneBase: { decorators: [Roles(Role.ADMIN)] },
    getManyBase: { decorators: [Roles(Role.ADMIN)] },
    deleteOneBase: { decorators: [Roles(Role.ADMIN)] }
  },
  dto: { update: UpdateUserDto }
})
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @ApiOperation({ summary: 'Retrieve my User' })
  @UseInterceptors(CrudRequestInterceptor, ClassSerializerInterceptor)
  @Get('/me')
  getMe(@UserInfo() user: User): Promise<User> {
    return this.service.getMe(user);
  }

  @ApiOperation({ summary: 'Update my User' })
  @UseInterceptors(CrudRequestInterceptor)
  @Patch('/me')
  updateMe(@Body() me: UpdateMeDto, @UserInfo() user: User): Promise<void> {
    return this.service.updateUser(me, user.id);
  }

  @Override()
  @Roles(Role.ADMIN)
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UpdateUserDto): Promise<void> {
    return this.service.updateUser(dto, req.parsed.paramsFilter[0].value);
  }
}
