import { Component, OnInit } from '@angular/core';
import { IndustriesService } from '../../industries.service';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.css'],
  providers: [IndustriesService]
})
export class JobFilterComponent implements OnInit {


  constructor(private industriesService: IndustriesService) {

  }
  ngOnInit() {

  }

}
