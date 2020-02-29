import { Component, OnInit } from '@angular/core';
import { IndustriesService } from '../../industries.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
  providers: [IndustriesService]
})
export class JobListingComponent implements OnInit {


  constructor(private industriesService: IndustriesService) {

  }
  ngOnInit() {

  }

}
