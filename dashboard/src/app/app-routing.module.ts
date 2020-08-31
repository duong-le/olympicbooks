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
  },
  {
    path: 'authors',
    loadChildren: () => import('./pages/authors/authors.module').then((m) => m.AuthorsModule)
  },
  {
    path: 'publishers',
    loadChildren: () => import('./pages/publishers/publishers.module').then((m) => m.PublishersModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then((m) => m.OrdersModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/customers/customers.module').then((m) => m.CustomersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
