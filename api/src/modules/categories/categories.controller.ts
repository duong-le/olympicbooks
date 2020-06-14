import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
@UseGuards(AuthGuard())
@Crud({ model: { type: Category } })
export class CategoriesController implements CrudController<Category> {
  constructor(public service: CategoriesService) {}
}
