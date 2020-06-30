import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { RegionDetailComponent } from './pages/region-detail/region-detail.component';
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  {
    path: '',
    component: RegionDetailComponent
  },
  {
    path: ':id',
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
