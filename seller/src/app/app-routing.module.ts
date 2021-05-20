import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/Guards/auth.guard';
import { UnAuthGuard } from './shared/Guards/unauth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [UnAuthGuard]
  },
  {
    path: 'me',
    loadChildren: () => import('./pages/sellers/sellers.module').then((m) => m.SellersModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
