import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.css'],
  providers: [CompaniesService]
})
export class CompanyHeaderComponent implements OnInit {
  companyInfo = {};
  constructor(private companiesService: CompaniesService) {

  }
  ngOnInit() {
    this.showCompanyInfo('C188');
  }
  showCompanyInfo(idCompany: string){
    this.companiesService.getCompanyInfo(idCompany)
      .subscribe((data: any) => {
        console.log("showCompanyInfo");
        console.log(data.result);
        this.companyInfo = data.result;
      });
  }
}
