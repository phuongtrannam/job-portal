import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'companies',
    loadChildren: () => import('./modules/companies/companies.module').then(m => m.CompaniesModule),
    data: { preload: true }
  },
  {
    path: 'industries',
    loadChildren: () => import('./modules/industries/industries.module').then(m => m.IndustriesModule)
  },
  {
    path: 'markets',
    loadChildren: () => import('./modules/markets/markets.module').then(m => m.MarketsModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
