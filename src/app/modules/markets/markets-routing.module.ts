import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketAnalysisComponent } from './pages/market-analysis/market-analysis.component';


const routes: Routes = [
  {
    path: '',
    component: MarketAnalysisComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketsRoutingModule { }
