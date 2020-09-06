import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishersComponent } from './publishers.component';
import { PublishersDetailComponent } from './publishers-detail/publishers-detail.component';

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
