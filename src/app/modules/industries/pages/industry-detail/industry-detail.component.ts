import { Component, OnInit, Input } from '@angular/core';
import { IndustriesService } from '../../industries.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { JobsService } from '../../../jobs/jobs.service';
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
  selector: 'app-industry-detail',
  templateUrl: './industry-detail.component.html',
  styleUrls: ['./industry-detail.component.scss'],
  providers: [IndustriesService, JobsService]
})
export class IndustryDetailComponent {
  
  topCompanies = [];
  jobDemandAndAverageSalaryTable = ['timestamp', 'numJob', 'salary'];
  jobDemandAndAverageSalary = new MatTableDataSource<any>([]);

  jobDemandByIndustryTable = ['timestamp', 'numJob', 'growth'];
  jobDemandByIndustry = new MatTableDataSource<any>([]);

  jobDemandByAgeAndGenderTable = ['ageRange', 'male', 'female'];
  jobDemandByAgeAndGender = new MatTableDataSource<any>([]);

  jobDemandByLiteracyTable = ['literacy', 'numJob', 'growth'];
  jobDemandByLiteracy = new MatTableDataSource<any>([]);

  dataJobDemand;
  dataAverageSalary;
  dataTopHiringRegion;
  dataHighestSalaryRegion;
  dataHighestSalaryJob;
  dataHighestDemandJob;
  dataTopHiringCompany;
  dataHighestPayingCompany;
  dataJobDemandByAge;
  dataJobDemandByLiteracy;


  public timeRegionNumJobChart: any = [];
  public timeRegionSalaryChart: any = [];
  public timeJobNumJobChart: any = [];
  public timeJobSalaryChart: any = [];
  public timeCompanyNumJobChart: any = [];
  public timeCompanySalaryChart: any = [];
  public timeAgeChart: any = [];
  public timeLiteracyChart: any = [];

  jobID$: Observable<any>;
  selectedIndustryId: string;
  selectedIndustryName: string;

