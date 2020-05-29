import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
// import { HomeComponent } from './modules/home/pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountToModule } from 'angular-count-to';
import { RegionComponent } from './region/region.component';
import { LuotDangTinTheoNganhNgheComponent } from './region/luot-dang-tin-theo-nganh-nghe/luot-dang-tin-theo-nganh-nghe.component';
import { MainSliderComponent } from './block/main-slider/main-slider.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegionComponent,
    LuotDangTinTheoNganhNgheComponent,
    MainSliderComponent,
    // HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule.forRoot(),
    BrowserAnimationsModule,
    CountToModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
