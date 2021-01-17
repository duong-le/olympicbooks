import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotExistComponent } from '../../shared/Components/result/error/not-exist.component';
import { CustomerComponent } from './customer.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: '',
        component: NotExistComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'orders/:id',
        component: OrderDetailComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
