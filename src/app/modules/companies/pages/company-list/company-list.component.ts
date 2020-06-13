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
  constructor(private companiesService: CompaniesService,
    public headerService: HeaderService) {

  }
  ngOnInit() {
    this.headerService.region = '/companies';
    // this.showConfig();
    // this.getBusinessLinesOfTheCompany();
  }

  

  
}
