import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: ':productId',
    component: ProductsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
