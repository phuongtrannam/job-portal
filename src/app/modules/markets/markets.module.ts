import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';

import { MarketsRoutingModule } from './markets-routing.module';
import { MarketAnalysisComponent } from './pages/market-analysis/market-analysis.component';
import { MarketChartComponent } from './components/market-chart/market-chart.component';


@NgModule({
  declarations: [
    MarketAnalysisComponent,
    MarketChartComponent,
  ],
  imports: [
    CommonModule,
    MarketsRoutingModule,
    MatTableModule
  ]
})
export class MarketsModule { }
