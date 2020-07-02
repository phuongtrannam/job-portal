import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RegionsService } from '../../regions.service';
import { JobsService } from '../../../jobs/jobs.service';
import { HeaderService } from '../../../../core/header/header.service';
import { chartLuongTrungBinh } from './config.chart-luong-trung-binh';
import { chartViecLamMoi } from './config.chart-viec-lam-moi';
import { MatTableDataSource } from '@angular/material/table';
import { chartDoTuoiTrungBinh } from './config.chart-do-tuoi-trung-binh';
import { chartCongTy } from './config.chart-cong-ty';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

declare var ApexCharts: any;
export interface City {
  name: string;
  id: string;
  // area: string;
  selected?: boolean;
}


@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.scss'],
  providers: [RegionsService, HeaderService, JobsService]
})
export class RegionDetailComponent implements OnInit {
  constructor(private regionsService: RegionsService,
    private jobsService: JobsService,
    public headerService: HeaderService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) {

  }

  // @ViewChild(SelectAutocompleteComponent, {static: true}) multiSelect: SelectAutocompleteComponent;
  // options = [
  //   {
  //     display: 'One',
  //     value: '1'
  //   }, {
  //     display: 'Two',
  //     value: '2'
  //   }, {
  //     display: 'Three',
  //     value: '3'
  //   }, {
  //     display: 'Four',
  //     value: '4'
  //   }, {
  //     display: 'Five',
  //     value: '5'
  //   }, {
  //     display: 'Six',
  //     value: '6'
  //   }
  // ];
  // selectedOptions = ['1', '2', '3', '4'];

  // selected = this.selectedOptions;
  // showError = false;
  // errorMessage = '';

  // onToggleDropdown() {
  //   this.multiSelect.toggleDropdown();
  // }

  // getSelectedOptions(selected) {
  //   this.selected = selected;
  // }

  // onResetSelection() {
  //   this.selectedOptions = [];
  // }
  cityControl = new FormControl();

  cities: City[] = [{ id: '1', name: 'Hà Nội', selected: false },
  { id: '2', name: 'Lombard Street', selected: false },
  { id: '3', name: 'Abbey Road', selected: false },
  { id: '4', name: 'Fifth Avenue', selected: false }];
  selectedCities: City[] = new Array<City>();

  filteredCities: Observable<City[]>;
  lastFilter = '';
  isSelectAll = false;

  
  newJob = 0;
  newJobGrowth = 0.0;
  averageSalary = 0.0;
  averageSalaryGrowth = 0.0;
  numCompany = 0;
  numCompanyGrowth = 0.0;
  averageAge = 0.0;
  averageAgeGrowth = 0.0;

  dataJobDemand;
  dataAverageSalary;
  dataJobDemandByIndustry;
  dataAverageSalaryByIndustry;
  dataHighestSalaryJob;
  dataHighestDemandJob;
  dataTopHiringCompany;
  dataHighestPayingCompany;
  dataJobDemandByAge;
  dataJobDemandByLiteracy;

  numApi = 0;
  public quickTab: any = [
    { name: 'Theo ngành nghề', selected: true, link: 'industryChart' },
    { name: 'Theo vị trí công việc', selected: false, link: 'jobChart' },
    { name: 'Theo công ty', selected: false, link: 'companyChart' },
  ];

  public quy: any = [
    { name: 'III/2019', selected: false },
    { name: 'IV/2019', selected: false },
    { name: 'I/2020', selected: false },
    { name: 'II/2020', selected: true },
  ];

  // public timeIndustryChart: any = [
  //   { name: 'III/2019', selected: false },
  //   { name: 'IV/2019', selected: false },
  //   { name: 'I/2020', selected: false },
  //   { name: 'II/2020', selected: true },
  // ];
  public timeIndustryNumJobChart: any = [];
  public timeIndustrySalaryChart: any = [];
  public timeNumJobAndAverageSalaryChart: any = [];
  public timeJobNumJobChart: any = [];
  public timeJobSalaryChart: any = [];
  public timeCompanyNumJobChart: any = [];
  public timeCompanySalaryChart: any = [];
  public timeAgeAndGenderChart: any = [];
  public timeLiteracyChart: any = [];

  jobDemandAndAverageSalaryTable = ['timestamp', 'numJob', 'salary'];
  jobDemandAndAverageSalary = new MatTableDataSource<any>([]);

  jobDemandByAgeAndGenderTable = ['ageRange', 'male', 'female'];
  jobDemandByAgeAndGender = new MatTableDataSource<any>([]);

