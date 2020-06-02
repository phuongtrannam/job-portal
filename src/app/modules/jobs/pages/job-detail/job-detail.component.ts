import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
  providers: [JobsService]
})
export class JobDetailComponent implements OnInit {



  constructor(private jobsService: JobsService) {

  }
  ngOnInit() {

  }

}