  selectedCity = 'P0';
  selectedCityName = '';
  showChartRegion = true;
  isManyRegion = false;
  numApi = 0;
  isLoading = true;
  isComparing = false;
  city1 = '';
  cityName1 = '';
  city2 = '';
  cityName2 = '';
  cityList: City[];
  cityList1: City[];
  cityList2: City[];
  selectedCities: City[] = new Array<City>();
  filteredCities: Observable<City[]>;
  lastFilter = '';
  cityControl = new FormControl();
  filter(filter: string): City[] {
    this.lastFilter = filter;
    if (filter) {
      return this.cityList.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.cityList.slice();
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
  isSelectAll = false;
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

  // filteredOptions: Observable<City[]>;
  // displayFn(cityList: City[]): (id: string) => string | null {
  //   return (id: string) => {
  //     const correspondingOption = Array.isArray(cityList) ? cityList.find(option => option.id === id) : null;
  //     return correspondingOption ? correspondingOption.name : '';
  //   };
  // }

  // private _filter(name: string): City[] {
  //   const filterValue = name.toLowerCase();

  //   return this.cityList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  // }
  increaseNumApi() {
    this.numApi += 1;
    // if (this.showChartRegion) {
    //   if (this.numApi === 9) {
    //     this.isLoading = false;
    //   }
    // } else {
    //   if (this.numApi === 7) {
    //     this.isLoading = false;
    //   }
    // }

    if (this.selectedCities.length === 1) {
      const cityId = this.selectedCities[0].id;
      if(cityId === 'P0'){
        if (this.numApi === 9) {
          this.isLoading = false;
        }
      } else{
        if (this.numApi === 7) {
          this.isLoading = false;
        }
      }
    } else if (this.selectedCities.length >= 2) {
      const listId = this.selectedCities.map(a => a.id);
      if (listId.includes('P0')) {
        if (this.numApi === 9) {
          this.isLoading = false;
        }
      } else {
        if (this.numApi === 3) {
          this.isLoading = false;
        }
      }
    } else {
      if (this.showChartRegion) {
        if (this.numApi === 9) {
          this.isLoading = false;
        }
      }
    }
  }
  // onCitySelected(selectedCityId) {
  //   this.numApi = 0;
  //   this.selectedCity = selectedCityId;
  //   this.isLoading = true;
  //   console.log('this.selectedCity ' + this.selectedCity);
  //   this.selectedCityName = this.cityList.find(x => x.id === selectedCityId).name;
  //   this.showChart = false;
  //   this.showJobDemandAndAverageSalary(this.selectedIndustryId, this.selectedCity);
  //   this.showTopHiringCompany(this.selectedIndustryId, this.selectedCity);
  //   this.showTopCompanyHighestSalary(this.selectedIndustryId, this.selectedCity);
  //   this.showTopHiringJob(this.selectedIndustryId, this.selectedCity);
  //   this.showHighestSalaryJob(this.selectedIndustryId, this.selectedCity);
  //   this.showJobDemandByAge(this.selectedIndustryId, this.selectedCity);
  //   this.showJobDemandByLiteracy(this.selectedIndustryId, this.selectedCity);
  // }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '80%',
      height: '80%',
      data: {industryId: this.selectedIndustryId, industryName: this.selectedIndustryName, city1: this.city1,
              city2: this.city2, cityName1: this.cityName1, cityName2: this.cityName2 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
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
      } else{
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
      } else{
        alert('Bạn chưa chọn khu vực phân tích');
      }
      if(this.selectedCities1.length >= 1 && this.selectedCities2.length >= 1){
        this.openDialog();
      }
    } else {
      this.isLoading = true;
      this.numApi = 0;
      if (this.selectedCities.length === 1) {
        this.isManyRegion = false;
        // this.selectedCity = selectedCityId;
        const cityId = this.selectedCities[0].id;
        this.isLoading = true;
        console.log('this.selectedCity ' + this.selectedCity);
        this.selectedCityName = this.cityList.find(x => x.id === cityId).name;
        if(cityId === 'P0'){
          this.showChartRegion = true;
          this.callApiForCountry(cityId);
        } else{
          this.showChartRegion = false;
          this.callApiForOneRegion(cityId);
        }
      } else if (this.selectedCities.length >= 2) {
        const listId = this.selectedCities.map(a => a.id);
        if (listId.includes('P0')) {
          this.isManyRegion = false;
          this.showChartRegion = true;
          console.log('co P0 ne');
          const cityId = 'P0';
          this.callApiForCountry(cityId);
        } else {
          this.isManyRegion = true;
          console.log(this.isManyRegion);
          this.showChartRegion = false;
          const cityId = listId.toString();
          console.log(cityId);
          this.callApiForManyRegion(cityId);
        }
      }
    }
  }
  callApiForCountry(cityId: string){
    this.showJobDemandAndAverageSalary(this.selectedIndustryId, cityId);
    this.showTopHiringRegion(this.selectedIndustryId);
    this.showHighestSalaryRegion(this.selectedIndustryId);
    this.showTopHiringCompany(this.selectedIndustryId, cityId);
    this.showTopCompanyHighestSalary(this.selectedIndustryId, cityId);
    this.showTopHiringJob(this.selectedIndustryId, cityId);
    this.showHighestSalaryJob(this.selectedIndustryId, cityId);
    this.showJobDemandByAge(this.selectedIndustryId, cityId);
    this.showJobDemandByLiteracy(this.selectedIndustryId, cityId);
  }
  callApiForOneRegion(cityId: string){
    this.showJobDemandAndAverageSalary(this.selectedIndustryId, cityId);
    this.showTopHiringCompany(this.selectedIndustryId, cityId);
    this.showTopCompanyHighestSalary(this.selectedIndustryId, cityId);
    this.showTopHiringJob(this.selectedIndustryId, cityId);
    this.showHighestSalaryJob(this.selectedIndustryId, cityId);
    this.showJobDemandByAge(this.selectedIndustryId, cityId);
    this.showJobDemandByLiteracy(this.selectedIndustryId, cityId);
  }
  callApiForManyRegion(cityId: string){
    this.showJobDemandAndAverageSalary(this.selectedIndustryId, cityId);
    this.showJobDemandByAge(this.selectedIndustryId, cityId);
    this.showJobDemandByLiteracy(this.selectedIndustryId, cityId);
  }
  // ngOnChanges() {
  //   // create header using child_id
  //   console.log(this.selectedCity);
  //   this.showJobDemandAndAverageSalary(this.selectedJobId, this.selectedCity);
  //   this.showJobDemandByAge(this.selectedJobId, this.selectedCity);
  //   this.showJobDemandByLiteracy(this.selectedJobId, this.selectedCity);