  jobDemandByLiteracyTable = ['literacy', 'numJob', 'growth'];
  jobDemandByLiteracy = new MatTableDataSource<any>([]);
  city1 = '';
  cityName1 = '';
  city2 = '';
  cityName2 = '';
  showChart = true;
  isLoading = true;
  isComparing = false;
  // selectedCity = 'P0';
  selectedCity: string;
  selectedCityName = '';
  control = new FormControl();
  cityList: City[] = [{ id: '1', name: 'Champs-Élysées' },
  { id: '2', name: 'Lombard Street' },
  { id: '3', name: 'Abbey Road' },
  { id: '4', name: 'Fifth Avenue' }];
  cityList1: City[];
  cityList2: City[];
  filteredOptions: Observable<City[]>;
  fragment = '';
  filter(filter: string): City[] {
    this.lastFilter = filter;
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
        } else {
          displayValue += ', ' + city.name;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked(event: Event, city: City) {
    event.stopPropagation();
    this.toggleSelection(city);
  }
  toggleSelection(city: City) {
    city.selected = !city.selected;
    if (city.selected) {
      this.selectedCities.push(city);
      if (city.id === 'P0') {
        this.isSelectAll = true;
      }
    } else {
      if (city.id === 'P0') {
        this.isSelectAll = false;
      }
      const i = this.selectedCities.findIndex(value => value.name === city.name);
      this.selectedCities.splice(i, 1);
    }
    // console.log(this.selectedCities);
    this.cityControl.setValue(this.selectedCities);
  }
  

  lastFilter1: string = '';
  filter1(filter: string): City[] {
    this.lastFilter1 = filter;
    if (filter) {
      return this.cityList1.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.cityList1.slice();
    }
  }
  cityControl1 = new FormControl();
  selectedCities1: City[] = new Array<City>();
  filteredCities1: Observable<City[]>;
  displayFn1(value: City[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((city, index) => {
        if (index === 0) {
          displayValue = city.name;
        } else {
          displayValue += ', ' + city.name;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked1(event: Event, city: City) {
    event.stopPropagation();
    this.toggleSelection1(city);
  }
  isSelectAll1 = false;
  toggleSelection1(city: City) {
    city.selected = !city.selected;
    if (city.selected) {
      this.selectedCities1.push(city);
      if(city.id === 'P0'){
        this.isSelectAll1 = true;
      }
    } else {
      if(city.id === 'P0'){
        this.isSelectAll1 = false;
      }
      const i = this.selectedCities1.findIndex(value => value.name === city.name && value.name === city.name);
      this.selectedCities1.splice(i, 1);
    }

    this.cityControl1.setValue(this.selectedCities1);
  }

  lastFilter2: string = '';
  filter2(filter: string): City[] {
    this.lastFilter1 = filter;
    if (filter) {
      return this.cityList2.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.cityList2.slice();
    }
  }
  cityControl2 = new FormControl();
  selectedCities2: City[] = new Array<City>();
  filteredCities2: Observable<City[]>;
  displayFn2(value: City[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((city, index) => {
        if (index === 0) {
          displayValue = city.name;
        } else {
          displayValue += ', ' + city.name;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked2(event: Event, city: City) {
    event.stopPropagation();
    this.toggleSelection2(city);
  }
  isSelectAll2 = false;
  toggleSelection2(city: City) {
    city.selected = !city.selected;
    if (city.selected) {
      this.selectedCities2.push(city);
      if(city.id === 'P0'){
        this.isSelectAll2 = true;
      }
    } else {
      if(city.id === 'P0'){
        this.isSelectAll2 = false;
      }
      const i = this.selectedCities2.findIndex(value => value.name === city.name && value.name === city.name);
      this.selectedCities2.splice(i, 1);
    }

    this.cityControl2.setValue(this.selectedCities2);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '80%',
      data: { city1: this.city1, city2: this.city2, cityName1: this.cityName1, cityName2: this.cityName2 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  ngOnInit() {
    this.headerService.regions = '/regions';
    this.selectedCity = this.route.snapshot.paramMap.get('id');
    if (this.selectedCity == null) {
      this.selectedCity = 'P0';
    }
    console.log("daydaydaya" + this.selectedCity);
    this.numApi = 0;
    // this.filteredCities = this.cityControl.valueChanges.pipe(
    //   startWith<string | City[]>(''),
    //   map(value => typeof value === 'string' ? value : this.lastFilter),
    //   map(filter => this.filter(filter))
    // );
    this.getCityList();
    this.getDashboardData(this.selectedCity);
    this.showJobDemandAndAverageSalary(this.selectedCity);
    this.showJobDemandByIndustry(this.selectedCity);
    this.showAverageSalaryByIndustry(this.selectedCity);
    this.showHighestDemandJobs(this.selectedCity);
    this.showHighestSalaryJobs(this.selectedCity);
    this.showTopHiringCompanies(this.selectedCity);
    this.showHighestPayingCompanies(this.selectedCity);
    this.showJobDemandByAge(this.selectedCity);
    this.showJobDemandByLiteracy(this.selectedCity);
    new ApexCharts(document.querySelector('#chart-viec-lam-moi'), chartViecLamMoi).render();
    new ApexCharts(document.querySelector('#chart-cong-ty'), chartCongTy).render();
    new ApexCharts(document.querySelector('#chart-luong-trung-binh'), chartLuongTrungBinh).render();
    new ApexCharts(document.querySelector('#chart-do-tuoi-trung-binh'), chartDoTuoiTrungBinh).render();

  }
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      setTimeout(() => this.scrollToAnchor(), 10);
    });
  }

  scrollToAnchor(): void {
    try {
      if (this.fragment) {
        document.querySelector('#' + this.fragment).scrollIntoView();
      }
    } catch (e) { }
  }
  goToHere(): void {
    this.router.navigate(['/product'], { fragment: 'here' });
  }
  // displayFn(cityList: City[]): (id: string) => string | null {
  //   return (id: string) => {
  //     const correspondingOption = Array.isArray(cityList) ? cityList.find(option => option.id === id) : null;
  //     return correspondingOption ? correspondingOption.name : '';
  //   };
  // }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.cityList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  increaseNumApi() {
    this.numApi += 1;
    if (this.showChart) {
      if (this.numApi === 10) {
        this.isLoading = false;
      }
    } else {
      if (this.numApi === 4) {
        this.isLoading = false;
      }
    }
  }
  // onCitySelected(selectedCityId) {
  //   // console.log('### Trigger');
  //   // console.log(this.selectedCity);
  //   // console.log(selectedCityId);
  //   this.selectedCity = selectedCityId;
  //   this.selectedCityName = this.cityList.find(x => x.id === selectedCityId).name;
  //   console.log(this.selectedCityName);
  //   this.getDashboardData(this.selectedCity);
  //   this.showJobDemandAndAverageSalary(this.selectedCity);
  //   this.showJobDemandByIndustry(this.selectedCity);
  //   this.showAverageSalaryByIndustry(this.selectedCity);
  //   this.showHighestDemandJobs(this.selectedCity);
  //   this.showHighestSalaryJobs(this.selectedCity);
  //   this.showTopHiringCompanies(this.selectedCity);
  //   this.showHighestPayingCompanies(this.selectedCity);
  //   this.showJobDemandByAge(this.selectedCity);
  //   this.showJobDemandByLiteracy(this.selectedCity);
  // }
  analysisRegion() {
    console.log(this.selectedCities);
    if (this.isComparing) {
      if (this.selectedCities1.length === 1) {
        this.city1 = this.selectedCities1[0].id;
        if(this.city1 === 'P0'){
          this.cityName1 = 'Toàn quốc';
        } else{
          this.cityName1 = this.cityList.find(x => x.id === this.city1).name;
        }
      } else if (this.selectedCities1.length >= 2) {
        const listIdCompare1 = this.selectedCities1.map(a => a.id);
        if (listIdCompare1.includes('P0')) {
          this.city1 = 'P0';
          this.cityName1 = 'Toàn quốc';
        } else {
          const listNameCompare1 = [];
          for(const idCity of listIdCompare1){
            listNameCompare1.push(this.cityList.find(x => x.id === idCity).name);
          }
          this.city1 = listIdCompare1.toString();
          this.cityName1 = listNameCompare1.toString();
        }
      }else{
        alert('Bạn chưa chọn khu vực phân tích');
      }
      if (this.selectedCities2.length === 1) {
        this.city2 = this.selectedCities2[0].id;
        if(this.city2 === 'P0'){
          this.cityName2 = 'Toàn quốc';
        } else{
          this.cityName2 = this.cityList.find(x => x.id === this.city2).name;
        }
      } else if (this.selectedCities2.length >= 2) {
        const listIdCompare2 = this.selectedCities2.map(a => a.id);
        if (listIdCompare2.includes('P0')) {
          this.city2 = 'P0';
          this.cityName2 = 'Toàn quốc';
        } else {
          const listNameCompare2 = [];
          for(const idCity2 of listIdCompare2){
            listNameCompare2.push(this.cityList.find(x => x.id === idCity2).name);
          }
          this.city2 = listIdCompare2.toString();
          this.cityName2 = listNameCompare2.toString();
        }
      }else{
        alert('Bạn chưa chọn khu vực phân tích');
      }
      if(this.selectedCities1.length >= 1 && this.selectedCities2.length >= 1){
        this.openDialog();
      }
    } else {
      this.isLoading = true;
      this.numApi = 0;
      if (this.selectedCities.length === 1) {
        this.showChart = true;
        const cityId = this.selectedCities[0].id;
        this.callApiForOneRegion(cityId);
      } else if (this.selectedCities.length >= 2) {
        const listId = this.selectedCities.map(a => a.id);
        if (listId.includes('P0')) {
          this.showChart = true;
          console.log('co P0 ne')
          const cityId = 'P0';
          this.callApiForOneRegion(cityId);
        } else {
          this.showChart = false;
          const cityId = listId.toString();
          console.log(cityId);
          this.callApiForManyRegion(cityId);
        }
      }
    }
  }
  callApiForOneRegion(cityId: string){
    this.getDashboardData(cityId);
    this.showJobDemandAndAverageSalary(cityId);
    this.showJobDemandByIndustry(cityId);
    this.showAverageSalaryByIndustry(cityId);
    this.showHighestDemandJobs(cityId);
    this.showHighestSalaryJobs(cityId);
    this.showTopHiringCompanies(cityId);
    this.showHighestPayingCompanies(cityId);
    this.showJobDemandByAge(cityId);
    this.showJobDemandByLiteracy(cityId);
  }
  callApiForManyRegion(cityId: string){
    this.getDashboardData(cityId);
    this.showJobDemandAndAverageSalary(cityId);
    this.showJobDemandByAge(cityId);
    this.showJobDemandByLiteracy(cityId);
  }
  getCityList(): void {
    this.jobsService.getCityList()
      .subscribe((data: any) => {
        console.log('getCityList');
        console.log(data.result);
        // this.increaseNumApi();
        this.cityList = data.result;
        this.cityList.splice(0, 0, { name: 'Cả nước', id: "P0" });
        if (this.selectedCity != null && this.selectedCity != 'P0') {
          this.selectedCityName = this.cityList.find(x => x.id === this.selectedCity).name;
        };
        this.cityList2 = JSON.parse(JSON.stringify(data.result));
        this.cityList1 = JSON.parse(JSON.stringify(data.result));
        // if (this.selectedCity === 'P0'){
        //   this.selectedCities.push({name: 'Cả nước', id: 'P0', selected: true});
        // } else {
        //   this.selectedCities.push({name: this.selectedCityName, id: this.selectedCity, selected: true});
        // }
        // console.log(this.selectedCities);
        this.filteredOptions = this.control.valueChanges
          .pipe(
            startWith<string | City>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.cityList.slice())
          );
        // console.log("this.filteredOptions" +this.filteredOptions);

        this.filteredCities = this.cityControl.valueChanges
          .pipe(
            startWith<string | City>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.cityList.slice())
          );
        this.filteredCities1 = this.cityControl1.valueChanges.pipe(
          startWith<string | City[]>(''),
          map(value => typeof value === 'string' ? value : this.lastFilter1),
          map(filter => this.filter1(filter))
        );
    
        this.filteredCities2 = this.cityControl2.valueChanges.pipe(
          startWith<string | City[]>(''),
          map(value => typeof value === 'string' ? value : this.lastFilter2),
          map(filter => this.filter2(filter))
        );
      });
  }
  changeTimeIndustryNumJobChart(index) {
    this.timeIndustryNumJobChart.forEach(element => {
      element.selected = false;
    });
    this.timeIndustryNumJobChart[index].selected = true;
    console.log(index);
    this.reloadJobDemandByIndustry(index);
  }
  changeTimeIndustrySalaryChart(index) {
    this.timeIndustrySalaryChart.forEach(element => {
      element.selected = false;
    });
    this.timeIndustrySalaryChart[index].selected = true;
    console.log(index);
    this.reloadAverageSalaryByIndustry(index);
  }
  changeTimeJobNumJobChart(index) {
    this.timeJobNumJobChart.forEach(element => {
      element.selected = false;
    });
    this.timeJobNumJobChart[index].selected = true;
    console.log(index);
    this.reloadHighestDemandJobs(index);
  }
  changeTimeJobSalaryChart(index) {
    this.timeJobSalaryChart.forEach(element => {
      element.selected = false;
    });
    this.timeJobSalaryChart[index].selected = true;
    console.log(index);
    this.reloadHighestSalaryJobs(index);
  }
  changeTimeCompanyNumJobChart(index) {
    this.timeCompanyNumJobChart.forEach(element => {
      element.selected = false;
    });
    this.timeCompanyNumJobChart[index].selected = true;
    console.log(index);
    this.reloadTopHiringCompany(index);
  }
  changeTimeCompanySalaryChart(index) {
    this.timeCompanySalaryChart.forEach(element => {
      element.selected = false;
    });
    this.timeCompanySalaryChart[index].selected = true;
    console.log(index);
    this.reloadHighestPayingCompany(index);
  }
  changeAgeAndGenderChart(index) {
    this.timeAgeAndGenderChart.forEach(element => {
      element.selected = false;
    });
    this.timeAgeAndGenderChart[index].selected = true;
    console.log(index);
    this.reloadJobDemandByAge(index);
  }
  changeLiteracyChart(index) {
    this.timeLiteracyChart.forEach(element => {
      element.selected = false;
    });
    this.timeLiteracyChart[index].selected = true;
    console.log(index);
    this.reloadJobDemandByLiteracy(index);
  }
  thayDoiQuy(index) {
    this.quy.forEach(element => {
      element.selected = false;
    });
    this.quy[index].selected = true;
  }

  getDashboardData(locationId: string): void {
    this.regionsService.getDashboardData(locationId)
      .subscribe((data: any) => {
        console.log("getDashboardData");
        console.log(data);
        this.increaseNumApi();
        this.newJob = Math.ceil(data.result.numJobPosting.data / 1000);
        this.newJobGrowth = data.result.numJobPosting.growth;
        this.averageSalary = Math.ceil(data.result.averageSalary.data);
        this.averageSalaryGrowth = data.result.averageSalary.growth;
        this.numCompany = Math.ceil(data.result.numCompany.data / 1000);
        this.numCompanyGrowth = data.result.numCompany.growth;
        this.averageAge = data.result.averageAge.data;
        this.averageAgeGrowth = data.result.averageAge.growth;
      });
  }
  showJobDemandAndAverageSalary(locationId: string): void {
    document.getElementById('chart').innerHTML = '';
    this.regionsService.getJobDemandByPeriodOfTime(locationId)
      .subscribe((data: any) => {
        console.log('getJobDemandByPeriodOfTime');
        console.log(data);
        this.increaseNumApi();
        this.dataJobDemand = data;
        // this.jobDemandByPeriodOfTime = data.result;
        const dataTable = [];
        if (Object.keys(data).length > 1) {
          const milestones = data.timestamp;
          const numJob = data.data;
          const growthJob = data.growth;
          this.regionsService.getAverageSalaryByPeriodOfTime(locationId)
            .subscribe((data1: any) => {
              console.log('getAverageSalary');
              console.log(data1);
              this.increaseNumApi();
              this.dataAverageSalary = data1;
              if (Object.keys(data1).length > 1) {
                const salary = data1.data;
                const growthSalary = data1.growth;
                for (let i = 0; i < milestones.length; i++) {
                  const obj = { timestamp: '', numJob: 0, salary: 0.0, growthJob: 0.0, growthSalary: 0.0 };
                  obj.timestamp = milestones[i];
                  obj.numJob = numJob[i];
                  obj.salary = salary[i];
                  obj.growthSalary = growthSalary[i];
                  obj.growthJob = growthJob[i];
                  dataTable.push(obj);

                }
                console.log('jobDemandAndAverageSalary');
                console.log(dataTable);
                this.jobDemandAndAverageSalary.data = dataTable;

                const options = {
                  series: [{
                    name: 'Số lượng công việc',
                    type: 'column',
                    data: numJob
                  }, {
                    name: 'Lương trung bình',
                    type: 'line',
                    data: salary
                  }],
                  chart: {
                    height: 350,
                    type: 'line',
                  },
                  stroke: {
                    width: [0, 4]
                  },
                  colors: ['#38933d', '#8dc971'],
                  title: {
                    text: 'Nhu cầu việc làm và lương trung bình',
                    align: 'left',
                    style: {
                      fontSize: '18px',
                    },
                  },
                  subtitle: {
                    text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
                    align: 'left'
                  },
                  dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                  },
                  labels: milestones,
                  xaxis: {
                    labels: {
                      show: true,
                    },
                    axisBorder: {
                      show: false
                    },
                    axisTicks: {
                      show: false,
                    },
                  },
                  yaxis: [{
                    title: {
                      text: 'Nhu cầu tuyển dụng',
                    },

                  }, {
                    opposite: true,
                    title: {
                      text: 'Mức lương trung bình'
                    }
                  }]
                };

                var chart = new ApexCharts(document.querySelector("#chart"), options);
                chart.render();
              } else {
                // alert("Khu vực bạn chọn không có dữ liệu về lương trung bình");
              }
            });
        } else {
          // alert("Khu vực bạn chọn không có dữ liệu về số lượng việc làm");
        }
      });
  }

  showJobDemandByIndustry(locationId: string) {
    document.getElementById('nhu-cau-theo-nganh-nghe').innerHTML = '';
    this.regionsService.getJobDemandByIndustry(locationId)
      .subscribe((data: any) => {
        console.log('getJobDemandByIndustry');
        console.log(data);
        this.increaseNumApi();
        this.dataJobDemandByIndustry = data;
        const milestones = data.timestamps;
        this.timeIndustryNumJobChart = [];
        let i = 0;
        for (const time of milestones) {
          i++;
          if (i < milestones.length) {
            this.timeIndustryNumJobChart.push({ name: time, selected: false });
          } else {
            this.timeIndustryNumJobChart.push({ name: time, selected: true });
          }
        }
        const numJob = data.result[milestones[milestones.length - 1]].numJob;
        const industryObj = data.result[milestones[milestones.length - 1]].industry;
        const industryName = industryObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Số lượng công việc',
            data: numJob
          }],
          chart: {
            height: 350,
            type: 'bar',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: val => {
              return val + '';
            },
            offsetX: 0,
            style: {
              fontSize: '12px',
              colors: ['#36a800']
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              startingShape: 'flat',
              endingShape: 'flat',
              columnWidth: '70%',
              barHeight: '70%',
              distributed: false,
              // rangeBarOverlap: true,
              dataLabels: {
                position: 'bot', // top, center, bottom
              },
              colors: {
                ranges: [{
                  from: 0,
                  to: 100000000,
                  color: '#37933c'
                }],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
              },
            }
          },
          xaxis: {
            categories: industryName,
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              show: true,
              formatter: val => {
                return '';
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            }
          },
          title: {
            text: 'Phân bố việc làm theo lĩnh vực nghề nghiệp',
            align: 'left',
            style: {
              fontSize: '18px',
              fontFamily: 'Nunito, Arial, sans-serif',
              fontWeight: '600',
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
            align: 'left'
          },
        };
        const chart = new ApexCharts(document.querySelector('#nhu-cau-theo-nganh-nghe'), options);
        chart.render();
      });
  }
  reloadJobDemandByIndustry(index: number) {
    document.getElementById('nhu-cau-theo-nganh-nghe').innerHTML = '';
    const milestones = this.dataJobDemandByIndustry.timestamps;
    const numJob = this.dataJobDemandByIndustry.result[milestones[index]].numJob;
    const industryObj = this.dataJobDemandByIndustry.result[milestones[index]].industry;
    const industryName = industryObj.map(function (el) { return el.name; })
    const options = {
      series: [{
        name: 'Số lượng công việc',
        data: numJob
      }],
      chart: {
        height: 350,
        type: 'bar',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        formatter: val => {
          return val + '';
        },
        offsetX: 0,
        style: {
          fontSize: '12px',
          colors: ['#36a800']
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          startingShape: 'flat',
          endingShape: 'flat',
          columnWidth: '70%',
          barHeight: '70%',
          distributed: false,
          // rangeBarOverlap: true,
          dataLabels: {
            position: 'bot', // top, center, bottom
          },
          colors: {
            ranges: [{
              from: 0,
              to: 100000000,
              color: '#37933c'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {
        categories: industryName,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          formatter: val => {
            return '';
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        }
      },
      title: {
        text: 'Phân bố việc làm theo lĩnh vực nghề nghiệp',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật quý ' + milestones[index],
        align: 'left'
      },
    };
    // const chart = new ApexCharts(document.querySelector('#nhu-cau-theo-nganh-nghe'), options);
    // chart.render();
    new ApexCharts(document.querySelector('#nhu-cau-theo-nganh-nghe'), options).render();
  }
  showAverageSalaryByIndustry(locationId: string) {
    document.getElementById('muc-luong-trung-binh-theo-nganh-nghe').innerHTML = '';
    this.regionsService.getAverageSalaryByIndustry(locationId)
      .subscribe((data: any) => {
        console.log('getAverageSalaryByIndustry');
        console.log(data);
        this.increaseNumApi();
        this.dataAverageSalaryByIndustry = data;
        const milestones = data.timestamps;
        this.timeIndustrySalaryChart = [];
        let i = 0;
        for (const time of milestones) {
          i++;
          if (i < milestones.length) {
            this.timeIndustrySalaryChart.push({ name: time, selected: false })
          } else {
            this.timeIndustrySalaryChart.push({ name: time, selected: true });
          }
        }
        const numJob = data.result[milestones[milestones.length - 1]].numJob;
        const salary = data.result[milestones[milestones.length - 1]].salary;
        const industryObj = data.result[milestones[milestones.length - 1]].industry;
        const industryName = industryObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Mức lương trung bình',
            data: salary
          }],
          chart: {
            height: 350,
            type: 'bar',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: val => {
              return val + '';
            },
            offsetX: 0,
            style: {
              fontSize: '12px',
              colors: ['#36a800']
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              startingShape: 'flat',
              endingShape: 'flat',
              columnWidth: '70%',
              barHeight: '70%',
              distributed: false,
              // rangeBarOverlap: true,
              dataLabels: {
                position: 'bot', // top, center, bottom
              },
              colors: {
                ranges: [{
                  from: 0,
                  to: 100000000,
                  color: '#37933c'
                }],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
              },
            }
          },
          xaxis: {
            categories: industryName,
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              show: true,
              formatter: val => {
                return '';
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            }
          },
          title: {
            text: 'Mức lương trung bình theo lĩnh vực nghề nghiệp',
            align: 'left',
            style: {
              fontSize: '18px',
              fontFamily: 'Nunito, Arial, sans-serif',
              fontWeight: '600',
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
            align: 'left'
          },
        };
        const chart = new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-nganh-nghe'), options);
        chart.render();
      });
  }
  reloadAverageSalaryByIndustry(index: number) {
    document.getElementById('muc-luong-trung-binh-theo-nganh-nghe').innerHTML = '';
    const milestones = this.dataAverageSalaryByIndustry.timestamps;
    const numJob = this.dataAverageSalaryByIndustry.result[milestones[index]].numJob;
    const salary = this.dataAverageSalaryByIndustry.result[milestones[index]].salary;
    const industryObj = this.dataAverageSalaryByIndustry.result[milestones[index]].industry;
    const industryName = industryObj.map(function (el) { return el.name; })
    const options = {
      series: [{
        name: 'Mức lương trung bình',
        data: salary
      }],
      chart: {
        height: 350,
        type: 'bar',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        formatter: val => {
          return val + '';
        },
        offsetX: 0,
        style: {
          fontSize: '12px',
          colors: ['#36a800']
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          startingShape: 'flat',
          endingShape: 'flat',
          columnWidth: '70%',
          barHeight: '70%',
          distributed: false,
          // rangeBarOverlap: true,
          dataLabels: {
            position: 'bot', // top, center, bottom
          },
          colors: {
            ranges: [{
              from: 0,
              to: 100000000,
              color: '#37933c'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {
        categories: industryName,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          formatter: val => {
            return '';
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        }
      },
      title: {
        text: 'Mức lương trung bình theo lĩnh vực nghề nghiệp',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật quý ' + milestones[index],
        align: 'left'
      },
    };
    const chart = new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-nganh-nghe'), options);
    chart.render();
  }
  showHighestDemandJobs(locationId: string) {
    document.getElementById('nhu-cau-theo-vi-tri-cong-viec').innerHTML = '';
    this.regionsService.getHighestDemandJobs(locationId)
      .subscribe((data: any) => {
        console.log("getHighestDemandJobs");
        console.log(data);
        this.increaseNumApi();
        this.dataHighestDemandJob = data;
        const milestones = data.timestamps;
        this.timeJobNumJobChart = [];
        let i = 0;
        for (const time of milestones) {
          i++;
          if (i < milestones.length) {
            this.timeJobNumJobChart.push({ name: time, selected: false });
          } else {
            this.timeJobNumJobChart.push({ name: time, selected: true });
          }
        }
        const numJob = data.result[milestones[milestones.length - 1]].numJob;
        const jobObj = data.result[milestones[milestones.length - 1]].job;
        const jobName = jobObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Số lượng công việc',
            data: numJob
          }],
          chart: {
            height: 350,
            type: 'bar',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: val => {
              return val + '';
            },
            offsetX: 0,
            style: {
              fontSize: '12px',
              colors: ['#36a800']
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              startingShape: 'flat',
              endingShape: 'flat',
              columnWidth: '70%',
              barHeight: '70%',
              distributed: false,
              // rangeBarOverlap: true,
              dataLabels: {
                position: 'bot', // top, center, bottom
              },
              colors: {
                ranges: [{
                  from: 0,
                  to: 100000000,
                  color: '#37933c'
                }],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
              },
            }
          },
          xaxis: {
            categories: jobName,
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              show: true,
              formatter: val => {
                return '';
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            }
          },
          title: {
            text: 'Nhu cầu việc làm theo vị trí công việc',
            align: 'left',
            style: {
              fontSize: '18px',
              fontFamily: 'Nunito, Arial, sans-serif',
              fontWeight: '600',
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
            align: 'left'
          },
        };
        const chart = new ApexCharts(document.querySelector('#nhu-cau-theo-vi-tri-cong-viec'), options);
        chart.render();
      });
  }
  reloadHighestDemandJobs(index: number) {
    document.getElementById('nhu-cau-theo-vi-tri-cong-viec').innerHTML = '';
    const milestones = this.dataHighestDemandJob.timestamps;
    const numJob = this.dataHighestDemandJob.result[milestones[index]].numJob;
    const jobObj = this.dataHighestDemandJob.result[milestones[index]].job;
    const jobName = jobObj.map(function (el) { return el.name; })
    const options = {
      series: [{
        name: 'Số lượng công việc',
        data: numJob
      }],
      chart: {
        height: 350,
        type: 'bar',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        formatter: val => {
          return val + '';
        },
        offsetX: 0,
        style: {
          fontSize: '12px',
          colors: ['#36a800']
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          startingShape: 'flat',
          endingShape: 'flat',
          columnWidth: '70%',
          barHeight: '70%',
          distributed: false,
          // rangeBarOverlap: true,
          dataLabels: {
            position: 'bot', // top, center, bottom
          },
          colors: {
            ranges: [{
              from: 0,
              to: 100000000,
              color: '#37933c'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {
        categories: jobName,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          formatter: val => {
            return '';
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        }
      },
      title: {
        text: 'Nhu cầu việc làm theo vị trí công việc',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật quý ' + milestones[index],
        align: 'left'
      },
    };
    const chart = new ApexCharts(document.querySelector('#nhu-cau-theo-vi-tri-cong-viec'), options);
    chart.render();
  }
  showHighestSalaryJobs(locationId: string) {
    document.getElementById('muc-luong-trung-binh-theo-vi-tri-cong-viec').innerHTML = '';
    this.regionsService.getHighestSalaryJobs(locationId)
      .subscribe((data: any) => {
        console.log('getHighestSalaryJobs');
        console.log(data);
        this.increaseNumApi();
        this.dataHighestSalaryJob = data;
        const milestones = data.timestamps;
        this.timeJobSalaryChart = [];
        let i = 0;
        for (const time of milestones) {
          i++;
          if (i < milestones.length) {
            this.timeJobSalaryChart.push({ name: time, selected: false });
          } else {
            this.timeJobSalaryChart.push({ name: time, selected: true });
          }
        }
        const numJob = data.result[milestones[milestones.length - 1]].numJob;
        const salary = data.result[milestones[milestones.length - 1]].salary;
        const jobObj = data.result[milestones[milestones.length - 1]].job;
        const jobName = jobObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Mức lương trung bình',
            data: salary
          }],
          chart: {
            height: 350,
            type: 'bar',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: val => {
              return val + '';
            },
            offsetX: 0,
            style: {
              fontSize: '12px',
              colors: ['#36a800']
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              startingShape: 'flat',
              endingShape: 'flat',
              columnWidth: '70%',
              barHeight: '70%',
              distributed: false,
              // rangeBarOverlap: true,
              dataLabels: {
                position: 'bot', // top, center, bottom
              },
              colors: {
                ranges: [{
                  from: 0,
                  to: 100000000,
                  color: '#37933c'
                }],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
              },
            }
          },
          xaxis: {
            categories: jobName,
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              show: true,
              formatter: val => {
                return '';
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            }
          },
          title: {
            text: 'Những vị trí công việc được trả lương cao',
            align: 'left',
            style: {
              fontSize: '18px',
              fontFamily: 'Nunito, Arial, sans-serif',
              fontWeight: '600',
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
            align: 'left'
          },
        };
        const chart = new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-vi-tri-cong-viec'), options);
        chart.render();
      });
  }
  reloadHighestSalaryJobs(index: number) {
    document.getElementById('muc-luong-trung-binh-theo-vi-tri-cong-viec').innerHTML = '';
    const milestones = this.dataHighestSalaryJob.timestamps;
    const numJob = this.dataHighestSalaryJob.result[milestones[index]].numJob;
    const salary = this.dataHighestSalaryJob.result[milestones[index]].salary;
    const jobObj = this.dataHighestSalaryJob.result[milestones[index]].job;
    const jobName = jobObj.map(function (el) { return el.name; })
    const options = {
      series: [{
        name: 'Mức lương trung bình',
        data: salary
      }],
      chart: {
        height: 350,
        type: 'bar',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        formatter: val => {
          return val + '';
        },
        offsetX: 0,
        style: {
          fontSize: '12px',
          colors: ['#36a800']
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          startingShape: 'flat',
          endingShape: 'flat',
          columnWidth: '70%',
          barHeight: '70%',
          distributed: false,
          // rangeBarOverlap: true,
          dataLabels: {
            position: 'bot', // top, center, bottom
          },
          colors: {
            ranges: [{
              from: 0,
              to: 100000000,
              color: '#37933c'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {
        categories: jobName,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          formatter: val => {
            return '';
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        }
      },
      title: {
        text: 'Những vị trí công việc được trả lương cao',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật quý ' + milestones[index],
        align: 'left'
      },
    };
    const chart = new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-vi-tri-cong-viec'), options);
    chart.render();
  }
  showTopHiringCompanies(locationId: string) {
    document.getElementById('nhu-cau-tuyen-dung-theo-cong-ty').innerHTML = '';
    this.regionsService.getTopHiringCompanies(locationId)
      .subscribe((data: any) => {
        console.log('getTopHiringCompanies');
        console.log(data);
        this.increaseNumApi();
        this.dataTopHiringCompany = data;
        const milestones = data.timestamps;
        this.timeCompanyNumJobChart = [];
        let i = 0;
        for (const time of milestones) {
          i++;
          if (i < milestones.length) {
            this.timeCompanyNumJobChart.push({ name: time, selected: false });
          } else {
            this.timeCompanyNumJobChart.push({ name: time, selected: true });
          }
        }
        const numJob = data.result[milestones[milestones.length - 1]].numJob;
        const salary = data.result[milestones[milestones.length - 1]].salary;
        const companyObj = data.result[milestones[milestones.length - 1]].company;
        const companyName = companyObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Số lượng công việc',
            data: numJob
          }],
          chart: {
            height: 350,
            type: 'bar',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: val => {
              return val + '';
            },
            offsetX: 0,
            style: {
              fontSize: '12px',
              colors: ['#36a800']
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              startingShape: 'flat',
              endingShape: 'flat',
              columnWidth: '70%',
              barHeight: '70%',
              distributed: false,
              // rangeBarOverlap: true,
              dataLabels: {
                position: 'bot', // top, center, bottom
              },
              colors: {
                ranges: [{
                  from: 0,
                  to: 100000000,
                  color: '#37933c'
                }],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
              },
            }
          },
          xaxis: {
            categories: companyName,
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              show: true,
              formatter: val => {
                return '';
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            }
          },
          title: {
            text: 'Nhu cầu tuyển dụng theo công ty',
            align: 'left',
            style: {
              fontSize: '18px',
              fontFamily: 'Nunito, Arial, sans-serif',
              fontWeight: '600',
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
            align: 'left'
          },
        };
        const chart = new ApexCharts(document.querySelector('#nhu-cau-tuyen-dung-theo-cong-ty'), options);
        chart.render();
      });
  }
  reloadTopHiringCompany(index: number) {
    document.getElementById('nhu-cau-tuyen-dung-theo-cong-ty').innerHTML = '';
    const milestones = this.dataTopHiringCompany.timestamps;
    const numJob = this.dataTopHiringCompany.result[milestones[index]].numJob;
    const salary = this.dataTopHiringCompany.result[milestones[index]].salary;
    const companyObj = this.dataTopHiringCompany.result[milestones[index]].company;
    const companyName = companyObj.map(function (el) { return el.name; })
    const options = {
      series: [{
        name: 'Số lượng công việc',
        data: numJob
      }],
      chart: {
        height: 350,
        type: 'bar',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        formatter: val => {
          return val + '';
        },
        offsetX: 0,
        style: {
          fontSize: '12px',
          colors: ['#36a800']
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          startingShape: 'flat',
          endingShape: 'flat',
          columnWidth: '70%',
          barHeight: '70%',
          distributed: false,
          // rangeBarOverlap: true,
          dataLabels: {
            position: 'bot', // top, center, bottom
          },
          colors: {
            ranges: [{
              from: 0,
              to: 100000000,
              color: '#37933c'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {
        categories: companyName,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          formatter: val => {
            return '';
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        }
      },
      title: {
        text: 'Nhu cầu tuyển dụng theo công ty',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật quý ' + milestones[index],
        align: 'left'
      },
    };
    const chart = new ApexCharts(document.querySelector('#nhu-cau-tuyen-dung-theo-cong-ty'), options);
    chart.render();
  }
  showHighestPayingCompanies(locationId: string) {
    document.getElementById('muc-luong-trung-binh-theo-cong-ty').innerHTML = '';
    this.regionsService.getHighestPayingCompanies(locationId)
      .subscribe((data: any) => {
        console.log('getHighestPayingCompanies');
        console.log(data);
        this.increaseNumApi();
        this.dataHighestPayingCompany = data;
        const milestones = data.timestamps;
        this.timeCompanySalaryChart = [];
        let i = 0;
        for (const time of milestones) {
          i++;
          if (i < milestones.length) {
            this.timeCompanySalaryChart.push({ name: time, selected: false });
          } else {
            this.timeCompanySalaryChart.push({ name: time, selected: true });
          }
        }
        const numJob = data.result[milestones[milestones.length - 1]].numJob.slice(0, 10);
        const salary = data.result[milestones[milestones.length - 1]].salary.slice(0, 10);
        const companyObj = data.result[milestones[milestones.length - 1]].company.slice(0, 10);
        const companyName = companyObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Mức lương trung bình',
            data: salary
          }],
          chart: {
            height: 350,
            type: 'bar',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: val => {
              return val + '';
            },
            offsetX: 0,
            style: {
              fontSize: '12px',
              colors: ['#36a800']
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              startingShape: 'flat',
              endingShape: 'flat',
              columnWidth: '70%',
              barHeight: '70%',
              distributed: false,
              // rangeBarOverlap: true,
              dataLabels: {
                position: 'bot', // top, center, bottom
              },
              colors: {
                ranges: [{
                  from: 0,
                  to: 100000000,
                  color: '#37933c'
                }],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
              },
            }
          },
          xaxis: {
            categories: companyName,
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              show: true,
              formatter: val => {
                return '';
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            }
          },
          title: {
            text: 'Mức lương trung bình theo công ty',
            align: 'left',
            style: {
              fontSize: '18px',
              fontFamily: 'Nunito, Arial, sans-serif',
              fontWeight: '600',
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
            align: 'left'
          },
        };
        const chart = new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-cong-ty'), options);
        chart.render();
      });
  }
  reloadHighestPayingCompany(index: number) {
    document.getElementById('muc-luong-trung-binh-theo-cong-ty').innerHTML = '';
    const milestones = this.dataHighestPayingCompany.timestamps;
    const numJob = this.dataHighestPayingCompany.result[milestones[index]].numJob.slice(0, 10);
    const salary = this.dataHighestPayingCompany.result[milestones[index]].salary.slice(0, 10);
    const companyObj = this.dataHighestPayingCompany.result[milestones[index]].company.slice(0, 10);
    const companyName = companyObj.map(function (el) { return el.name; })
    const options = {
      series: [{
        name: 'Mức lương trung bình',
        data: salary
      }],
      chart: {
        height: 350,
        type: 'bar',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        formatter: val => {
          return val + '';
        },
        offsetX: 0,
        style: {
          fontSize: '12px',
          colors: ['#36a800']
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          startingShape: 'flat',
          endingShape: 'flat',
          columnWidth: '70%',
          barHeight: '70%',
          distributed: false,
          // rangeBarOverlap: true,
          dataLabels: {
            position: 'bot', // top, center, bottom
          },
          colors: {
            ranges: [{
              from: 0,
              to: 100000000,
              color: '#37933c'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {
        categories: companyName,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          formatter: val => {
            return '';
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        }
      },
      title: {
        text: 'Mức lương trung bình theo công ty',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật quý ' + milestones[index],
        align: 'left'
      },
    };
    const chart = new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-cong-ty'), options);
    chart.render();
  }
  showJobDemandByAge(locationId: string): void {
    document.getElementById('nhu-cau-tuyen-dung-theo-do-tuoi-gioi-tinh').innerHTML = '';
    this.regionsService.getJobDemandByAge(locationId)
      .subscribe((data: any) => {
        console.log('getJobDemandByAge');
        console.log(data);
        this.increaseNumApi();
        this.dataJobDemandByAge = data;
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          this.timeAgeAndGenderChart = [];
          let i = 0;
          for (const time of milestones) {
            i++;
            if (i < milestones.length) {
              this.timeAgeAndGenderChart.push({ name: time, selected: false });
            } else {
              this.timeAgeAndGenderChart.push({ name: time, selected: true });
            }
          }
          const ageRanges = data.ageRange;
          const male = data[milestones[milestones.length - 1]].male;
          const female = data[milestones[milestones.length - 1]].female;
          const dataTable = [];
          for (let i = 0; i < ageRanges.length; i++) {
            const obj = { ageRange: '', male: 0, female: 0.0 };
            obj.ageRange = ageRanges[i];
            obj.male = male[i];
            obj.female = female[i];
            dataTable.push(obj);
          }
          this.jobDemandByAgeAndGender.data = dataTable;
          const options = {
            series: [{
              name: ' Nam',
              data: male
            }, {
              name: 'Nữ',
              data: female
            }],
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            colors: ['#38933d', '#8dc971'],
            title: {
              text: 'Nhu cầu việc làm theo độ tuổi, giới tính',
              align: 'left',
              style: {
                fontSize: '18px',
              },
            },
            subtitle: {
              text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
              align: 'left'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            xaxis: {
              // type: 'datetime',
              categories: ageRanges,
            },
            legend: {
              position: 'right',
              offsetY: 40
            },
            fill: {
              opacity: 1
            }
          };

          const chart = new ApexCharts(document.querySelector('#nhu-cau-tuyen-dung-theo-do-tuoi-gioi-tinh'), options);
          chart.render();
        } else {
          alert('Khu vực bạn chọn không có dữ liệu về độ tuổi');
        }
      });
  }
  reloadJobDemandByAge(index: number) {
    document.getElementById('nhu-cau-tuyen-dung-theo-do-tuoi-gioi-tinh').innerHTML = '';
    if (Object.keys(this.dataJobDemandByAge).length > 2) {
      const milestones = this.dataJobDemandByAge.timestamps;
      const ageRanges = this.dataJobDemandByAge.ageRange;
      const male = this.dataJobDemandByAge[milestones[index]].male;
      const female = this.dataJobDemandByAge[milestones[index]].female;
      const dataTable = [];
      for (let i = 0; i < ageRanges.length; i++) {
        const obj = { ageRange: '', male: 0, female: 0.0 };
        obj.ageRange = ageRanges[i];
        obj.male = male[i];
        obj.female = female[i];
        dataTable.push(obj);
      }
      this.jobDemandByAgeAndGender.data = dataTable;
      const options = {
        series: [{
          name: ' Nam',
          data: male
        }, {
          name: 'Nữ',
          data: female
        }],
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        colors: ['#38933d', '#8dc971'],
        title: {
          text: 'Nhu cầu việc làm theo độ tuổi, giới tính',
          align: 'left',
          style: {
            fontSize: '18px',
          },
        },
        subtitle: {
          text: 'Dữ liệu cập nhật quý ' + milestones[index],
          align: 'left'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          // type: 'datetime',
          categories: ageRanges,
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      };

      const chart = new ApexCharts(document.querySelector("#nhu-cau-tuyen-dung-theo-do-tuoi-gioi-tinh"), options);
      chart.render();
    } else {
      alert("Khu vực bạn chọn không có dữ liệu về độ tuổi");
    }
  }
  showJobDemandByLiteracy(locationId: string): void {
    document.getElementById('nhu-cau-tuyen-dung-theo-trinh-do-hoc-van').innerHTML = '';
    this.regionsService.getJobDemandByLiteracy(locationId)
      .subscribe((data: any) => {
        console.log('getJobDemandByLiteracy');
        console.log(data);
        this.increaseNumApi();
        this.dataJobDemandByLiteracy = data;
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          this.timeLiteracyChart = [];
          let i = 0;
          for (const time of milestones) {
            i++;
            if (i < milestones.length) {
              this.timeLiteracyChart.push({ name: time, selected: false });
            } else {
              this.timeLiteracyChart.push({ name: time, selected: true });
            }
          }
          const literacies = data.literacy;
          const literacyObj = data.literacy;
          const literacyName = literacyObj.map(function (el) { return el.name; })

          const numJob = data[milestones[milestones.length - 1]].data;
          const growth = data[milestones[milestones.length - 1]].growth;
          const dataTable = [];

          for (let i = 0; i < literacies.length; i++) {
            const obj = { literacy: '', numJob: 0, growth: 0.0 };
            obj.literacy = literacies[i].name;
            obj.numJob = numJob[i];
            obj.growth = growth[i];
            dataTable.push(obj);
          }
          console.log(dataTable);
          this.jobDemandByLiteracy.data = dataTable;

          const options = {
            series: numJob,
            chart: {
              width: '100%',
              height: 350,
              type: 'donut',

            },
            colors: ['#2e7932', '#77792e', '#9e9c00', '#649628', '#0890a9'],
            labels: literacyName,
            // theme: {
            //   palette: 'palette2',
            //   monochrome: {
            //     enabled: true,
            //     color: '#82b440',
            //   }
            // },

            title: {
              text: 'Biểu đồ phân bổ việc làm theo trình độ học vấn',
              align: 'left',
              style: {
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
              },
            },
            subtitle: {
              text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
              align: 'left'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          };

          const chart = new ApexCharts(document.querySelector('#nhu-cau-tuyen-dung-theo-trinh-do-hoc-van'), options);
          chart.render();
        } else {
          alert('Khu vực bạn chọn không có dữ liệu về trình độ học vấn');
        }
      });
  }
  reloadJobDemandByLiteracy(index: number) {
    document.getElementById('nhu-cau-tuyen-dung-theo-trinh-do-hoc-van').innerHTML = '';
    if (Object.keys(this.dataJobDemandByLiteracy).length > 2) {
      const milestones = this.dataJobDemandByLiteracy.timestamps;
      const literacies = this.dataJobDemandByLiteracy.literacy;
      const literacyObj = this.dataJobDemandByLiteracy.literacy;
      const literacyName = literacyObj.map(function (el) { return el.name; })

      const numJob = this.dataJobDemandByLiteracy[milestones[index]].data;
      const growth = this.dataJobDemandByLiteracy[milestones[index]].growth;
      const dataTable = [];

      for (let i = 0; i < literacies.length; i++) {
        const obj = { literacy: '', numJob: 0, growth: 0.0 };
        obj.literacy = literacies[i].name;
        obj.numJob = numJob[i];
        obj.growth = growth[i];
        dataTable.push(obj);
      }
      console.log(dataTable);
      this.jobDemandByLiteracy.data = dataTable;

      const options = {
        series: numJob,
        chart: {
          width: '100%',
          height: 350,
          type: 'donut',

        },
        colors: ['#2e7932', '#77792e', '#9e9c00', '#649628', '#0890a9'],
        labels: literacyName,
        // theme: {
        //   palette: 'palette2',
        //   monochrome: {
        //     enabled: true,
        //     color: '#82b440',
        //   }
        // },

        title: {
          text: 'Biểu đồ phân bổ việc làm theo trình độ học vấn',
          align: 'left',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238'
          },
        },
        subtitle: {
          text: 'Dữ liệu cập nhật quý ' + milestones[index],
          align: 'left'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

      const chart = new ApexCharts(document.querySelector('#nhu-cau-tuyen-dung-theo-trinh-do-hoc-van'), options);
      chart.render();
    } else {
      alert('Khu vực bạn chọn không có dữ liệu về trình độ học vấn');
    }
  }
}
