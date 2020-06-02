import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-job-highlight',
  templateUrl: './job-highlight.component.html',
  styleUrls: ['./job-highlight.component.css'],
  providers: [JobsService]
})
export class JobHighlightComponent implements OnInit {

  trendingJobs = [{ id: 'J1', name: 'Java Engineer' },
                  { id: 'J2', name: 'PHP Developer' },
                  { id: 'J3', name: 'IOS Developer' },
                  { id: 'J4', name: 'Web Developer' },
                  { id: 'J5', name: 'Designer' },
                  { id: 'J6', name: 'Angular Developer' }];

  constructor(private jobsService: JobsService) {

  }
  ngOnInit() {

  }

}
