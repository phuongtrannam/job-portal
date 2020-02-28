import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-company-listing',
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.css'],
  providers: [ CompaniesService ]
})
export class CompanyListingComponent implements OnInit {
  public listCompanies;
  public numberOfCompanies;
    
  constructor(private companiesService: CompaniesService) {

  }
  ngOnInit() {
    this.listCompanies = this.companiesService.getListCompanies();
    this.numberOfCompanies = this.listCompanies.length;
  }

}
