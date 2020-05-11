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
  
  constructor(private companiesService: CompaniesService) {

  }
  ngOnInit() {
    this.showCompanyList();
    
    // this.listCompanies = this.companiesService.getListCompanies();
    // this.numberOfCompanies = this.listCompanies.length;
  }

  showCompanyList() {
    this.companiesService.getCompanyList()
      .subscribe((data: any[]) => {
        console.log("test http service");
        console.log(data);
        this.companyList = data;
      });
  }
  
}
