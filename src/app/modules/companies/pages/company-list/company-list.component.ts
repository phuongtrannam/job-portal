import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { HeaderService } from 'src/app/core/header/header.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  providers: [CompaniesService]
})
export class CompanyListComponent implements OnInit {

  config = [];
  companyName: string;
  regionId: string;
  industryId: string;
  minSalary: string;
  maxSalary: string;
  changeCompanyName(e){
    this.companyName = e;
    console.log("this.companyName " +this.companyName)
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
  constructor(private companiesService: CompaniesService,
    public headerService: HeaderService) {

  }
  ngOnInit() {
    this.headerService.regions = '/companies';
    // this.showConfig();
    // this.getBusinessLinesOfTheCompany();
  }

  

  
}
