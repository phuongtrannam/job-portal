import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-industry-listing',
  templateUrl: './industry-listing.component.html',
  styleUrls: ['./industry-listing.component.css'],
  providers: [HomeService]
})
export class IndustryListingComponent implements OnInit {
  industryList;
  numApi = 0;
  @Output() send_industry = new EventEmitter();
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getIndustryList();
  }
  getIndustryList(): void {
    this.homeService.getIndustryList()
      .subscribe((data: any) => {
        console.log("getIndustryList");
        this.send_industry.emit(this.numApi+=1);
        console.log("day la api da goi " + this.numApi);
        // console.log(data.result);
        this.industryList = data.result;
        this.industryList.sort(this.compare);
        this.industryList = this.industryList.slice(0,8);
        console.log(this.industryList);
      });
  }
  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.averageSalary;
    const bandB = b.averageSalary;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  }
}
