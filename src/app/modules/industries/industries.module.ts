import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import { IndustriesRoutingModule } from './industries-routing.module';
import { IndustryListComponent } from './pages/industry-list/industry-list.component';
import { IndustryDetailComponent } from './pages/industry-detail/industry-detail.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { JobHeaderComponent } from './components/job-header/job-header.component';
import { JobDescriptionComponent } from './components/job-description/job-description.component';
import { IndustryListingComponent } from './components/industry-listing/industry-listing.component';
import { JobSearchComponent } from './components/job-search/job-search.component';
import { JobFilterComponent } from './components/job-filter/job-filter.component';
import { JobListingComponent } from './components/job-listing/job-listing.component';
import { JobAnalysisComponent } from './components/job-analysis/job-analysis.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster'
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IndustriesRoutingModule,
    MatTabsModule,
    NgxPaginationModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    MatTableModule,
    HttpClientModule,
  ],
  declarations: [
    IndustryListComponent,
    IndustryDetailComponent,
    JobDetailComponent,
    JobListComponent,
    JobHeaderComponent,
    JobDescriptionComponent,
    IndustryListingComponent,
    JobSearchComponent,
    JobFilterComponent,
    JobListingComponent,
    JobAnalysisComponent,
    
  ]
})
export class IndustriesModule { }
