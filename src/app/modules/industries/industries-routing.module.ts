import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndustryListComponent } from './pages/industry-list/industry-list.component';
import { IndustryDetailComponent } from './pages/industry-detail/industry-detail.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { JobListComponent } from './pages/job-list/job-list.component';

const routes: Routes = [
  {
    path: '',
    component: IndustryListComponent
  },
  {
    path: ':id',
    component: IndustryDetailComponent
  },
  {
    path: 'job/:id',
    component: JobDetailComponent,
  },
  {
    path: 'job-category/:id',
    component: JobListComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustriesRoutingModule { }
