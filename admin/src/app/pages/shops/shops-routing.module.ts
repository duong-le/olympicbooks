import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopsDetailComponent } from './shops-detail/shops-detail.component';
import { ShopsComponent } from './shops.component';

const routes: Routes = [
  {
    path: '',
    component: ShopsComponent
  },
  {
    path: ':shopId',
    component: ShopsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsRoutingModule {}
