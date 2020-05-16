import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { NotExistComponent } from '../../shared/components/error/not-exist.component';

const routes: Routes = [
  {
    path: ':id',
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
