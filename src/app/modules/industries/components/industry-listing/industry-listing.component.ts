import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-industry-listing',
  templateUrl: './industry-listing.component.html',
  styleUrls: ['./industry-listing.component.css']
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
  industrys = [{ id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },
  { id: "J1", name: "Dệt may", minSalary: "10", maxSalary: "20", industryType: "Tại xưởng", numindustry: "2150", },];

  constructor() {

  }
  ngOnInit() {

  }

}