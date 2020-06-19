import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { HeaderService } from 'src/app/core/header/header.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { JobsService } from '../../../jobs/jobs.service';
import { IndustriesService } from '../../../industries/industries.service';
import { Router } from "@angular/router";
export interface City {
  name: string;
  id: string;
  // area: string;
}
export interface Industry {
  name: string;
  id: string;
  // area: string;
}
@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
  providers: [HomeService, JobsService, IndustriesService]
})
export class HomeSearchComponent implements OnInit {
  public menu: any = [
    {id: 1, name: 'Khu vực', selected: true, placehoder: 'VD: Hà Nội', logo: 'fa fa-map-marker'},
    {id: 2, name: 'Ngành nghề', selected: false, placehoder: 'VD: Kinh doanh', logo: 'fa fa-tasks'},
    {id: 3, name: 'Công việc', selected: false, placehoder: 'VD: Nhân viên kinh doanh', logo: 'fa fa-wrench '},
    {id: 4, name: 'Công ty', selected: false, placehoder: 'VD: CenGroup', logo: 'fa fa-building '},
  ];
  logo= "fa fa-map-marker";
  ph= 'VD:  Hà Nội';
  selectedType = 1;
  selectedCity = 'P0';
  controlCity = new FormControl();
  cityList: City[] = [{id: '1', name: 'Champs-Élysées'},
              {id: '2', name: 'Lombard Street'},
              {id: '3', name: 'Abbey Road'},
              {id: '4', name: 'Fifth Avenue'}];
  filteredOptionsCity: Observable<City[]>;
  selectedIndustry = 'P0';
  controlIndustry = new FormControl();
  industryList: Industry[] = [{id: '1', name: 'Champs-Élysées'},
              {id: '2', name: 'Lombard Street'},
              {id: '3', name: 'Abbey Road'},
              {id: '4', name: 'Fifth Avenue'}];
  filteredOptionsIndustry: Observable<Industry[]>;
  jobName = '';
  companyName = '';
  changeSearchType(index) {
    this.menu.forEach(element => {
      element.selected = false;
    });
    this.selectedType = this.menu[index].id;
    console.log(this.selectedType)
    this.menu[index].selected = true;
    this.logo =this.menu[index].logo;
    this.ph= this.menu[index].placehoder;
  }

  constructor(private homeService: HomeService,
    public headerService: HeaderService,
    private jobsService: JobsService,
    private industriesService: IndustriesService,
    private router: Router) {

  }
  ngOnInit() {
    this.headerService.regions = '/';
    this.getCityList();
    this.getIndustryList();
  }
  
  displayFnCity(cityList: City[]): (id: string) => string | null {
    return (id: string) => { 
      const correspondingOption = Array.isArray(cityList) ? cityList.find(option => option.id === id) : null;
      return correspondingOption ? correspondingOption.name : '';
    };
  }

  private _filterCity(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.cityList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  displayFnIndustry(industryList: Industry[]): (id: string) => string | null {
    return (id: string) => { 
      const correspondingOption = Array.isArray(industryList) ? industryList.find(option => option.id === id) : null;
      return correspondingOption ? correspondingOption.name : '';
    };
  }

  private _filterIndustry(name: string): Industry[] {
    const filterValue = name.toLowerCase();

    return this.industryList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onCitySelected(selectedCityId) {
    this.selectedCity = selectedCityId;
    const redirectLink = '/regions/' + this.selectedCity;
    this.router.navigate(['/regions', this.selectedCity]);
  }
  onIndustrySelected(selectedIndustryId) {
    this.selectedIndustry = selectedIndustryId;
    this.router.navigate(['/industries',this.selectedIndustry ]);
  }
  getCityList(): void {
    this.jobsService.getCityList()
      .subscribe((data: any) => {
        console.log('getCityList');
        console.log(data.result);
        this.cityList = data.result;
        this.filteredOptionsCity = this.controlCity.valueChanges
          .pipe(
            startWith<string | City>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterCity(name) : this.cityList.slice())
          );
        // console.log(this.filteredOptions);
    });
  }
  getIndustryList(): void {
    this.industriesService.getIndustryList()
      .subscribe((data: any) => {
        console.log('getIndustryList');
        console.log(data.result);
        this.industryList = data.result;
        this.filteredOptionsIndustry = this.controlIndustry.valueChanges
          .pipe(
            startWith<string | Industry>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterIndustry(name) : this.industryList.slice())
          );
        // console.log(this.filteredOptions);
    });
  }
  searchJob(jobNameParam: string ){
    this.router.navigate(['/jobs/search',jobNameParam ]);
  }
}
