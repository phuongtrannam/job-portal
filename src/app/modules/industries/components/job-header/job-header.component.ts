import { Component, OnInit } from '@angular/core';
import { IndustriesService } from '../../industries.service';

@Component({
  selector: 'app-job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.css'],
  providers: [IndustriesService]
})
export class JobHeaderComponent implements OnInit {



  constructor(private industriesService: IndustriesService) {

  }
  ngOnInit() {

  }

}
