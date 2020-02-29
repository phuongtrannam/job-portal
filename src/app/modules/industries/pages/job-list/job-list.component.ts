import { Component, OnInit } from '@angular/core';
import { IndustriesService } from '../../industries.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  providers: [IndustriesService]
})
export class JobListComponent implements OnInit {


  constructor(private industriesService: IndustriesService) {

  }
  ngOnInit() {

  }

}
