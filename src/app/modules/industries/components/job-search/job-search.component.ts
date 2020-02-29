import { Component, OnInit } from '@angular/core';
import { IndustriesService } from '../../industries.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css'],
  providers: [IndustriesService]
})
export class JobSearchComponent implements OnInit {


  constructor(private industriesService: IndustriesService) {

  }
  ngOnInit() {

  }

}
