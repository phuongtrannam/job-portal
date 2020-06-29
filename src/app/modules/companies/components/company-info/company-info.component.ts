import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { icon, latLng, LatLng, Layer, marker, tileLayer } from 'leaflet';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
  providers: [CompaniesService]
})
export class CompanyInfoComponent implements OnInit {

  optionsSpec: any = {
    layers: [{ url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map' }],
    zoom: 5,
    center: [46.879966, -121.726909]
  };

  // Leaflet bindings
  zoom = this.optionsSpec.zoom;
  center = latLng(this.optionsSpec.center);
  options = {
    layers: [tileLayer(this.optionsSpec.layers[0].url, { attribution: this.optionsSpec.layers[0].attribution })],
    zoom: this.optionsSpec.zoom,
    center: latLng(this.optionsSpec.center)
  };

  // Form bindings
  formZoom = this.zoom;
  zoomLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  lat = this.center.lat;
  lng = this.center.lng;

  // Marker layer
  markers: Layer[] = [];

  businessLinesOfCompany = [];
  companyInfo: any;
  relatedCompanies = [];
  recentJobsByCompany = [];
  selectedJobId: string;
  constructor(private companiesService: CompaniesService,
              private route: ActivatedRoute) {

  }
  ngOnInit() {
    // this.addMarker();
    this.selectedJobId = this.route.snapshot.paramMap.get('id');
    this.showCompanyInfo(this.selectedJobId);
    this.showBusinessLinesOfCompany(this.selectedJobId);
    this.showRelatedCompanies(this.selectedJobId);
    this.showRecentJobsByCompany(this.selectedJobId);
  }

  showCompanyInfo(idCompany: string){
    this.companiesService.getCompanyInfo(idCompany)
      .subscribe((data: any) => {
        console.log('showCompanyInfo');
        console.log(data.result);
        this.companyInfo = data.result;
      });
  }

  showBusinessLinesOfCompany(idCompany: string){
    this.companiesService.getBusinessLinesOfCompany(idCompany)
      .subscribe((data: any) => {
        console.log('showBusinessLinesOfCompany');
        console.log(data.result);
        this.businessLinesOfCompany = data.result;
      });
  }


  showRelatedCompanies(idCompany: string){
    this.companiesService.getRelatedCompanies(idCompany)
      .subscribe((data: any) => {
        console.log('showRelatedCompany');
        console.log(data.result);
        this.relatedCompanies = data.result;
      });
  }

  showRecentJobsByCompany(idCompany: string){
    this.companiesService.getRecentJobsByCompany(idCompany)
      .subscribe((data: any) => {
        console.log('showRecentJobByCompany');
        console.log(data.result);
        this.recentJobsByCompany = data.result;
      });
  }



  addMarker() {
    const newMarker = marker(
      [46.879966 + 0.1 * (Math.random() - 0.5), -121.726909 + 0.1 * (Math.random() - 0.5)],
      {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png'
        })
      }
    );

    this.markers.push(newMarker);
  }
  // Output binding for center
  onCenterChange(center: LatLng) {
    setTimeout(() => {
      this.lat = center.lat;
      this.lng = center.lng;
    });
  }

  onZoomChange(zoom: number) {
    setTimeout(() => {
      this.formZoom = zoom;
    });
  }

  doApply() {
    this.center = latLng(this.lat, this.lng);
    this.zoom = this.formZoom;
  }

}
