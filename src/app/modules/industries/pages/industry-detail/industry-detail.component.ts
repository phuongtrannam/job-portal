import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, OnInit, Input } from '@angular/core';
import { IndustriesService } from '../../industries.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { JobsService } from '../../../jobs/jobs.service';
declare var ApexCharts: any;
export interface City {
  name: string;
  id: string;
  // area: string;
}
@Component({
  selector: 'app-industry-detail',
  templateUrl: './industry-detail.component.html',
  styleUrls: ['./industry-detail.component.scss'],
  providers: [IndustriesService, JobsService]
})
export class IndustryDetailComponent {
  public congtylon_linhvuc = [
    { name: 'Viettel', soluong: 10, vitri: 'Hanoi', imgsrc: 'https://thietkelogo.vn/wp-content/uploads/2015/12/viettel.png' },
    { name: 'Misa', soluong: 20, vitri: 'Sài Gòn', imgsrc: 'https://upload.wikimedia.org/wikipedia/vi/1/11/Logo_MISA.jpg' },
    { name: 'Gear.Inc', soluong: 15, vitri: 'Hanoi', imgsrc: 'https://cdn.itviec.com/employers/gear-inc/logo/w170/5FJEvYXV6fCJt46bYY6ccgD2/gear-inc-logo.png' },
    { name: 'BKAV', soluong: 12, vitri: 'Đà Nẵng', imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Bkav_logo.jpg' }
  ];


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
  showChart = true;
  control = new FormControl();
  cityList: City[] = [{ id: '1', name: 'Champs-Élysées' },
  { id: '2', name: 'Lombard Street' },
  { id: '3', name: 'Abbey Road' },
  { id: '4', name: 'Fifth Avenue' }];
  filteredOptions: Observable<City[]>;
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
    this.selectedCity = selectedCityId;
    console.log('this.selectedCity ' + this.selectedCity);
    this.selectedCityName = this.cityList.find(x => x.id === selectedCityId).name;
    this.showChart = false;
    this.showJobDemandAndAverageSalary(this.selectedIndustryId, this.selectedCity);
    this.showTopHiringCompany(this.selectedIndustryId, this.selectedCity);
    this.showTopHiringJob(this.selectedIndustryId, this.selectedCity);
    this.showHighestSalaryJob(this.selectedIndustryId, this.selectedCity);
    this.showJobDemandByAge(this.selectedIndustryId, this.selectedCity);
    this.showJobDemandByLiteracy(this.selectedIndustryId, this.selectedCity);
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
        console.log("getCityList");
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
    private route: ActivatedRoute) {
    this.selectedIndustryId = this.route.snapshot.paramMap.get('id');
    console.log(this.selectedIndustryId + 'this.selectedIndustryId')
  }

  ngOnInit() {
    this.getCityList();
    this.getIndustryList();
    // this.getTopCompanies(this.selectedIndustryId, this.selectedCity);
    this.showJobDemandAndAverageSalary(this.selectedIndustryId, this.selectedCity);
    this.showTopHiringRegion(this.selectedIndustryId);
    this.showHighestSalaryRegion(this.selectedIndustryId);
    this.showTopHiringCompany(this.selectedIndustryId, this.selectedCity);
    this.showTopCompanyHighestSalary(this.selectedIndustryId, this.selectedCity);
    this.showTopHiringJob(this.selectedIndustryId, this.selectedCity);
    this.showHighestSalaryJob(this.selectedIndustryId, this.selectedCity);
    this.showJobDemandByAge(this.selectedIndustryId, this.selectedCity);
    this.showJobDemandByLiteracy(this.selectedIndustryId, this.selectedCity);

  }

