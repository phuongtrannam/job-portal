import { Component, OnInit } from '@angular/core';
import { IndustriesService } from '../../industries.service';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.css'],
  providers: [IndustriesService]
})
export class JobFilterComponent implements OnInit  {
  defaultSelected = 0;
  selection: number;
  jobTypes = [{ id: 1, name: "fulltime" }, { id: 2, name: "freelance" }, { id: 3, name: "Parttime" }];
  literacies = [
    { checked: false, name: "Đại học" },
    { checked: false, name: "Cao đẳng" },
    { checked: false, name: "Trung cấp" },
    { checked: false, name: "THPT" },
    { checked: false, name: "Thạc sĩ" },
    { checked: false, name: "Tiến sĩ" },
  ];

  industries =  [
    { checked: false, name: "Giáo dục" },
    { checked: false, name: "CNTT" },
    { checked: false, name: "Xấy dựng" },
    { checked: false, name: "Y tế" },
    { checked: false, name: "Du lịch" },
    { checked: false, name: "Nông nghiệp" },
  ];
  levelCareer =  [
    { checked: false, name: "Manager" },
    { checked: false, name: "Senior" },
    { checked: false, name: "Fresher" },
    { checked: false, name: "Junior" },
  ];

  constructor() {

  }
  ngOnInit() {

  }

}

