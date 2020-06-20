import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/header/header.service';

@Component({
  selector: 'app-company-listing',
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.css'],
  providers: [ CompaniesService, HeaderService ]
})
export class CompanyListingComponent implements OnInit {
  companyList = [];
  numberOfCompanies;
  searchCompanyTerm = '';
  constructor(private companiesService: CompaniesService,
              public headerService: HeaderService,
                private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.headerService.regions = '/companies';
    this.searchCompanyTerm = this.route.snapshot.paramMap.get('id');
    console.log('this.searchCompanyTerm ' + this.searchCompanyTerm);
    // this.showCompanyList();
    if(this.searchCompanyTerm == null ){
      this.showCompanyList();
    }else{
      this.searchCompany(this.searchCompanyTerm)
    }
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

  searchCompany(companyName: string) {
    this.companiesService.searchCompany(companyName)
      .subscribe((data: any) => {
        console.log("searchCompany");
        console.log(data.result);
        this.companyList = data.result;
        this.numberOfCompanies = this.companyList.length;
        console.log("number of company " +this.numberOfCompanies);
      });
  }
  
}
