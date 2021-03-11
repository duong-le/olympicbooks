import { Controller, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, GetManyDefaultResponse, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';

import { Roles } from '../../core/Decorators/roles.decorator';
import { UploadOptions } from '../../core/Services/cloud-storage.service';
import { ProductType } from '../../shared/Enums/product-type.enum';
import { Role } from '../../shared/Enums/roles.enum';
import { File } from '../../shared/Interfaces/file.interface';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

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
  @ApiQuery({ name: 'topSelling', required: false, type: Boolean })
  getMany(
    @ParsedRequest() req: CrudRequest,
    @Query('type') type: string
  ): Promise<GetManyDefaultResponse<Product> | Product[]> {
    if (type === ProductType.TOP_SELLING)
      return this.service.getTopSellingProducts(req.parsed.limit);
    return this.service.getMany(req);
  }

  @Override()
  getOne(@ParsedRequest() req: CrudRequest): Promise<Product> {
    return this.service.getProduct(req.parsed.paramsFilter[0].value);
  }

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
