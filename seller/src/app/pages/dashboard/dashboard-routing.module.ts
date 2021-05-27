import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: ':shopId',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../shops/shops.module').then((m) => m.ShopsModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then((m) => m.ProductsModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then((m) => m.OrdersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
