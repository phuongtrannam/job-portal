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
  constructor(private jobsService: JobsService,
              private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.selectedJobId = this.route.snapshot.paramMap.get('id');
    // console.log("idJob is: -- " + this.selectedJobId);
  }
}
