import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublishersDetailComponent } from './publishers-detail/publishers-detail.component';
import { PublishersComponent } from './publishers.component';

const routes: Routes = [
  {
    path: '',
    component: PublishersComponent
  },
  {
    path: ':id',
    component: PublishersDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishersRoutingModule {}
