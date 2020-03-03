import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { IndustryListingComponent } from './components/industry-listing/industry-listing.component';
import { BriefPageComponent } from './components/brief-page/brief-page.component';
import { HomeSearchComponent } from './components/home-search/home-search.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    SlideshowComponent,
    IndustryListingComponent,
    BriefPageComponent,
    HomeSearchComponent,
  ]
})
export class HomeModule { }
