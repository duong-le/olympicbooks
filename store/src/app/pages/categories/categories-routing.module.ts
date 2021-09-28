import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotExistComponent } from '../../shared/Components/result/error/not-exist.component';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: ':categorySlug',
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
