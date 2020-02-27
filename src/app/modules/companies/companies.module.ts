import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    NgxPaginationModule,
    MatTabsModule,
    LeafletModule,
  ],
  declarations: [
    CompanyListComponent,
    CompanyDetailComponent
  ]
})
export class CompaniesModule { }
