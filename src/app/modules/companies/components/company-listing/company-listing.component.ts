import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-company-listing',
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.css'],
  providers: [ CompaniesService ]
})
export class CompanyListingComponent implements OnInit {
  companyList = [];
  numberOfCompanies;
  constructor(private companiesService: CompaniesService) {

  }
  ngOnInit() {
    this.showCompanyList();
    
    
  }

  showCompanyList() {
    this.companiesService.getCompanyList()
      .subscribe((data: any) => {
        console.log("getCompanyList");
        console.log(data.result);
        this.companyList = data.result;
        this.numberOfCompanies = this.companyList.length;
        console.log("number of company " +this.numberOfCompanies);
      });
  }
  
}