  // }

  changeTimeRegionNumJobChart(index) {
    this.timeRegionNumJobChart.forEach(element => {
      element.selected = false;
    });
    this.timeRegionNumJobChart[index].selected = true;
    console.log(index);
    this.reloadTopHiringRegion(index);
  }

  changeTimeRegionSalaryChart(index) {
    this.timeRegionSalaryChart.forEach(element => {
      element.selected = false;
    });
    this.timeRegionSalaryChart[index].selected = true;
    console.log(index);
    this.reloadHighestSalaryRegion(index);
  }

  changeTimeJobNumJobChart(index) {
    this.timeJobNumJobChart.forEach(element => {
      element.selected = false;
    });
    this.timeJobNumJobChart[index].selected = true;
    console.log(index);
    this.reloadTopHiringJob(index);
  }
  changeTimeJobSalaryChart(index) {
    this.timeJobSalaryChart.forEach(element => {
      element.selected = false;
    });
    this.timeJobSalaryChart[index].selected = true;
    console.log(index);
    this.reloadHighestSalaryJob(index);
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
    this.reloadTopCompanyHighestSalary(index);
  }

  changeTimeAgeChart(index) {
    this.timeAgeChart.forEach(element => {
      element.selected = false;
    });
    this.timeAgeChart[index].selected = true;
    console.log(index);
    this.reloadJobDemandByAge(index);
  }

  changeTimeLiteracyChart(index) {
    this.timeLiteracyChart.forEach(element => {
      element.selected = false;
    });
    this.timeLiteracyChart[index].selected = true;
    console.log(index);
    this.reloadJobDemandByLiteracy(index);
  }

