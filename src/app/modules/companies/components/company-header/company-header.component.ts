import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.css'],
  providers: [CompaniesService]
})
export class CompanyHeaderComponent implements OnInit {
  companyInfo = {};
  selectedCompanyId: string;
  constructor(private companiesService: CompaniesService,
              private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.selectedCompanyId = this.route.snapshot.paramMap.get('id');
    this.showCompanyInfo(this.selectedCompanyId);
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
