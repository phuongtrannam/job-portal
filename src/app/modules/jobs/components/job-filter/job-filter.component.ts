import { JobsService } from '../../jobs.service';
import { IndustriesService } from '../../../industries/industries.service';
import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface City {
  name: string;
  id: string;
  selected?: boolean;
}

export interface Industry {
  name: string;
  id: string;
  selected?: boolean;
}

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.css'],
  providers: [JobsService, IndustriesService]
})
export class JobFilterComponent implements OnInit {
  // private defaultSelected = 0;
  // private selection: number;
  // private jobTypes = [{ id: 1, name: "Toàn thời gian" }, { id: 2, name: "Bán thời gian" }, { id: 3, name: "Tự do" }];
  literacies = [
    { checked: false, name: "Đại học", id: '4' },
    { checked: false, name: "Cao đẳng", id: '2' },
    { checked: false, name: "Trung cấp", id: '3' },
    { checked: false, name: "Khac", id: '1' },
  ];
  jobName = '';
  minSalary = '';
  maxSalary = '';
  cityControl = new FormControl();
  cities: City[];
  selectedCities: City[] = new Array<City>();
  filteredCities: Observable<City[]>;
  lastFilter1: string = '';

  industryControl = new FormControl();
  industries: Industry[];
  selectedIndustries: Industry[] = new Array<Industry>();
  filteredIndustries: Observable<Industry[]>;
  lastFilter2: string = '';
  @Output() sendJobName = new EventEmitter();
  @Output() sendRegionId = new EventEmitter();
  @Output() sendIndustryId = new EventEmitter();
  @Output() sendMinSalary = new EventEmitter();
  @Output() sendMaxSalary = new EventEmitter();
  constructor(private jobsService: JobsService,
              private industriesService: IndustriesService) {

  }
  ngOnInit() {
    this.getCityList();
    this.getIndustryList();
  }
  advancedSearch(){
    console.log(this.literacies);
    let literacyId = '';
    for (const literacy of this.literacies){
      if(literacy.checked){
        if(literacyId === ''){
          literacyId = literacy.id;
        }else {
          literacyId = ',' + literacy.id;
        }
      }
    }
    console.log(literacyId);
    console.log(this.jobName);
    console.log(this.minSalary);
    console.log(this.maxSalary);
    const listCityId = this.selectedCities.map(a => a.id);
    const cityId = listCityId.toString();
    console.log(cityId);
    const listIndustryId = this.selectedIndustries.map(a => a.id);
    const industryId = listIndustryId.toString();
    console.log(industryId);
     if (this.jobName == null || this.jobName === '' || this.selectedCities.length === 0 || this.selectedIndustries.length === 0 || this.minSalary == null || this.minSalary === ''|| this.maxSalary == null || this.maxSalary === ''){
      alert("Bạn cần nhập đủ số trường thông tin");
    }
    this.sendJobName.emit(this.jobName);
    this.sendRegionId.emit(cityId);
    this.sendIndustryId.emit(industryId);
    this.sendMinSalary.emit(this.minSalary);
    this.sendMaxSalary.emit(this.maxSalary);
  }
  filterCity(filter: string): City[] {
    this.lastFilter1 = filter;
    if (filter) {
      return this.cities.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.cities.slice();
    }
  }

  displayFnCity(value: City[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((city, index) => {
        if (index === 0) {
          displayValue = city.name;
        }else {
          displayValue += ', ' + city.name ;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClickedCity(event: Event, city: City) {
    event.stopPropagation();
    this.toggleSelectionCity(city);
  }

  toggleSelectionCity(city: City) {
    city.selected = !city.selected;
    if (city.selected) {
      this.selectedCities.push(city);
    } else {
      const i = this.selectedCities.findIndex(value => value.name === city.name);
      this.selectedCities.splice(i, 1);
    }

    this.cityControl.setValue(this.selectedCities);
  }
  getCityList(): void {
    this.jobsService.getCityList()
      .subscribe((data: any) => {
        console.log('getCityList');
        console.log(data.result);
        // this.increaseNumApi();
        this.cities = data.result;
        this.filteredCities = this.cityControl.valueChanges.pipe(
          startWith<string | City[]>(''),
          map(value => typeof value === 'string' ? value : this.lastFilter1),
          map(filter => this.filterCity(filter))
        );
      });
  }

  filterIndustry(filter: string): Industry[] {
    this.lastFilter2 = filter;
    if (filter) {
      return this.industries.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.industries.slice();
    }
  }

  displayFnIndustry(value: Industry[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((industry, index) => {
        if (index === 0) {
          displayValue = industry.name;
        }else {
          displayValue += ', ' + industry.name ;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClickedIndustry(event: Event, industry: Industry) {
    event.stopPropagation();
    this.toggleSelectionIndustry(industry);
  }

  toggleSelectionIndustry(industry: Industry) {
    industry.selected = !industry.selected;
    if (industry.selected) {
      this.selectedIndustries.push(industry);
    } else {
      const i = this.selectedIndustries.findIndex(value => value.name === industry.name);
      this.selectedIndustries.splice(i, 1);
    }

    this.industryControl.setValue(this.selectedIndustries);
  }

  getIndustryList(): void {
    this.industriesService.getIndustryList()
      .subscribe((data: any) => {
        console.log("getIndustryList");
        console.log(data.result);
        this.industries = data.result;
        this.filteredIndustries = this.industryControl.valueChanges.pipe(
          startWith<string | Industry[]>(''),
          map(value => typeof value === 'string' ? value : this.lastFilter1),
          map(filter => this.filterIndustry(filter))
        );
      });
  }
}