  getCityList(): void {
    this.jobsService.getCityList()
      .subscribe((data: any) => {
        console.log('getCityList');
        console.log(data.result);
        this.cityList = data.result;
        this.cityList.splice(0, 0, { name: 'Cả nước', id: "P0" });
        if (this.selectedCity != null && this.selectedCity != 'P0') {
          this.selectedCityName = this.cityList.find(x => x.id === this.selectedCity).name;
        };
        this.cityList2 = JSON.parse(JSON.stringify(data.result));
        this.cityList1 = JSON.parse(JSON.stringify(data.result));
        // this.filteredCities = this.cityControl.valueChanges
        //   .pipe(
        //     startWith<string | City>(''),
        //     map(value => typeof value === 'string' ? value : value.name),
        //     map(name => name ? this._filter(name) : this.cityList.slice())
        //   );
        this.filteredCities = this.cityControl.valueChanges.pipe(
          startWith<string | City[]>(''),
          map(value => typeof value === 'string' ? value : this.lastFilter),
          map(filter => this.filter(filter))
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

  getIndustryList(): void {
    this.industriesService.getIndustryList()
      .subscribe((data: any) => {
        console.log("getIndustryList");
        console.log(data.result);
        const industryList = data.result;
        this.selectedIndustryName = industryList.find(x => x.id === this.selectedIndustryId).name;
        
      });
  }

  constructor(private industriesService: IndustriesService,
    private jobsService: JobsService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    this.selectedIndustryId = this.route.snapshot.paramMap.get('id');
    console.log(this.selectedIndustryId + 'this.selectedIndustryId')
  }

  ngOnInit() {
    this.getCityList();
    this.getIndustryList();
    // this.getTopCompanies(this.selectedIndustryId, this.selectedCity);
    this.callApiForCountry(this.selectedCity);

  }

  getTopCompanies(industryId: string, idProvince: string): void {
    this.industriesService.getTopCompanies(industryId, idProvince)
      .subscribe((data: any) => {
        console.log('getTopCompanies');
        console.log(data.result);
        this.topCompanies = data.result;
      });
  }
  showJobDemandAndAverageSalary(industryId: string, idLocation: string): void {
    document.getElementById('chart').innerHTML = '';
    this.industriesService.getJobDemandByPeriodOfTime(industryId, idLocation)
      .subscribe((data: any) => {
        console.log('getJobDemandByPeriodOfTime');
        console.log(data);
        this.dataJobDemand = data;
        this.increaseNumApi();
        // this.jobDemandByPeriodOfTime = data.result;
        const dataTable = [];
        if (Object.keys(data).length > 1) {
          const milestones = data.timestamps;
          let numJob = [];
          let growthJob = [];
          numJob = data.data;
          growthJob = data.growth;
          this.industriesService.getAverageSalary(industryId, idLocation)
            .subscribe((data1: any) => {
              // const milestones = data.timestamp;
              this.increaseNumApi();
              console.log('getAverageSalary');
              console.log(data1);
              this.dataAverageSalary = data1;
              if (Object.keys(data1).length > 1) {
                let salary = [];
                let growthSalary = [];
                salary = data1.data;
                growthSalary = data1.growth;
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
  showTopHiringRegion(idIndustry: string) {
    document.getElementById('nhu_cau_tuyen_dung_theo_khu_vuc').innerHTML = '';
    this.industriesService.getTopHiringRegion(idIndustry)
      .subscribe((data: any) => {
        console.log('getTopHiringRegion');
        console.log(data);
        this.increaseNumApi();
        this.dataTopHiringRegion = data;
        const milestones = data.timestamps;
        this.timeRegionNumJobChart = [];
        let i = 0;
        for(const time of milestones){
          i++;
          if ( i < milestones.length){
            this.timeRegionNumJobChart.push({name: time, selected: false});
          } else {
            this.timeRegionNumJobChart.push({name: time, selected: true});
          }
        }
        const numJob = data[milestones[milestones.length - 1]].data;
        const regionObj = data[milestones[milestones.length - 1]].region;
        const regionName = regionObj.map(function (el) { return el.name; })
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
                  to: 10000000000000,
                  color: '#37933c'
                }],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
              },
            }
          },
          xaxis: {
            categories: regionName,
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
            text: 'Các khu vực có nhu cầu tuyển dụng lớn',
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
        const chart = new ApexCharts(document.querySelector('#nhu_cau_tuyen_dung_theo_khu_vuc'), options);
        chart.render();
      });
  }
  reloadTopHiringRegion(index: number) {
    document.getElementById('nhu_cau_tuyen_dung_theo_khu_vuc').innerHTML = '';
    const milestones = this.dataTopHiringRegion.timestamps;
    const numJob = this.dataTopHiringRegion[milestones[index]].data;
    const regionObj = this.dataTopHiringRegion[milestones[index]].region;
    const regionName = regionObj.map(function (el) { return el.name; })
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
              to: 10000000000000,
              color: '#37933c'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {
        categories: regionName,
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
        text: 'Các khu vực có nhu cầu tuyển dụng lớn',
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
    const chart = new ApexCharts(document.querySelector('#nhu_cau_tuyen_dung_theo_khu_vuc'), options);
    chart.render();
  }
  showHighestSalaryRegion(idIndustry: string) {
    document.getElementById('khu_vuc_tra_luong_cao').innerHTML = '';
    this.industriesService.getHighestSalaryRegion(idIndustry)
      .subscribe((data: any) => {
        console.log('getHighestSalaryRegion');
        console.log(data);
        this.increaseNumApi();
        this.dataHighestSalaryRegion = data;
        const milestones = data.timestamps;
        this.timeRegionSalaryChart = [];
        let i = 0;
        for(const time of milestones){
          i++;
          if ( i < milestones.length){
            this.timeRegionSalaryChart.push({name: time, selected: false});
          } else {
            this.timeRegionSalaryChart.push({name: time, selected: true});
          }
        }
        const numJob = data[milestones[milestones.length - 1]].data;
        const regionObj = data[milestones[milestones.length - 1]].region;
        const regionName = regionObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Mức lương trung bình',
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
                  to: 10000000000000,
                  color: '#37933c'
                }],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
              },
            }
          },
          xaxis: {
            categories: regionName,
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
            text: 'Các khu vực có mức lương trung bình cao nhất',
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
        const chart = new ApexCharts(document.querySelector('#khu_vuc_tra_luong_cao'), options);
        chart.render();
      });
  }
  reloadHighestSalaryRegion(index: number) {
    document.getElementById('khu_vuc_tra_luong_cao').innerHTML = '';
    const milestones = this.dataTopHiringRegion.timestamps;
    const numJob = this.dataTopHiringRegion[milestones[index]].data;
    const regionObj = this.dataTopHiringRegion[milestones[index]].region;
    const regionName = regionObj.map(function (el) { return el.name; })
    const options = {
      series: [{
        name: 'Mức lương trung bình',
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
              to: 10000000000000,
              color: '#37933c'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {
        categories: regionName,
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
        text: 'Các khu vực có mức lương trung bình cao nhất',
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
    const chart = new ApexCharts(document.querySelector('#khu_vuc_tra_luong_cao'), options);
    chart.render();
  }
 
  showTopHiringCompany(idIndustry: string, idLocation: string) {
    document.getElementById('nhu-cau_tuyen_dung_theo_cong_ty').innerHTML = '';
    this.industriesService.getTopHiringCompany(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getTopHiringCompany');
        console.log(data);
        this.increaseNumApi();
        this.dataTopHiringCompany = data;
        const milestones = data.timestamps;
        this.timeCompanyNumJobChart = [];
        let i = 0;
        for(const time of milestones){
          i++;
          if ( i < milestones.length){
            this.timeCompanyNumJobChart.push({name: time, selected: false});
          } else {
            this.timeCompanyNumJobChart.push({name: time, selected: true});
          }
        }
        const numJob = data[milestones[milestones.length - 1]].data;
        const companyObj = data[milestones[milestones.length - 1]].company;
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
                  to: 10000000000000,
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
            text: 'Các công ty có nhu cầu tuyển dụng lớn',
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
        const chart = new ApexCharts(document.querySelector('#nhu-cau_tuyen_dung_theo_cong_ty'), options);
        chart.render();
      });
  }
  reloadTopHiringCompany(index: number) {
    document.getElementById('nhu-cau_tuyen_dung_theo_cong_ty').innerHTML = '';
    const milestones = this.dataTopHiringCompany.timestamps;
    const numJob = this.dataTopHiringCompany[milestones[index]].data;
    const companyObj = this.dataTopHiringCompany[milestones[index]].company;
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
              to: 10000000000000,
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
        text: 'Các công ty có nhu cầu tuyển dụng lớn',
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
    const chart = new ApexCharts(document.querySelector('#nhu-cau_tuyen_dung_theo_cong_ty'), options);
    chart.render();
  }
  showTopCompanyHighestSalary(idIndustry: string, idLocation: string) {
    document.getElementById('cong_ty_tra_luong_cao').innerHTML = '';
    this.industriesService.getTopCompanyHighestSalary(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getTopCompanyHighestSalary');
        console.log(data);
        this.increaseNumApi();
        this.dataHighestPayingCompany = data;
        const milestones = data['timestamps'];
        this.timeCompanySalaryChart = [];
        let i = 0;
        for(const time of milestones){
          i++;
          if ( i < milestones.length){
            this.timeCompanySalaryChart.push({name: time, selected: false});
          } else {
            this.timeCompanySalaryChart.push({name: time, selected: true});
          }
        }
        const numJob = data[milestones[milestones.length - 1]].data;
        const companyObj = data[milestones[milestones.length - 1]].company;
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
                  to: 10000000000000,
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
            text: 'Các công ty có mức lương trung bình cao',
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
        const chart = new ApexCharts(document.querySelector('#cong_ty_tra_luong_cao'), options);
        chart.render();
      });
  }
  reloadTopCompanyHighestSalary(index: number) {
    document.getElementById('cong_ty_tra_luong_cao').innerHTML = '';
    const milestones = this.dataHighestPayingCompany['timestamps'];
    const averageSalary = this.dataHighestPayingCompany[milestones[index]].data;
    const companyObj = this.dataHighestPayingCompany[milestones[index]].company;
    const companyName = companyObj.map(function (el) { return el.name; })
    const options = {
      series: [{
        name: 'Mức lương trung bình',
        data: averageSalary
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
              to: 10000000000000,
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
        text: 'Các công ty có mức lương trung bình cao',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[index],
        align: 'left'
      },
    };
    const chart = new ApexCharts(document.querySelector('#cong_ty_tra_luong_cao'), options);
    chart.render();
  }
  showTopHiringJob(idIndustry: string, idLocation: string) {
    document.getElementById('nhu-cau_tuyen_dung_theo_cong_viec').innerHTML = '';
    this.industriesService.getTopHiringJob(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getTopHiringJob');
        console.log(data);
        this.increaseNumApi();
        this.dataHighestDemandJob = data;
        const milestones = data.timestamps;
        this.timeJobNumJobChart = [];
        let i = 0;
        for(const time of milestones){
          i++;
          if ( i < milestones.length){
            this.timeJobNumJobChart.push({name: time, selected: false});
          } else {
            this.timeJobNumJobChart.push({name: time, selected: true});
          }
        }
        const numJob = data[milestones[milestones.length - 1]].data;
        const jobObj = data[milestones[milestones.length - 1]].job;
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
            text: 'Các vị trí công việc có nhu cầu tuyển dụng lớn',
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
        const chart = new ApexCharts(document.querySelector('#nhu-cau_tuyen_dung_theo_cong_viec'), options);
        chart.render();
      });
  }
  reloadTopHiringJob(index: number) {
    document.getElementById('nhu-cau_tuyen_dung_theo_cong_viec').innerHTML = '';
    const milestones = this.dataHighestDemandJob.timestamps;
    const numJob = this.dataHighestDemandJob[milestones[index]].data;
    const jobObj = this.dataHighestDemandJob[milestones[index]].job;
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
        text: 'Các vị trí công việc có nhu cầu tuyển dụng lớn',
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
    const chart = new ApexCharts(document.querySelector('#nhu-cau_tuyen_dung_theo_cong_viec'), options);
    chart.render();
  }
  showHighestSalaryJob(idIndustry: string, idLocation: string) {
    document.getElementById('viec_duoc_tra_luong_cao').innerHTML = '';
    this.industriesService.getHighestSalaryJob(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getHighestSalaryJob');
        console.log(data);
        this.increaseNumApi();
        this.dataHighestSalaryJob = data;
        const milestones = data.timestamps;
        this.timeJobSalaryChart = [];
        let i = 0;
        for(const time of milestones){
          i++;
          if ( i < milestones.length){
            this.timeJobSalaryChart.push({name: time, selected: false});
          } else {
            this.timeJobSalaryChart.push({name: time, selected: true});
          }
        }
        const numJob = data[milestones[milestones.length - 1]].data;
        const jobObj = data[milestones[milestones.length - 1]].job;
        const jobName = jobObj.map(function (el) { return el.name; });


        const options = {
          series: [{
            name: 'Mức lương trung bình',
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
                  to: 1000000000,
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
            text: 'Các vị trí công việc có mức lương trung bình cao',
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
        const chart = new ApexCharts(document.querySelector('#viec_duoc_tra_luong_cao'), options);
        chart.render();
      });
  }
  reloadHighestSalaryJob(index: number) {
    document.getElementById('viec_duoc_tra_luong_cao').innerHTML = '';
    const milestones = this.dataHighestSalaryJob.timestamps;
    const numJob = this.dataHighestSalaryJob[milestones[index]].data;
    const jobObj = this.dataHighestSalaryJob[milestones[index]].job;
    const jobName = jobObj.map(function (el) { return el.name; });


    const options = {
      series: [{
        name: 'Mức lương trung bình',
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
              to: 1000000000,
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
        text: 'Các vị trí công việc có mức lương trung bình cao',
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
    const chart = new ApexCharts(document.querySelector('#viec_duoc_tra_luong_cao'), options);
    chart.render();
  }
  showJobDemandByAge(idIndustry: string, idLocation: string): void {
    document.getElementById('nhu-cau-viec-lam-theo-do-tuoi').innerHTML = '';
    this.industriesService.getJobDemandByAge(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getJobDemandByAge');
        console.log(data);
        this.increaseNumApi();
        this.dataJobDemandByAge = data;
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          this.timeAgeChart = [];
          let i = 0;
          for(const time of milestones){
            i++;
            if ( i < milestones.length){
              this.timeAgeChart.push({name: time, selected: false});
            } else {
              this.timeAgeChart.push({name: time, selected: true});
            }
          }
          const ageRanges = data.ageRange;
          const male = data[milestones[milestones.length - 1]].male;
          const female = data[milestones[milestones.length - 1]].female;
          const dataTable = [];
          for (var j = 0; j < ageRanges.length; j++) {
            const obj = { ageRange: '', male: 0, female: 0.0 };
            obj.ageRange = ageRanges[j];
            obj.male = male[j];
            obj.female = female[j];
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

          const chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-do-tuoi"), options);
          chart.render();
        } else {
          alert("Khu vực bạn chọn không có dữ liệu về độ tuổi");
        }
      });
  }
  reloadJobDemandByAge(index: number) {
    document.getElementById('nhu-cau-viec-lam-theo-do-tuoi').innerHTML = '';
    if (Object.keys(this.dataJobDemandByAge).length > 2) {
      const milestones = this.dataJobDemandByAge.timestamps;
      const ageRanges = this.dataJobDemandByAge.ageRange;
      const male = this.dataJobDemandByAge[milestones[index]].male;
      const female = this.dataJobDemandByAge[milestones[index]].female;
      const dataTable = [];
      for (var i = 0; i < ageRanges.length; i++) {
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

      const chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-do-tuoi"), options);
      chart.render();
    } else {
      alert("Khu vực bạn chọn không có dữ liệu về độ tuổi");
    }
  }
  showJobDemandByLiteracy(idIndustry: string, idLocation: string): void {
    document.getElementById('nhu-cau-viec-lam-theo-trinh-do').innerHTML = '';
    this.industriesService.getJobDemandByLiteracy(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getJobDemandByLiteracy');
        console.log(data);
        this.increaseNumApi();
        this.dataJobDemandByLiteracy = data;
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          this.timeLiteracyChart = [];
          let i = 0;
          for(const time of milestones){
            i++;
            if ( i < milestones.length){
              this.timeLiteracyChart.push({name: time, selected: false});
            } else {
              this.timeLiteracyChart.push({name: time, selected: true});
            }
          }
          const literacies = data.literacy;
          const literacyObj = data.literacy;
          const literacyName = literacyObj.map(function (el) { return el.name; })

          const numJob = data[milestones[milestones.length - 1]].data;
          const growth = data[milestones[milestones.length - 1]].growth;
          const dataTable = [];

          for (var j = 0; j < literacies.length; j++) {
            const obj = { literacy: '', numJob: 0, growth: 0.0 };
            obj.literacy = literacies[j].name;
            obj.numJob = numJob[j];
            obj.growth = growth[j];
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
              text: "Biểu đồ phân bổ việc làm theo trình độ học vấn",
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

          const chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-trinh-do"), options);
          chart.render();
        } else {
          alert("Khu vực bạn chọn không có dữ liệu về trình độ học vấn");
        }
      });
  }
  reloadJobDemandByLiteracy(index: number) {
    document.getElementById('nhu-cau-viec-lam-theo-trinh-do').innerHTML = '';
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
          text: "Biểu đồ phân bổ việc làm theo trình độ học vấn",
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

      const chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-trinh-do"), options);
      chart.render();
    } else {
      alert("Khu vực bạn chọn không có dữ liệu về trình độ học vấn");
    }
  }
}
