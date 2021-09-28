import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then((m) => m.OrdersModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('../customers/customers.module').then((m) => m.CustomersModule)
      },
      {
        path: 'admins',
        loadChildren: () => import('../admins/admins.module').then((m) => m.AdminsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
