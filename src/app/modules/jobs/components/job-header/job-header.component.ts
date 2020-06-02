import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.css'],
  providers: [JobsService]
})
export class JobHeaderComponent implements OnInit {



  constructor(private jobsService: JobsService) {

  }
  ngOnInit() {

  }

}
