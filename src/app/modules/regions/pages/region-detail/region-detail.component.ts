import { Component, OnInit } from '@angular/core';
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
declare var ApexCharts: any;
export interface City {
  name: string;
  id: string;
  // area: string;
}

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.scss'],
  providers: [RegionsService, HeaderService, JobsService]
})
export class RegionDetailComponent implements OnInit {
  newJob = 0;
  newJobGrowth = 0.0;
  averageSalary = 0.0;
  averageSalaryGrowth = 0.0;
  numCompany = 0;
  numCompanyGrowth = 0.0;
  averageAge = 0.0;
  averageAgeGrowth = 0.0;

  dataJobDemandByIndustry;
  dataAverageSalaryByIndustry;
  dataHighestSalaryJob;
  dataHighestDemandJob;
  dataTopHiringCompany;
  dataHighestPayingCompany;
  dataJobDemandByAge;
  dataJobDemandByLiteracy;
  
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

  public timeIndustryChart: any = [
    { name: 'III/2019', selected: false },
    { name: 'IV/2019', selected: false },
    { name: 'I/2020', selected: false },
    { name: 'II/2020', selected: true },
  ];

  public timeJobChart: any = [
    { name: 'III/2019', selected: false },
    { name: 'IV/2019', selected: false },
    { name: 'I/2020', selected: false },
    { name: 'II/2020', selected: true },
  ];

  public timeCompanyChart: any = [
    { name: 'III/2019', selected: false },
    { name: 'IV/2019', selected: false },
    { name: 'I/2020', selected: false },
    { name: 'II/2020', selected: true },
  ];
  public timeAgeAndGenderChart: any = [
    { name: 'III/2019', selected: false },
    { name: 'IV/2019', selected: false },
    { name: 'I/2020', selected: false },
    { name: 'II/2020', selected: true },
  ];
  public timeLiteracyChart: any = [
    { name: 'III/2019', selected: false },
    { name: 'IV/2019', selected: false },
    { name: 'I/2020', selected: false },
    { name: 'II/2020', selected: true },
  ];
  
  jobDemandByAgeAndGenderTable = ['ageRange', 'male', 'female'];
  jobDemandByAgeAndGender = new MatTableDataSource<any>([]);

  jobDemandByLiteracyTable = ['literacy', 'numJob', 'growth'];
  jobDemandByLiteracy = new MatTableDataSource<any>([]);
  constructor(private regionsService: RegionsService,
              private jobsService: JobsService,
              public headerService: HeaderService) {

  }
  selectedCity = 'P0';
  selectedCityName = '';
  control = new FormControl();
  cityList: City[] = [{ id: '1', name: 'Champs-Élysées' },
  { id: '2', name: 'Lombard Street' },
  { id: '3', name: 'Abbey Road' },
  { id: '4', name: 'Fifth Avenue' }];
  filteredOptions: Observable<City[]>;
  ngOnInit() {
    this.headerService.regions = '/regions';
    this.getCityList();
    this.getDashboardData(this.selectedCity);
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

    // new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-nganh-nghe'), mucLuongTrungBinhTheoNganhNghe).render();
    // new ApexCharts(document.querySelector('#luot-dang-tin-theo-nganh-nghe'), luotDangTinTheoNganhNghe).render();

    // new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-vi-tri-cong-viec'), mucLuongTrungBinhTheoNganhNghe).render();
    // new ApexCharts(document.querySelector('#luot-dang-tin-theo-vi-tri-cong-viec'), luotDangTinTheoNganhNghe).render();

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

  onCitySelected(selectedCityId) {
    // console.log('### Trigger');
    // console.log(this.selectedCity);
    // console.log(selectedCityId);
    this.selectedCity = selectedCityId;
    this.selectedCityName = this.cityList.find(x => x.id === selectedCityId).name;
    console.log(this.selectedCityName);
    this.getDashboardData(this.selectedCity);
    this.showJobDemandByIndustry(this.selectedCity);
    this.showAverageSalaryByIndustry(this.selectedCity);
    this.showHighestDemandJobs(this.selectedCity);
    this.showHighestSalaryJobs(this.selectedCity);
    this.showTopHiringCompanies(this.selectedCity);
    this.showHighestPayingCompanies(this.selectedCity);
    this.showJobDemandByAge(this.selectedCity);
    this.showJobDemandByLiteracy(this.selectedCity);
  }

  getCityList(): void {
    this.jobsService.getCityList()
      .subscribe((data: any) => {
        console.log('getCityList');
        console.log(data.result);
        this.cityList = data.result;
        this.filteredOptions = this.control.valueChanges
          .pipe(
            startWith<string | City>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.cityList.slice())
          );
        // console.log(this.filteredOptions);
      });
  }
  changeTimeIndustryChart(index) {
    this.timeIndustryChart.forEach(element => {
      element.selected = false;
    });
    this.timeIndustryChart[index].selected = true;
    console.log(index);
    this.reloadJobDemandByIndustry(index);
    this.reloadAverageSalaryByIndustry(index);
  }
  changeTimeJobChart(index) {
    this.timeJobChart.forEach(element => {
      element.selected = false;
    });
    this.timeJobChart[index].selected = true;
    console.log(index);
    this.reloadHighestDemandJobs(index);
    this.reloadHighestSalaryJobs(index);
  }

  changeTimeCompanyChart(index) {
    this.timeCompanyChart.forEach(element => {
      element.selected = false;
    });
    this.timeCompanyChart[index].selected = true;
    console.log(index);
    this.reloadTopHiringCompany(index);
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
  showJobDemandChart() {
    const options = {
      series: [{
        name: 'series1',
        data: [31, 40, 28, 51]
      }],
      chart: {
        height: 130,
        type: 'area',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#37933c'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: [3, 0]
        // colors: []
      },
      markers: {
        size: 4,
        strokeColors: '#37933c',
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: 'circle',
        radius: 2,
        colors: ['#ffffff']
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        // type: 'datetime',
        // categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z']
      },
      yaxis: {
        show: false,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        }
      },
      grid: {
        // show: false
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    };
    const chart = new ApexCharts(document.querySelector("#chart-viec-lam-moi"), options);
    chart.render();
  }
  showJobDemandByIndustry(locationId: string) {
    document.getElementById('nhu-cau-theo-nganh-nghe').innerHTML = '';
    this.regionsService.getJobDemandByIndustry(locationId)
      .subscribe((data: any) => {
        console.log('getJobDemandByIndustry');
        console.log(data);
        this.dataJobDemandByIndustry = data;
        const milestones = data.timestamps;
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
        this.dataAverageSalaryByIndustry = data;
        const milestones = data.timestamps;
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
        this.dataHighestDemandJob = data;
        const milestones = data.timestamps;
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
        this.dataHighestSalaryJob = data;
        const milestones = data.timestamps;
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
        this.dataTopHiringCompany = data;
        const milestones = data.timestamps;
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
        this.dataHighestPayingCompany = data;
        const milestones = data.timestamps;
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
        this.dataJobDemandByAge = data;
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
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
        this.dataJobDemandByLiteracy = data;
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
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
