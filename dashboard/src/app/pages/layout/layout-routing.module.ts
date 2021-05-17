import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then((m) => m.ProductsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then((m) => m.CategoriesModule)
      },
      {
        path: 'authors',
        loadChildren: () => import('../authors/authors.module').then((m) => m.AuthorsModule)
      },
      {
        path: 'publishers',
        loadChildren: () => import('../publishers/publishers.module').then((m) => m.PublishersModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then((m) => m.OrdersModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('../customers/customers.module').then((m) => m.CustomersModule)
      },
      {
        path: 'sellers',
        loadChildren: () => import('../sellers/sellers.module').then((m) => m.SellersModule)
      },
      {
        path: 'admins',
        loadChildren: () => import('../admins/admins.module').then((m) => m.AdminsModule)
      },
      {
        path: 'shops',
        loadChildren: () => import('../shops/shops.module').then((m) => m.ShopsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
