import { CompaniesService } from '../../companies.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/header/header.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
@Component({
  selector: 'app-company-listing',
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.css'],
  providers: [ CompaniesService, HeaderService ]
})
export class CompanyListingComponent implements OnInit {
  p = 0;
  companyList = [];
  numberOfCompanies;
  searchCompanyTerm = '';
  @Input() companyName: string;
  @Input() industryId: string;
  @Input() minSalary: string;
  @Input() maxSalary: string;

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
  ngOnChanges() {
    console.log("this.companyName companyName " +this.companyName);
    console.log("this.industryId  industryId " +this.industryId);
    console.log("this.minSalary  minSalary " +this.minSalary);
    console.log("this.maxSalary  maxSalary " +this.maxSalary);
    if(this.companyName != null && this.industryId != null && this.minSalary != null && this.maxSalary != null ){
      this.companiesService.advancedSearchCompany(this.companyName, this.industryId, this.minSalary, this.maxSalary)
      .subscribe((data: any) => {
        console.log("advancedSearchCompany");
        console.log(data.result);
        this.companyList = data.result;
      });
    }
  
  }
}
