import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsDetailComponent } from './authors-detail/authors-detail.component';
import { AuthorsComponent } from './authors.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorsComponent
  },
  {
    path: ':authorId',
    component: AuthorsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule {}
