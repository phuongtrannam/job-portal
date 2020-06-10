import { Component, OnInit, Input } from '@angular/core';
import { IndustriesService } from '../../industries.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-industry-listing',
  templateUrl: './industry-listing.component.html',
  styleUrls: ['./industry-listing.component.css'],
  providers: [IndustriesService]
})
export class IndustryListingComponent implements OnInit {
  trendingindustrys = [{ id: 'J1', name: 'Java Engineer' },
  { id: 'J2', name: 'PHP Developer' },
  { id: 'J3', name: 'IOS Developer' },
  { id: 'J4', name: 'Web Developer' },
  { id: 'J5', name: 'Designer' },
  { id: 'J6', name: 'Angular Developer' }];
  private defaultSelected = 0;
  private selection: number;
  private industryTypes = [{ id: 1, name: "fulltime" }, { id: 2, name: "freelance" }, { id: 3, name: "Parttime" }];
  literacies = [
    { checked: false, name: "Đại học" },
    { checked: false, name: "Cao đẳng" },
    { checked: false, name: "Trung cấp" },
    { checked: false, name: "THPT" },
    { checked: false, name: "Thạc sĩ" },
    { checked: false, name: "Tiến sĩ" },
  ];

  // industries = [
  //   { checked: false, name: "Giáo dục" },
  //   { checked: false, name: "CNTT" },
  //   { checked: false, name: "Xấy dựng" },
  //   { checked: false, name: "Y tế" },
  //   { checked: false, name: "Du lịch" },
  //   { checked: false, name: "Nông nghiệp" },
  // ];
  // levelCareer = [
  //   { checked: false, name: "Manager" },
  //   { checked: false, name: "Senior" },
  //   { checked: false, name: "Fresher" },
  //   { checked: false, name: "Junior" },
  // ];

  industryList = [];

  constructor( private industriesService: IndustriesService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getIndustryList();
  }

  getIndustryList(): void {
    this.industriesService.getIndustryList()
      .subscribe((data: any) => {
        console.log("getJobsRelated");
        console.log(data.result);
        this.industryList = data.result;
      });
  }

}