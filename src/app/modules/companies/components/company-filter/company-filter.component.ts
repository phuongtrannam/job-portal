import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.css'],
  providers: []
})
export class CompanyFilterComponent implements OnInit {

  private defaultSelected = 0;
  private selection: number;
  private jobTypes = [{ id: 1, name: "fulltime" }, { id: 2, name: "freelance" }, { id: 3, name: "Parttime" }];
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
  // autoTicks = false;
  // disabled = false;
  // invert = false;
  // max = 100;
  // min = 0;
  // showTicks = false;
  // step = 1;
  // thumbLabel = false;
  // value = 0;
  // vertical = false;
  // tickInterval = 1;
  // getSliderTickInterval(): number | 'auto' {
  //   if (this.showTicks) {
  //     return this.autoTicks ? 'auto' : this.tickInterval;
  //   }

  //   return 0;
  // }

  someValue = 0;

  constructor() {

  }
  ngOnInit() {

  }

}
