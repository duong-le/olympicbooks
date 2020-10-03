import { Controller, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override, ParsedBody, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { Product } from './products.entity';
import { ProductsService } from './products.service';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadOptions } from '../../shared/Services/cloud-storage.service';
import { File } from 'src/shared/Interfaces/file.interface';

@ApiTags('Products')
@Controller('products')
@Crud({
  model: { type: Product },
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
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}

  @Override()
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Roles(Role.ADMIN)
  @UseInterceptors(FilesInterceptor('attachment', null, UploadOptions))
  createOne(@ParsedBody() dto: CreateProductDto, @UploadedFiles() files: File[]): Promise<Product> {
    return this.service.createProduct(dto, files);
  }

  @Override()
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Roles(Role.ADMIN)
  @UseInterceptors(FilesInterceptor('attachment', null, UploadOptions))
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UpdateProductDto, @UploadedFiles() files: File[]): Promise<Product> {
    return this.service.updateProduct(req.parsed.paramsFilter[0].value, dto, files);
  }

  @Override()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Roles(Role.ADMIN)
  deleteOne(@ParsedRequest() req: CrudRequest): Promise<void> {
    return this.service.deleteProduct(req.parsed.paramsFilter[0].value);
  }
}
