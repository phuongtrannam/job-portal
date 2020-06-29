import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  providers: [JobsService]
})
export class JobListComponent implements OnInit {
  jobName: string;
  regionId: string;
  industryId: string;
  minSalary: string;
  maxSalary: string;
  changeJobName(e){
    this.jobName = e;
    console.log("this.jobName " +this.jobName)
  }
  changeRegionId(e){
    this.regionId = e;
    console.log("this.regionId " +this.regionId)
  }
  changeIndustryId(e){
    this.industryId = e;
    console.log("this.industryId " +this.industryId)
  }
  changeMinSalary(e){
    this.minSalary = e;
    console.log("this.minSalary " +this.minSalary)
  }
  changeMaxSalary(e){
    this.maxSalary = e;
    console.log("this.maxSalary " +this.maxSalary)
  }
  constructor(private jobsService: JobsService) {

  }
  ngOnInit() {

  }

}
