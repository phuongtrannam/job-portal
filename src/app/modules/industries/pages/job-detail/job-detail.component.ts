import { Component, OnInit } from '@angular/core';
import { IndustriesService } from '../../industries.service';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
  providers: [IndustriesService]
})
export class JobDetailComponent implements OnInit {



  constructor(private industriesService: IndustriesService) {

  }
  ngOnInit() {

  }

}
