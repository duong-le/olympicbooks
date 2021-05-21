import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopsComponent } from './shops.component';

const routes: Routes = [
  {
    path: ':shopId',
    component: ShopsComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
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
export class ShopsRoutingModule {}
