import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotExistComponent } from '../../shared/Components/result/error/not-exist.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: ':productSlug',
    component: ProductsComponent
  },
  {
    path: '**',
    component: NotExistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