  getTopCompanies(industryId: string, idProvince: string): void {
    this.industriesService.getTopCompanies(industryId, idProvince)
      .subscribe((data: any) => {
        console.log('getTopCompanies');
        console.log(data.result);
        this.topCompanies = data.result;
      });
  }
  // showJobDemandAndAverageSalary(industryId: string, idLocation: string): void {
  //   document.getElementById('chart').innerHTML = '';
  //   this.industriesService.getJobDemandByPeriodOfTime(industryId, idLocation)
  //     .subscribe((data: any) => {
  //       console.log('getJobDemandByPeriodOfTime');
  //       console.log(data);
  //       // this.jobDemandByPeriodOfTime = data.result;
  //       const dataTable = [];
  //       if (Object.keys(data).length > 1) {
  //         const milestones = data.timestamps;
  //         let numJob = [];
  //         let growthJob = [];
  //         let regionName = [];
  //         if (this.selectedCity === 'P0') {
  //           numJob = data['ALL'].data;
  //           growthJob = data['ALL'].growth;
  //           regionName = data['ALL'].name;
  //         } else {
  //           console.log("bug");
  //           numJob = data[this.selectedIndustryId].data;
  //           growthJob = data[this.selectedIndustryId].growth;
  //           regionName = data[this.selectedIndustryId].name;
  //           console.log("bug");
  //           console.log("numJob " + numJob);
  //           console.log(growthJob);
  //           console.log(regionName);
  //         }
  //         this.industriesService.getAverageSalary(industryId, idLocation)
  //           .subscribe((data1: any) => {
  //             // const milestones = data.timestamp;
  //             console.log("getAverageSalary");
  //             console.log(data1);
  //             if (Object.keys(data1).length > 1) {
  //               let salary = [];
  //               let growthSalary = [];
  //               if (this.selectedCity === 'P0') {
  //                 salary = data1['ALL'].data;
  //                 growthSalary = data1['ALL'].growth;
  //               } else {
  //                 salary = data1[this.selectedIndustryId].data;
  //                 growthSalary = data1[this.selectedIndustryId].growth;
  //               }

  //               for (var i = 0; i < milestones.length; i++) {
  //                 const obj = { timestamp: '', numJob: 0, salary: 0.0, growthJob: 0.0, growthSalary: 0.0 };
  //                 obj.timestamp = milestones[i];
  //                 obj.numJob = numJob[i];
  //                 obj.salary = salary[i];
  //                 obj.growthSalary = growthSalary[i];
  //                 obj.growthJob = growthJob[i];
  //                 dataTable.push(obj);

  //               }
  //               console.log("jobDemandAndAverageSalary");
  //               console.log(dataTable);
  //               this.jobDemandAndAverageSalary.data = dataTable;

  //               const options = {
  //                 series: [{
  //                   name: 'Số lượng công việc',
  //                   type: 'column',
  //                   data: numJob
  //                 }, {
  //                   name: 'Lương trung bình',
  //                   type: 'line',
  //                   data: salary
  //                 }],
  //                 chart: {
  //                   height: 350,
  //                   type: 'line',
  //                 },
  //                 stroke: {
  //                   width: [0, 4]
  //                 },
  //                 colors: ['#38933d', '#8dc971'],
  //                 title: {
  //                   text: 'Nhu cầu việc làm và lương trung bình',
  //                   align: 'left',
  //                   style: {
  //                     fontSize: '18px',
  //                   },
  //                 },
  //                 subtitle: {
  //                   text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
  //                   align: 'left'
  //                 },
  //                 dataLabels: {
  //                   enabled: true,
  //                   enabledOnSeries: [1]
  //                 },
  //                 labels: milestones,
  //                 xaxis: {
  //                   labels: {
  //                     show: true,
  //                   },
  //                   axisBorder: {
  //                     show: false
  //                   },
  //                   axisTicks: {
  //                     show: false,
  //                   },
  //                 },
  //                 yaxis: [{
  //                   title: {
  //                     text: 'Nhu cầu tuyển dụng',
  //                   },

  //                 }, {
  //                   opposite: true,
  //                   title: {
  //                     text: 'Mức lương trung bình'
  //                   }
  //                 }]
  //               };

  //               var chart = new ApexCharts(document.querySelector("#chart"), options);
  //               chart.render();
  //             } else {
  //               // alert("Khu vực bạn chọn không có dữ liệu về lương trung bình");
  //             }
  //           });
  //       } else {
  //         // alert("Khu vực bạn chọn không có dữ liệu về số lượng việc làm");
  //       }
  //     });
  // }
  showJobDemandAndAverageSalary(industryId: string, idLocation: string): void {
    document.getElementById('chart').innerHTML = '';
    this.industriesService.getJobDemandByPeriodOfTime(industryId, idLocation)
      .subscribe((data: any) => {
        console.log('getJobDemandByPeriodOfTime');
        console.log(data);
        this.dataJobDemand = data;
        // this.jobDemandByPeriodOfTime = data.result;
        const dataTable = [];
        if (Object.keys(data).length > 1) {
          const milestones = data.timestamps;
          let numJob = [];
          let growthJob = [];
          let regionName = [];
          if (this.selectedCity === 'P0') {
            numJob = data.ALL.data;
            growthJob = data.ALL.growth;
            regionName = data.ALL.name;
          } else {
            numJob = data[this.selectedCity].data;
            growthJob = data[this.selectedCity].growth;
            regionName = data[this.selectedCity].name;
            console.log(regionName);
          }
          this.industriesService.getAverageSalary(industryId, idLocation)
            .subscribe((data1: any) => {
              // const milestones = data.timestamp;
              console.log('getAverageSalary');
              console.log(data1);
              this.dataAverageSalary = data1;
              if (Object.keys(data1).length > 1) {
                let salary = [];
                let growthSalary = [];
                if (this.selectedCity === 'P0') {
                  salary = data1.ALL.data;
                  growthSalary = data1.ALL.growth;
                } else {
                  salary = data1[this.selectedCity].data;
                  growthSalary = data1[this.selectedCity].growth;
                }

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
  
  showJobDemandByPeriodOfTime(idIndustry: string, idLocation: string) {
    document.getElementById('nhu_cau_tuyen_dung').innerHTML = '';
    this.industriesService.getJobDemandByPeriodOfTime(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getJobDemandByPeriodOfTime');
        console.log(data);
        const milestones = data.timestamps;
        let numJob = [];
        let growthJob = [];
        let regionName = [];
        if (this.selectedCity === 'P0') {
          numJob = data.ALL.data;
          growthJob = data.ALL.growth;
          regionName = data.ALL.name;
        } else {
          numJob = data[this.selectedIndustryId].data;
          growthJob = data[this.selectedIndustryId].growth;
          regionName = data[this.selectedIndustryId].name;
        }
        const dataTable = [];
        for (let i = 0; i < milestones.length; i++) {
          const obj = { timestamp: '', numJob: 0, growth: 0.0 };
          obj.timestamp = milestones[i];
          obj.numJob = numJob[i];
          obj.growth = growthJob[i];
          dataTable.push(obj);
        }
        console.log(dataTable);
        this.jobDemandByIndustry.data = dataTable;

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
              return val + 'công việc';
            },
            offsetX: 0,
            style: {
              fontSize: '12px',
              colors: ['#333']
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
            categories: milestones,
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
            text: 'Nhu cầu tuyển dụng theo thời gian - ' + regionName,
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
        const chart = new ApexCharts(document.querySelector('#nhu_cau_tuyen_dung'), options);
        chart.render();
      });
  }
  showTopHiringRegion(idIndustry: string) {
    document.getElementById('nhu_cau_tuyen_dung_theo_khu_vuc').innerHTML = '';
    this.industriesService.getTopHiringRegion(idIndustry)
      .subscribe((data: any) => {
        console.log('getTopHiringRegion');
        console.log(data);
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
  // showTopHiringCompany(idIndustry: string, idLocation: string) {
  //   document.getElementById('nhu-cau_tuyen_dung_theo_cong_ty').innerHTML = '';
  //   this.industriesService.getTopHiringCompany(idIndustry, idLocation)
  //     .subscribe((data: any) => {
  //       console.log("getTopHiringCompany");
  //       console.log(data);
  //       const milestones = data['timestamps'];
  //       const numJob = data[milestones[milestones.length - 1]].data;
  //       const companyObj = data[milestones[milestones.length - 1]].company;
  //       const companyName = companyObj.map(function (el) { return el.name; })
  //       const options = {
  //         series: [{
  //           name: 'Số lượng công việc',
  //           data: numJob
  //         }],
  //         chart: {
  //           height: 350,
  //           type: 'bar',
  //           zoom: {
  //             enabled: false
  //           },
  //           toolbar: {
  //             show: false
  //           }
  //         },
  //         dataLabels: {
  //           enabled: true,
  //           textAnchor: 'start',
  //           formatter: val => {
  //             return val + '';
  //           },
  //           offsetX: 0,
  //           style: {
  //             fontSize: '12px',
  //             colors: ['#36a800']
  //           }
  //         },
  //         plotOptions: {
  //           bar: {
  //             horizontal: true,
  //             startingShape: 'flat',
  //             endingShape: 'flat',
  //             columnWidth: '70%',
  //             barHeight: '70%',
  //             distributed: false,
  //             // rangeBarOverlap: true,
  //             dataLabels: {
  //               position: 'bot', // top, center, bottom
  //             },
  //             colors: {
  //               ranges: [{
  //                 from: 0,
  //                 to: 10000000000000,
  //                 color: '#37933c'
  //               }],
  //               backgroundBarColors: [],
  //               backgroundBarOpacity: 1,
  //               backgroundBarRadius: 0,
  //             },
  //           }
  //         },
  //         xaxis: {
  //           categories: companyName,
  //           position: 'top',
  //           axisBorder: {
  //             show: false
  //           },
  //           axisTicks: {
  //             show: false
  //           },
  //           labels: {
  //             show: true,
  //             formatter: val => {
  //               return '';
  //             }
  //           },
  //           tooltip: {
  //             enabled: true,
  //           }
  //         },
  //         yaxis: {
  //           axisBorder: {
  //             show: false
  //           },
  //           axisTicks: {
  //             show: false,
  //           }
  //         },
  //         title: {
  //           text: 'Các công ty có nhu cầu tuyển dụng lớn',
  //           align: 'left',
  //           style: {
  //             fontSize: '18px',
  //             fontFamily: 'Nunito, Arial, sans-serif',
  //             fontWeight: '600',
  //           },
  //         },
  //         subtitle: {
  //           text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
  //           align: 'left'
  //         },
  //       };
  //       const chart = new ApexCharts(document.querySelector('#nhu-cau_tuyen_dung_theo_cong_ty'), options);
  //       chart.render();
  //     });
  // }
  showTopHiringCompany(idIndustry: string, idLocation: string) {
    document.getElementById('nhu-cau_tuyen_dung_theo_cong_ty').innerHTML = '';
    this.industriesService.getTopHiringCompany(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getTopHiringCompany');
        console.log(data);
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
  // showTopCompanyHighestSalary(idIndustry: string, idLocation: string) {
  //   document.getElementById('cong_ty_tra_luong_cao').innerHTML = '';
  //   this.industriesService.getTopCompanyHighestSalary(idIndustry, idLocation)
  //     .subscribe((data: any) => {
  //       console.log("getTopCompanyHighestSalary");
  //       console.log(data);
  //       // const milestones = data['timestamps'];
  //       // const numJob = data[milestones[milestones.length - 1]].data;
  //       // const companyObj = data[milestones[milestones.length - 1]].company;
  //       // const companyName = companyObj.map(function (el) { return el.name; })
  //       // const options = {
  //       //   series: [{
  //       //     name: 'Số lượng công việc',
  //       //     data: numJob
  //       //   }],
  //       //   chart: {
  //       //     height: 350,
  //       //     type: 'bar',
  //       //     zoom: {
  //       //       enabled: false
  //       //     },
  //       //     toolbar: {
  //       //       show: false
  //       //     }
  //       //   },
  //       //   dataLabels: {
  //       //     enabled: true,
  //       //     textAnchor: 'start',
  //       //     formatter: val => {
  //       //       return val + '';
  //       //     },
  //       //     offsetX: 0,
  //       //     style: {
  //       //       fontSize: '12px',
  //       //       colors: ['#36a800']
  //       //     }
  //       //   },
  //       //   plotOptions: {
  //       //     bar: {
  //       //       horizontal: true,
  //       //       startingShape: 'flat',
  //       //       endingShape: 'flat',
  //       //       columnWidth: '70%',
  //       //       barHeight: '70%',
  //       //       distributed: false,
  //       //       // rangeBarOverlap: true,
  //       //       dataLabels: {
  //       //         position: 'bot', // top, center, bottom
  //       //       },
  //       //       colors: {
  //       //         ranges: [{
  //       //           from: 0,
  //       //           to: 10000000000000,
  //       //           color: '#37933c'
  //       //         }],
  //       //         backgroundBarColors: [],
  //       //         backgroundBarOpacity: 1,
  //       //         backgroundBarRadius: 0,
  //       //       },
  //       //     }
  //       //   },
  //       //   xaxis: {
  //       //     categories: companyName,
  //       //     position: 'top',
  //       //     axisBorder: {
  //       //       show: false
  //       //     },
  //       //     axisTicks: {
  //       //       show: false
  //       //     },
  //       //     labels: {
  //       //       show: true,
  //       //       formatter: val => {
  //       //         return '';
  //       //       }
  //       //     },
  //       //     tooltip: {
  //       //       enabled: true,
  //       //     }
  //       //   },
  //       //   yaxis: {
  //       //     axisBorder: {
  //       //       show: false
  //       //     },
  //       //     axisTicks: {
  //       //       show: false,
  //       //     }
  //       //   },
  //       //   title: {
  //       //     text: 'Các công ty có nhu cầu tuyển dụng lớn',
  //       //     align: 'left',
  //       //     style: {
  //       //       fontSize: '18px',
  //       //       fontFamily: 'Nunito, Arial, sans-serif',
  //       //       fontWeight: '600',
  //       //     },
  //       //   },
  //       //   subtitle: {
  //       //     text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
  //       //     align: 'left'
  //       //   },
  //       // };
  //       // const chart = new ApexCharts(document.querySelector('#cong_ty_tra_luong_cao'), options);
  //       // chart.render();
  //     });
  // }
  showTopCompanyHighestSalary(idIndustry: string, idLocation: string) {
    document.getElementById('cong_ty_tra_luong_cao').innerHTML = '';
    this.industriesService.getTopCompanyHighestSalary(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getTopCompanyHighestSalary');
        console.log(data);
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
  // showTopHiringJob(idIndustry: string, idLocation: string) {
  //   document.getElementById('nhu-cau_tuyen_dung_theo_cong_viec').innerHTML = '';
  //   this.industriesService.getTopHiringJob(idIndustry, idLocation)
  //     .subscribe((data: any) => {
  //       console.log("getTopHiringJob");
  //       console.log(data);
  //       const milestones = data['timestamps'];
  //       const numJob = data[milestones[milestones.length - 1]].data;
  //       const jobObj = data[milestones[milestones.length - 1]].job;
  //       const jobName = jobObj.map(function (el) { return el.name; })
  //       const options = {
  //         series: [{
  //           name: 'Số lượng công việc',
  //           data: numJob
  //         }],
  //         chart: {
  //           height: 350,
  //           type: 'bar',
  //           zoom: {
  //             enabled: false
  //           },
  //           toolbar: {
  //             show: false
  //           }
  //         },
  //         dataLabels: {
  //           enabled: true,
  //           textAnchor: 'start',
  //           formatter: val => {
  //             return val + '';
  //           },
  //           offsetX: 0,
  //           style: {
  //             fontSize: '12px',
  //             colors: ['#36a800']
  //           }
  //         },
  //         plotOptions: {
  //           bar: {
  //             horizontal: true,
  //             startingShape: 'flat',
  //             endingShape: 'flat',
  //             columnWidth: '70%',
  //             barHeight: '70%',
  //             distributed: false,
  //             // rangeBarOverlap: true,
  //             dataLabels: {
  //               position: 'bot', // top, center, bottom
  //             },
  //             colors: {
  //               ranges: [{
  //                 from: 0,
  //                 to: 100000000,
  //                 color: '#37933c'
  //               }],
  //               backgroundBarColors: [],
  //               backgroundBarOpacity: 1,
  //               backgroundBarRadius: 0,
  //             },
  //           }
  //         },
  //         xaxis: {
  //           categories: jobName,
  //           position: 'top',
  //           axisBorder: {
  //             show: false
  //           },
  //           axisTicks: {
  //             show: false
  //           },
  //           labels: {
  //             show: true,
  //             formatter: val => {
  //               return '';
  //             }
  //           },
  //           tooltip: {
  //             enabled: true,
  //           }
  //         },
  //         yaxis: {
  //           axisBorder: {
  //             show: false
  //           },
  //           axisTicks: {
  //             show: false,
  //           }
  //         },
  //         title: {
  //           text: 'Các vị trí công việc có nhu cầu tuyển dụng lớn',
  //           align: 'left',
  //           style: {
  //             fontSize: '18px',
  //             fontFamily: 'Nunito, Arial, sans-serif',
  //             fontWeight: '600',
  //           },
  //         },
  //         subtitle: {
  //           text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
  //           align: 'left'
  //         },
  //       };
  //       const chart = new ApexCharts(document.querySelector('#nhu-cau_tuyen_dung_theo_cong_viec'), options);
  //       chart.render();
  //     });
  // }
  showTopHiringJob(idIndustry: string, idLocation: string) {
    document.getElementById('nhu-cau_tuyen_dung_theo_cong_viec').innerHTML = '';
    this.industriesService.getTopHiringJob(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getTopHiringJob');
        console.log(data);
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
  // showHighestSalaryJob(idIndustry: string, idLocation: string) {
  //   document.getElementById('viec_duoc_tra_luong_cao').innerHTML = '';
  //   this.industriesService.getHighestSalaryJob(idIndustry, idLocation)
  //     .subscribe((data: any) => {
  //       console.log("getHighestSalaryJob");
  //       console.log(data);
  //       const milestones = data['timestamps'];
  //       const numJob = data[milestones[milestones.length - 1]].data;
  //       const jobObj = data[milestones[milestones.length - 1]].job;
  //       const jobName = jobObj.map(function (el) { return el.name; });


  //       const options = {
  //         series: [{
  //           name: 'Mức lương trung bình',
  //           data: numJob
  //         }],
  //         chart: {
  //           height: 350,
  //           type: 'bar',
  //           zoom: {
  //             enabled: false
  //           },
  //           toolbar: {
  //             show: false
  //           }
  //         },
  //         dataLabels: {
  //           enabled: true,
  //           textAnchor: 'start',
  //           formatter: val => {
  //             return val + '';
  //           },
  //           offsetX: 0,
  //           style: {
  //             fontSize: '12px',
  //             colors: ['#36a800']
  //           }
  //         },
  //         plotOptions: {
  //           bar: {
  //             horizontal: true,
  //             startingShape: 'flat',
  //             endingShape: 'flat',
  //             columnWidth: '70%',
  //             barHeight: '70%',
  //             distributed: false,
  //             // rangeBarOverlap: true,
  //             dataLabels: {
  //               position: 'bot', // top, center, bottom
  //             },
  //             colors: {
  //               ranges: [{
  //                 from: 0,
  //                 to: 1000000000,
  //                 color: '#37933c'
  //               }],
  //               backgroundBarColors: [],
  //               backgroundBarOpacity: 1,
  //               backgroundBarRadius: 0,
  //             },
  //           }
  //         },
  //         xaxis: {
  //           categories: jobName,
  //           position: 'top',
  //           axisBorder: {
  //             show: false
  //           },
  //           axisTicks: {
  //             show: false
  //           },
  //           labels: {
  //             show: true,
  //             formatter: val => {
  //               return '';
  //             }
  //           },
  //           tooltip: {
  //             enabled: true,
  //           }
  //         },
  //         yaxis: {
  //           axisBorder: {
  //             show: false
  //           },
  //           axisTicks: {
  //             show: false,
  //           }
  //         },
  //         title: {
  //           text: 'Các vị trí công việc có mức lương trung bình cao',
  //           align: 'left',
  //           style: {
  //             fontSize: '18px',
  //             fontFamily: 'Nunito, Arial, sans-serif',
  //             fontWeight: '600',
  //           },
  //         },
  //         subtitle: {
  //           text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
  //           align: 'left'
  //         },
  //       };
  //       const chart = new ApexCharts(document.querySelector('#viec_duoc_tra_luong_cao'), options);
  //       chart.render();
  //     });
  // }
  showHighestSalaryJob(idIndustry: string, idLocation: string) {
    document.getElementById('viec_duoc_tra_luong_cao').innerHTML = '';
    this.industriesService.getHighestSalaryJob(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getHighestSalaryJob');
        console.log(data);
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
  // showJobDemandByAge(idIndustry: string, idLocation: string): void {
  //   document.getElementById('nhu-cau-viec-lam-theo-do-tuoi').innerHTML = '';
  //   this.industriesService.getJobDemandByAge(idIndustry, idLocation)
  //     .subscribe((data: any) => {
  //       console.log("getJobDemandByAge");
  //       console.log(data);
  //       if (Object.keys(data).length > 2) {
  //         const milestones = data.timestamps;
  //         const ageRanges = data.ageRange;
  //         const male = data[milestones[milestones.length - 1]].male;
  //         const female = data[milestones[milestones.length - 1]].female;
  //         const dataTable = [];
  //         for (var i = 0; i < ageRanges.length; i++) {
  //           const obj = { ageRange: '', male: 0, female: 0.0 };
  //           obj.ageRange = ageRanges[i];
  //           obj.male = male[i];
  //           obj.female = female[i];
  //           dataTable.push(obj);
  //         }
  //         this.jobDemandByAgeAndGender.data = dataTable;
  //         const options = {
  //           series: [{
  //             name: ' Nam',
  //             data: male
  //           }, {
  //             name: 'Nữ',
  //             data: female
  //           }],
  //           chart: {
  //             type: 'bar',
  //             height: 350,
  //             stacked: true,
  //             toolbar: {
  //               show: true
  //             },
  //             zoom: {
  //               enabled: true
  //             }
  //           },
  //           colors: ['#38933d', '#8dc971'],
  //           title: {
  //             text: 'Nhu cầu việc làm theo độ tuổi, giới tính',
  //             align: 'left',
  //             style: {
  //               fontSize: '18px',
  //             },
  //           },
  //           subtitle: {
  //             text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
  //             align: 'left'
  //           },
  //           responsive: [{
  //             breakpoint: 480,
  //             options: {
  //               legend: {
  //                 position: 'bottom',
  //                 offsetX: -10,
  //                 offsetY: 0
  //               }
  //             }
  //           }],
  //           plotOptions: {
  //             bar: {
  //               horizontal: true,
  //             },
  //           },
  //           xaxis: {
  //             // type: 'datetime',
  //             categories: ageRanges,
  //           },
  //           legend: {
  //             position: 'right',
  //             offsetY: 40
  //           },
  //           fill: {
  //             opacity: 1
  //           }
  //         };

  //         const chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-do-tuoi"), options);
  //         chart.render();
  //       } else {
  //         alert("Khu vực bạn chọn không có dữ liệu về độ tuổi");
  //       }
  //     });
  // }
  showJobDemandByAge(idIndustry: string, idLocation: string): void {
    document.getElementById('nhu-cau-viec-lam-theo-do-tuoi').innerHTML = '';
    this.industriesService.getJobDemandByAge(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getJobDemandByAge');
        console.log(data);
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
  // showJobDemandByLiteracy(idIndustry: string, idLocation: string): void {
  //   document.getElementById('nhu-cau-viec-lam-theo-trinh-do').innerHTML = '';
  //   this.industriesService.getJobDemandByLiteracy(idIndustry, idLocation)
  //     .subscribe((data: any) => {
  //       console.log("getJobDemandByLiteracy");
  //       console.log(data);
  //       if (Object.keys(data).length > 2) {
  //         const milestones = data.timestamps;
  //         const literacies = data.literacy;
  //         const literacyObj = data.literacy;
  //         const literacyName = literacyObj.map(function (el) { return el.name; })

  //         const numJob = data[milestones[milestones.length - 1]].data;
  //         const growth = data[milestones[milestones.length - 1]].growth;
  //         const dataTable = [];

  //         for (var i = 0; i < literacies.length; i++) {
  //           const obj = { literacy: '', numJob: 0, growth: 0.0 };
  //           obj.literacy = literacies[i].name;
  //           obj.numJob = numJob[i];
  //           obj.growth = growth[i];
  //           dataTable.push(obj);
  //         }
  //         console.log(dataTable);
  //         this.jobDemandByLiteracy.data = dataTable;

  //         const options = {
  //           series: numJob,
  //           chart: {
  //             width: '100%',
  //             height: 350,
  //             type: 'donut',

  //           },
  //           colors: ['#2e7932', '#77792e', '#9e9c00', '#649628', '#0890a9'],
  //           labels: literacyName,
  //           // theme: {
  //           //   palette: 'palette2',
  //           //   monochrome: {
  //           //     enabled: true,
  //           //     color: '#82b440',
  //           //   }
  //           // },

  //           title: {
  //             text: "Biểu đồ phân bổ việc làm theo trình độ học vấn",
  //             align: 'left',
  //             style: {
  //               fontSize: '18px',
  //               fontWeight: 'bold',
  //               fontFamily: undefined,
  //               color: '#263238'
  //             },
  //           },
  //           subtitle: {
  //             text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
  //             align: 'left'
  //           },
  //           responsive: [{
  //             breakpoint: 480,
  //             options: {
  //               chart: {
  //                 width: 200
  //               },
  //               legend: {
  //                 position: 'bottom'
  //               }
  //             }
  //           }]
  //         };

  //         const chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-trinh-do"), options);
  //         chart.render();
  //       } else {
  //         alert("Khu vực bạn chọn không có dữ liệu về trình độ học vấn");
  //       }
  //     });
  // }
  showJobDemandByLiteracy(idIndustry: string, idLocation: string): void {
    document.getElementById('nhu-cau-viec-lam-theo-trinh-do').innerHTML = '';
    this.industriesService.getJobDemandByLiteracy(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log('getJobDemandByLiteracy');
        console.log(data);
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
