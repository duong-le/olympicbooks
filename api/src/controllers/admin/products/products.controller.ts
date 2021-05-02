import { Controller, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { Product } from '../../../entities/products.entity';
import { UploadOptions } from '../../../services/cloud-storage.service';
import { ProductsService } from '../../../services/products.service';
import { Role } from '../../../shared/Enums/roles.enum';
import { File } from '../../../shared/Interfaces/file.interface';
import { ProductsController } from '../../store/products/products.controller';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@ApiTags('Admin Products')
@ApiBearerAuth()
@Controller('admin/products')
@UseGuards(AuthGuard())
@Roles(Role.ADMIN)
@Crud({
  model: { type: Product },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'deleteOneBase']
  },
  query: {
    join: {
      images: { eager: true },
      category: { eager: true },
      publisher: { eager: true },
      authors: { eager: true }
    },
    exclude: ['categoryId', 'publisherId']
  }
})
export class AdminProductsController extends ProductsController {
  constructor(public service: ProductsService) {
    super(service);
  }

  @Override()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('attachment', null, UploadOptions))
  createOne(@ParsedBody() dto: CreateProductDto, @UploadedFiles() files: File[]): Promise<Product> {
    return this.service.createProduct(dto, files);
  }

  @Override()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('attachment', null, UploadOptions))
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UpdateProductDto, @UploadedFiles() files: File[]): Promise<Product> {
    return this.service.updateProduct(req.parsed.paramsFilter[0].value, dto, files);
  }

  @Override()
  deleteOne(@ParsedRequest() req: CrudRequest): Promise<void> {
    return this.service.deleteProduct(req.parsed.paramsFilter[0].value);
  }
}
