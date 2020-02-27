import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [
    CompanyListComponent,
    CompanyDetailComponent
  ]
})
export class CompaniesModule { }
