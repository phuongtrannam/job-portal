import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
  providers: [JobsService]
})
export class JobListingComponent implements OnInit {
  jobs = [{id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150",},
        {id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150"},
        {id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150"},
        {id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150"},
        {id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150"},
        {id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150"},
        {id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150"},
        {id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150"},
        {id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150"},
        {id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150"},
        {id: "J1", name: "Lập trình viên", minSalary: "10", maxSalary:"20", jobType: "Freelance", numJob: "2150"},]


  constructor(private jobsService: JobsService) {

  }
  ngOnInit() {

  }

}
