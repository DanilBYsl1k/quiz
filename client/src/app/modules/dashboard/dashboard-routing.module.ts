import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestPageComponent } from './components/test-page/test-page.component';
import { GetTestResolver } from './resolver/get-test.resolver';
import { TestResultComponent } from './components/test-result/test-result.component';
import { TestResultResolver } from './resolver/test-result.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
    children: [
      {
        path: '',
        component: TestListComponent
      },
    ]
  },
  {
    path: 'test/:id',
    component: TestPageComponent,
    resolve: { testResolve: GetTestResolver }
  },
  {
    path: 'test-result',
    component: TestResultComponent,
    resolve: { result: TestResultResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
