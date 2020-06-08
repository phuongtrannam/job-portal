import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.css'],
  providers: [CompaniesService]
})
export class CompanyHeaderComponent implements OnInit {

  constructor(private companiesService: CompaniesService) {

  }
  ngOnInit() {
  }

}
