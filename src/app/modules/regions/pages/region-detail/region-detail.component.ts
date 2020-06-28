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
import { ActivatedRoute } from '@angular/router';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var ApexCharts: any;
export interface City {
  name: string;
  id: string;
  // area: string;
  selected?: boolean;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-compare',
  templateUrl: 'dialog.html',
})
export class DialogCompare {

  constructor(
    public dialogRef: MatDialogRef<DialogCompare>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.showCompareNumJob();
    this.showCompareSalary();
    this.showLiteracyChart1();
    this.showLiteracyChart2();
    this.showAgeAndGenderChart1();
    this.showAgeAndGenderChart2();
  }
  showCompareNumJob() {
    const options = {
      series: [{
        name: 'Nhân viên kinh doanh',
        data: [49, 88, 301, 17213]
      },
      {
        name: 'Nhân viên kinh doanh phát triển thị trường',
        data: [0, 0, 10, 175]
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
      colors: ['#2e7932', '#77792e', '#9e9c00', '#649628', '#0890a9'],
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
          horizontal: false,
          startingShape: 'flat',
          endingShape: 'flat',
          columnWidth: '70%',
          barHeight: '70%',
          distributed: false,
          // rangeBarOverlap: true,
          dataLabels: {
            position: 'bot', // top, center, bottom
          },
          // colors: {
          //   ranges: [{
          //     from: 0,
          //     to: 100000000,
          //     color: '#37933c'
          //   }],
          //   backgroundBarColors: [],
          //   backgroundBarOpacity: 1,
          //   backgroundBarRadius: 0,
          // },
        }
      },
      xaxis: {
        categories: ['3/2019', '4/2019', '1/2020', '2/2020'],
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
        text: 'So sánh nhu cầu tuyển dụng của hai vị trí công việc',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý 2/2020',
        align: 'left'
      },
    };
    const chart = new ApexCharts(document.querySelector('#nhu-cau-theo-vi-tri-cong-viec-dialog'), options);
    chart.render();
  }
  showCompareSalary() {
    const options = {
      series: [{
        name: 'Nhân viên kinh doanh',
        data: [9.9, 10.5, 12.0, 12.4]
      },
      {
        name: 'Nhân viên kinh doanh phát triển thị trường',
        data: [0, 0, 8.5, 12.7]
      }],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#2e7932', '#77792e', '#9e9c00', '#649628', '#0890a9'],
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
          horizontal: false,
          startingShape: 'flat',
          endingShape: 'flat',
          columnWidth: '70%',
          barHeight: '70%',
          distributed: false,
          // rangeBarOverlap: true,
          dataLabels: {
            position: 'bot', // top, center, bottom
          },
          // colors: {
          //   ranges: [{
          //     from: 0,
          //     to: 100000000,
          //     color: '#37933c'
          //   }],
          //   backgroundBarColors: [],
          //   backgroundBarOpacity: 1,
          //   backgroundBarRadius: 0,
          // },
        }
      },
      xaxis: {
        categories: ['3/2019', '4/2019', '1/2020', '2/2020'],
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
        },
        min: 0,
      },
      title: {
        text: 'So sánh mức lương trung bình của hai khu vực',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý 2/2020',
        align: 'left'
      },
    };
    const chart = new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-vi-tri-cong-viec-dialog'), options);
    chart.render();
  }
  showAgeAndGenderChart1() {
    const options = {
      series: [{
        name: ' Nam',
        data: [36, 407, 457, 88, 25, 16584]
      }, {
        name: 'Nữ',
        data: [23, 339, 367, 76, 19, 15003]
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
        text: 'Nhu cầu việc làm theo độ tuổi, giới tính của vị trí Nhân viên kinh doanh',
        align: 'left',
        style: {
          fontSize: '18px',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý 2/2020',
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
        categories: ['0-18', '18-25', '25-35', '35-50', '50+', 'Không xác định'],
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };

    const chart = new ApexCharts(document.querySelector('#nhu-cau-tuyen-dung-theo-do-tuoi-gioi-tinh1'), options);
    chart.render();
  }
  showAgeAndGenderChart2() {
    const options = {
      series: [{
        name: ' Nam',
        data: [0, 2, 2, 2, 0, 182]
      }, {
        name: 'Nữ',
        data: [0, 2, 2, 2, 0, 146]
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
        text: 'Nhu cầu việc làm theo độ tuổi, giới tính của vị trí Nhân viên kinh doanh phát triển thị trường',
        align: 'left',
        style: {
          fontSize: '18px',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý 2/2020',
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
        categories: ['0-18', '18-25', '25-35', '35-50', '50+', 'Không xác định'],
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };

    const chart = new ApexCharts(document.querySelector('#nhu-cau-tuyen-dung-theo-do-tuoi-gioi-tinh2'), options);
    chart.render();
  }
  showLiteracyChart1() {
    const options = {
      series: [514, 2939, 7147, 6613],
      chart: {
        width: '100%',
        height: 350,
        type: 'donut',

      },
      colors: ['#2e7932', '#77792e', '#9e9c00', '#649628', '#0890a9'],
      labels: ['Đại học', 'Cao đẳng', 'Trung cấp', 'Khác'],
      // theme: {
      //   palette: 'palette2',
      //   monochrome: {
      //     enabled: true,
      //     color: '#82b440',
      //   }
      // },

      title: {
        text: 'Biểu đồ phân bổ việc làm theo trình độ học vấn của vị trí Nhân viên kinh doanh',
        align: 'left',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#263238'
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý 2/2020',
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

    const chart = new ApexCharts(document.querySelector('#nhu-cau-tuyen-dung-theo-trinh-do-hoc-van1'), options);
    chart.render();
  }
  showLiteracyChart2() {
    const options = {
      series: [1, 32, 46, 96],
      chart: {
        width: '100%',
        height: 350,
        type: 'donut',

      },
      colors: ['#2e7932', '#77792e', '#9e9c00', '#649628', '#0890a9'],
      labels: ['Đại học', 'Cao đẳng', 'Trung cấp', 'Khác'],
      // theme: {
      //   palette: 'palette2',
      //   monochrome: {
      //     enabled: true,
      //     color: '#82b440',
      //   }
      // },

      title: {
        text: 'Biểu đồ phân bổ việc làm theo trình độ học vấn của vị trí Nhân viên kinh doanh phát triển thị trường',
        align: 'left',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#263238'
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý 2/2020',
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

    const chart = new ApexCharts(document.querySelector('#nhu-cau-tuyen-dung-theo-trinh-do-hoc-van2'), options);
    chart.render();
  }
}
@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.scss'],
  providers: [RegionsService, HeaderService, JobsService]
})
export class RegionDetailComponent implements OnInit {

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
    } else {
      const i = this.selectedCities.findIndex(value => value.name === city.name);
      this.selectedCities.splice(i, 1);
    }

    this.cityControl.setValue(this.selectedCities);
  }


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
    { name: 'Theo ngành nghề', selected: true },
    { name: 'Theo vị trí công việc', selected: false },
    { name: 'Theo công ty', selected: false },
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
  constructor(private regionsService: RegionsService,
    private jobsService: JobsService,
    public headerService: HeaderService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {

  }
  city1 = 'Hà Nội';
  city2 = 'TP. Hồ Chí Minh';
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCompare, {
      width: '80%',
      data: { city1: this.city1, city2: this.city2 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  showChart = true;
  isLoading = true;
  // selectedCity = 'P0';
  selectedCity: string;
  selectedCityName = '';
  control = new FormControl();
  cityList: City[] = [{ id: '1', name: 'Champs-Élysées' },
  { id: '2', name: 'Lombard Street' },
  { id: '3', name: 'Abbey Road' },
  { id: '4', name: 'Fifth Avenue' }];
  filteredOptions: Observable<City[]>;
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

  displayFn(cityList: City[]): (id: string) => string | null {
    return (id: string) => {
      const correspondingOption = Array.isArray(cityList) ? cityList.find(option => option.id === id) : null;
      return correspondingOption ? correspondingOption.name : '';
    };
  }

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
  onCitySelected(selectedCityId) {
    // console.log('### Trigger');
    // console.log(this.selectedCity);
    // console.log(selectedCityId);
    this.selectedCity = selectedCityId;
    this.selectedCityName = this.cityList.find(x => x.id === selectedCityId).name;
    console.log(this.selectedCityName);
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
  }

  analysisRegion() {
    console.log(this.selectedCities);
    if (this.selectedCities.length === 1) {
      this.showChart = true;
      const cityId = this.selectedCities[0].id;
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
    } else if (this.selectedCities.length >= 2) {
      this.showChart = false;
      const listId = this.selectedCities.map(a => a.id);
      const cityId = listId.toString();
      console.log(cityId);
      this.getDashboardData(cityId);
      this.showJobDemandAndAverageSalary(cityId);
      this.showJobDemandByAge(cityId);
      this.showJobDemandByLiteracy(cityId);
    }
  }
  getCityList(): void {
    this.jobsService.getCityList()
      .subscribe((data: any) => {
        console.log('getCityList');
        console.log(data.result);
        // this.increaseNumApi();
        this.cityList = data.result;
        if (this.selectedCity != null && this.selectedCity != 'P0') {
          this.selectedCityName = this.cityList.find(x => x.id === this.selectedCity).name;
        }
        this.filteredOptions = this.control.valueChanges
          .pipe(
            startWith<string | City>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.cityList.slice())
          );
        // console.log("this.filteredOptions" +this.filteredOptions);

        this.filteredCities = this.control.valueChanges
          .pipe(
            startWith<string | City>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.cityList.slice())
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
