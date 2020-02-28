import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';
import { CompanyFilterComponent } from './components/company-filter/company-filter.component';
import { CompanyListingComponent } from './components/company-listing/company-listing.component';
import { CompanyHeaderComponent } from './components/company-header/company-header.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
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
    CompanyDetailComponent,
    CompanyFilterComponent,
    CompanyListingComponent,
    CompanyHeaderComponent,
    CompanyInfoComponent,
  ]
})
export class CompaniesModule { }
