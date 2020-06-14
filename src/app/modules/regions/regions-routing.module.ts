import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegionDetailComponent } from './pages/region-detail/region-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RegionDetailComponent
  },
  // {
  //   path: ':id',
  //   component: JobDetailComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule { }
