import { JobsService } from '../../jobs.service';
import { HeaderService } from 'src/app/core/header/header.service';
import { ActivatedRoute } from '@angular/router';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
  providers: [JobsService]
})
export class JobListingComponent implements OnInit {
  topJobSearch = [];
  jobId: string;
  @Input() jobName: string;
  @Input() regionId: string;
  @Input() industryId: string;
  @Input() minSalary: string;
  @Input() maxSalary: string;

  searchJobTerm = '';
  constructor(private jobsService: JobsService,
              public headerService: HeaderService,
              private route: ActivatedRoute) {

  }
  
  ngOnInit() {
    this.headerService.regions = '/jobs';
    this.searchJobTerm = this.route.snapshot.paramMap.get('id');
    console.log('this.searchJobTerm ' + this.searchJobTerm);
    if(this.searchJobTerm == null ){
      this.getTopJob('50');
    }else{
      this.searchJob(this.searchJobTerm)
    }
    
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
        console.log(data.result);
        this.topJobSearch = data.result;
      });
  }
  searchJob(jobNameParam: string ){
    this.jobsService.searchJob(jobNameParam)
      .subscribe((data: any) => {
        console.log('searchJob');
        console.log(data);
        this.topJobSearch = data.result;
    });
  }
  ngOnChanges() {
    console.log("this.jobName jobName " +this.jobName);
    console.log("this.regionId  regionId " +this.regionId)
    console.log("this.industryId  industryId " +this.industryId)
    console.log("this.minSalary  minSalary " +this.minSalary)
    console.log("this.maxSalary  maxSalary " +this.maxSalary)
    if(this.jobName != null && this.regionId != null && this.industryId != null && this.minSalary != null && this.maxSalary != null ){
      this.jobsService.advancedSearchJob(this.jobName, this.regionId, this.industryId, this.minSalary, this.maxSalary)
      .subscribe((data: any) => {
        console.log("advancedSearchJob");
        console.log(data.result);
        this.topJobSearch = data.result;
      });
    }
  
  }
}
