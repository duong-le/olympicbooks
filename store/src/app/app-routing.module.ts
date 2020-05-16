import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotExistComponent } from './shared/components/error/not-exist.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then((m) => m.CategoriesModule)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.module').then((m) => m.ProductsModule)
  },
  { path: '**', component: NotExistComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
