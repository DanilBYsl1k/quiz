import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TestPageComponent } from './components/test-page/test-page.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestResultComponent } from './components/test-result/test-result.component';
import { PreloaderComponent } from 'src/app/shared/components/preloader/preloader.component';

@NgModule({
  declarations: [
    MainDashboardComponent,
    TestPageComponent,
    TestListComponent,
    TestResultComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PreloaderComponent
  ]
})
export class DashboardModule { }
