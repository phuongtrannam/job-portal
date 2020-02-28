import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndustryListComponent } from './pages/industry-list/industry-list.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';

const routes: Routes = [
  {
    path: '',
    component: IndustryListComponent
  },
  {
    path: ':id',
    component: JobDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustriesRoutingModule { }
