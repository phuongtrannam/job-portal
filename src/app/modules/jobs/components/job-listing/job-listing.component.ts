import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';
import { HeaderService } from 'src/app/core/header/header.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
  providers: [JobsService]
})
export class JobListingComponent implements OnInit {
  topJobSearch = [];
  jobId: string;


  constructor(private jobsService: JobsService,
    public headerService: HeaderService) {

  }
  ngOnInit() {
    this.headerService.regions = '/jobs';
    this.getTopJob('50');
    // this.jobsService.selectedJob.subscribe(jobId => this.jobId = jobId);
    // console.log(this.jobId);
    // this.changeJobId();
  }

  // changeJobId() {
  //   this.jobsService.changeSelectedJob('J99')
  //   // this.jobId = 'J99';
  //   console.log(this.jobId);
  // }

  getTopJob(numJob: string): void {
    this.jobsService.getTopJob(numJob)
      .subscribe((data: any) => {
        console.log("getTopJob");
        // console.log(data.result);
        // this.jobDemandByPeriodOfTime = data.result;
        this.topJobSearch = data.result;
      });
  }

}
