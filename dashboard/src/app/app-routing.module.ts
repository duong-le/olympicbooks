import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
