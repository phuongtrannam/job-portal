import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobListComponent } from './pages/job-list/job-list.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';

const routes: Routes = [
  {
    path: '',
    component: JobListComponent
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
export class JobsRoutingModule { }
