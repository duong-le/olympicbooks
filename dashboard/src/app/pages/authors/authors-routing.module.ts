import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './authors.component';
import { AuthorsDetailComponent } from './authors-detail/authors-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorsComponent
  },
  {
    path: ':id',
    component: AuthorsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule {}
