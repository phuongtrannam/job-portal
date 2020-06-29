import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { IndustriesService } from '../../industries.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/header/header.service';

@Component({
  selector: 'app-industry-listing',
  templateUrl: './industry-listing.component.html',
  styleUrls: ['./industry-listing.component.css'],
  providers: [IndustriesService]
})
export class IndustryListingComponent implements OnInit {
  p = 0;
  trendingindustrys = [{ id: 'J1', name: 'Java Engineer' },
  { id: 'J2', name: 'PHP Developer' },
  { id: 'J3', name: 'IOS Developer' },
  { id: 'J4', name: 'Web Developer' },
  { id: 'J5', name: 'Designer' },
  { id: 'J6', name: 'Angular Developer' }];
  defaultSelected = 0;
  selection: number;
  industryTypes = [{ id: 1, name: "Toàn thời gian" }, { id: 2, name: "Bán thời gian" }, { id: 3, name: "Tự do" }];
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
  numApi = 0;
  @Output() send_industry = new EventEmitter();
  constructor( private industriesService: IndustriesService,
    public headerService: HeaderService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.headerService.regions = '/industries';
    this.getIndustryList();
  }

  getIndustryList(): void {
    this.industriesService.getIndustryList()
      .subscribe((data: any) => {
        console.log("getJobsRelated");
        console.log(data.result);
        this.send_industry.emit(this.numApi+=1);
        this.industryList = data.result;
      });
  }

}