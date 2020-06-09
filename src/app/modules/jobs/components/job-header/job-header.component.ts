import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.css'],
  providers: [JobsService]
})
export class JobHeaderComponent implements OnInit {

  jobID$: Observable<any>;
  selectedJobId: string;
  jobInfo = {name: "", minSalary: "", maxSalary: "", numJob: 0};
  constructor(private jobsService: JobsService,
              private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.selectedJobId = this.route.snapshot.paramMap.get('id');
    // console.log("idJob is: -- " + this.selectedJobId);
    this.jobInfoHeader(this.selectedJobId);
  }

  jobInfoHeader(idJob: string): void {
    this.jobsService.getJobInfo(idJob)
      .subscribe((data: any) => {
        console.log("jobInfoHeader");
        this.jobInfo.maxSalary = data.maxSalary;
        this.jobInfo.minSalary = data.minSalary;
        this.jobInfo.numJob = Math.floor(parseFloat(data.numJob));
        this.jobInfo.name = data.name;
      });
  }
}
