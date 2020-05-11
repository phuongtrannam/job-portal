import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  providers: [CompaniesService]
})
export class CompanyListComponent implements OnInit {

  config = [];
  constructor(private companiesService: CompaniesService) {

  }
  ngOnInit() {
    // this.showConfig();
    // this.getBusinessLinesOfTheCompany();
  }

  

  
}
