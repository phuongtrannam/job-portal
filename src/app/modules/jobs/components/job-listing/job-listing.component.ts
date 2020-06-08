import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
  providers: [JobsService]
})
export class JobListingComponent implements OnInit {
  topJobSearch = [];


  constructor(private jobsService: JobsService) {

  }
  ngOnInit() {
    this.getTopJob('50');
  }

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
