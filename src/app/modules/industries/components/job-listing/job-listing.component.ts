import { Component, OnInit } from '@angular/core';
import { IndustriesService } from '../../industries.service';
import { HeaderService } from 'src/app/core/header/header.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
  providers: [IndustriesService]
})
export class JobListingComponent implements OnInit {
   p = 0;
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


  constructor(
    public headerService: HeaderService
  ) {

  }
  ngOnInit() {
    this.headerService.regions = '/industries';
  }

}
