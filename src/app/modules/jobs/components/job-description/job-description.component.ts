import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// import { icon, latLng, LatLng, Layer, marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet.markercluster';
@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css'],
  providers: [JobsService]
})
export class JobDescriptionComponent implements OnInit {

  // // Open Street Map Definition
  // LAYER_OSM = {
  //   id: 'openstreetmap',
  //   name: 'Open Street Map',
  //   enabled: false,
  //   layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     attribution: 'Open Street Map'
  //   })
  // };

  // // Values to bind to Leaflet Directive
  // layersControlOptions = { position: 'bottomright' };
  // baseLayers = {
  //   'Open Street Map': this.LAYER_OSM.layer
  // };
  // options = {
  //   zoom: 3,
  //   center: L.latLng([46.879966, -121.726909])
  // };

  // // Marker cluster stuff
  // markerClusterGroup: L.MarkerClusterGroup;
  // markerClusterData: L.Marker[] = [];
  // markerClusterOptions: L.MarkerClusterGroupOptions;

  // // Generators for lat/lon values
  // generateLat() { return Math.random() * 360 - 180; }
  // generateLon() { return Math.random() * 180 - 90; }

  jobID$: Observable<any>;
  selectedJobId: string;
  jobInfo = {name: '', minSalary: '', maxSalary: '', numJob: 0, literacy: [], industry: []};
  constructor(private jobsService: JobsService,
              private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.selectedJobId = this.route.snapshot.paramMap.get('id');
    // console.log("idJob is: -- " + this.selectedJobId);
    this.jobInfoHeader(this.selectedJobId);
  }

  jobInfoHeader(idJob: string): void {
    this.jobsService.getJobInfo(idJob)
      .subscribe((data: any) => {
        console.log("jobInfoHeader");
        this.jobInfo.maxSalary = data.maxSalary;
        this.jobInfo.minSalary = data.minSalary;
        this.jobInfo.numJob = Math.floor(parseFloat(data.numJob));
        this.jobInfo.name = data.name;
        this.jobInfo.literacy = data.literacy;
        this.jobInfo.industry = data.industry;
      });
  }
  // refreshData(): void {
  //   this.markerClusterData = this.generateData(1000);
  // }

  // generateData(count: number): L.Marker[] {

  //   const data: L.Marker[] = [];

  //   for (let i = 0; i < count; i++) {

  //     const icon = L.icon({
  //       iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
  //       shadowUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png'
  //     });

  //     data.push(L.marker([this.generateLon(), this.generateLat()], { icon }));
  //   }

  //   return data;

  // }
}
