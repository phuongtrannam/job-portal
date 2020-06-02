import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
  providers: [CompaniesService]
})
export class CompanyDetailComponent implements OnInit {

 

  constructor(private companiesService: CompaniesService) {

  }
  ngOnInit() {
  }
 
}
