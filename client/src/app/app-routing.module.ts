import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', 
    children: [
      {
        path: '',     
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'auth',
        loadChildren: () => 
        import('./modules/auth/auth.module')
          .then((m)=> m.AppModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => 
        import('./modules/dashboard/dashboard.module')
          .then((m)=> m.DashboardModule),
        canActivate: [AuthGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
