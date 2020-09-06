import { Controller, UseGuards, UseInterceptors, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@ApiTags('Categories')
@Controller('categories')
@Crud({
  model: { type: Category },
  routes: {
    createOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    updateOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    deleteOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] }
  },
  dto: { create: CreateCategoryDto, update: UpdateCategoryDto }
})
export class CategoriesController implements CrudController<Category> {
  constructor(public service: CategoriesService) { }

  @ApiOperation({ summary: 'Retrieve many Publisher by Category' })
  @UseInterceptors(CrudRequestInterceptor)
  @Get(':id/publishers')
  getPublishersByCategory(@Param('id') id: number): Promise<Category[]> {
    return this.service.getPublishersByCategory(id);
  }

  @ApiOperation({ summary: 'Retrieve many Author by Category' })
  @UseInterceptors(CrudRequestInterceptor)
  @Get(':id/authors')
  getAuthorsByCategory(@Param('id') id: number): Promise<Category[]> {
    return this.service.getAuthorsByCategory(id);
  }
}
