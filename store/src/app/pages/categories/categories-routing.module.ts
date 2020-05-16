import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { NotExistComponent } from '../../shared/components/error/not-exist.component';

const routes: Routes = [
  {
    path: ':id',
    component: CategoriesComponent
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
export class CategoriesRoutingModule {}
