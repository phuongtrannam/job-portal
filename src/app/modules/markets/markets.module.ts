import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MarketsRoutingModule } from './markets-routing.module';
import { MarketAnalysisComponent } from './pages/market-analysis/market-analysis.component';
import { MarketChartComponent } from './components/market-chart/market-chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    MarketAnalysisComponent,
    MarketChartComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MarketsRoutingModule,
    MatTableModule,
    MatExpansionModule,
  ]
})
export class MarketsModule { }
