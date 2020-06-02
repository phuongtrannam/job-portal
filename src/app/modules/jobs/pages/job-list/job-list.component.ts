import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  providers: [JobsService]
})
export class JobListComponent implements OnInit {


  constructor(private jobsService: JobsService) {

  }
  ngOnInit() {

  }

}
