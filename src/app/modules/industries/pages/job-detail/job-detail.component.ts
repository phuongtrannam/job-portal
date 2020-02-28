import { Component, OnInit } from '@angular/core';
import { IndustriesService } from '../../industries.service';
import { icon, latLng, LatLng, Layer, marker, tileLayer } from 'leaflet';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
  providers: [IndustriesService]
})
export class JobDetailComponent implements OnInit {

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

  constructor(private industriesService: IndustriesService) {

  }
  ngOnInit() {
    this.addMarker();
  }

}
