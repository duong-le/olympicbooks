import { Controller, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, GetManyDefaultResponse, Override, ParsedRequest } from '@nestjsx/crud';

import { Product } from '../../../entities/products.entity';
import { ProductsService } from '../../../services/products.service';
import { ProductCollectionType } from '../../../shared/Enums/products.enum';

@ApiTags('Products')
@Controller('products')
@Crud({
  model: { type: Product },
  routes: {
    only: ['getManyBase', 'getOneBase']
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
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}

  @Override()
  @ApiQuery({ name: 'type', required: false })
  getMany(
    @ParsedRequest() req: CrudRequest,
    @Query('type') type: string
  ): Promise<GetManyDefaultResponse<Product> | Product[]> {
    if (type === ProductCollectionType.TOP_SELLING)
      return this.service.getTopSellingProducts(req.parsed.limit);
    return this.service.getMany(req);
  }

  @Override()
  getOne(@ParsedRequest() req: CrudRequest): Promise<Product> {
    return this.service.getProduct(req.parsed.paramsFilter[0].value);
  }
}
