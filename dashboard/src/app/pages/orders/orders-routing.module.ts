import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: ':id',
    component: OrdersDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
