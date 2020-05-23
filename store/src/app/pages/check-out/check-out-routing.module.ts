import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ShipComponent } from './ship/ship.component';
import { PayComponent } from './pay/pay.component';
import { NotExistComponent } from '../../shared/components/error/not-exist.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'ship',
    component: ShipComponent
  },
  {
    path: 'pay',
    component: PayComponent
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
export class CheckOutRoutingModule {}
