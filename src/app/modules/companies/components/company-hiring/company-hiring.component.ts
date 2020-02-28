import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
@Component({
  selector: 'app-company-hiring',
  templateUrl: './company-hiring.component.html',
  styleUrls: ['./company-hiring.component.css'],
  providers: [CompaniesService]
})
export class CompanyHiringComponent implements OnInit {

 

  constructor(private companiesService: CompaniesService) {

  }
  ngOnInit() {
  }

}
