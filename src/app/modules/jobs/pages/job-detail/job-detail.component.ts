import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { JobsService } from '../../jobs.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

export interface City {
  name: string;
  id: string;
  // area: string;
}

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
  providers: [JobsService]
})
export class JobDetailComponent implements OnInit {


  constructor(private jobsService: JobsService,
              private route: ActivatedRoute) {

  }
  selectedJobId: string;
  jobDemandAndAverageSalaryTable = ['timestamp', 'numJob', 'salary'];
  jobDemandAndAverageSalary = new MatTableDataSource<any>([]);

  jobDemandByAgeAndGenderTable = ['ageRange', 'male', 'female'];
  jobDemandByAgeAndGender = new MatTableDataSource<any>([]);

  jobDemandByLiteracyTable = ['literacy', 'numJob', 'growth'];
  jobDemandByLiteracy = new MatTableDataSource<any>([]);

  relatedJobs = [];

  selectedCity = 'P0';
  selectedCityName = '';
  showChart = true;
  control = new FormControl();
  cityList: City[] = [{id: '1', name: 'Champs-Élysées'},
              {id: '2', name: 'Lombard Street'},
              {id: '3', name: 'Abbey Road'},
              {id: '4', name: 'Fifth Avenue'}];
  dataTopHiringRegion;
  dataHighestSalaryRegion;
  dataTopHiringCompany;
  dataHighestSalaryCompany;
  dataJobDemandByAge;
  dataJobDemandByLiteracy;
  public timeAgeChart: any = [];
  public timeLiteracyChart: any = [];
  public timeRegionNumJobChart: any = [];
  public timeRegionSalaryChart: any = [];
  public timeCompanyNumJobChart: any = [];
  public timeCompanySalaryChart: any = [];
  jobInfo = {name: '', minSalary: '', maxSalary: '', numJob: 0};
  filteredOptions: Observable<City[]>;
  ngOnInit() {
    this.getCityList();
    this.selectedJobId = this.route.snapshot.paramMap.get('id');
    this.jobInfoHeader(this.selectedJobId);
    this.showJobDemandAndAverageSalary(this.selectedJobId, this.selectedCity);
    this.showTopHiringRegion(this.selectedJobId);
    this.showHighestSalaryRegion(this.selectedJobId);
    this.showJobDemandByAge(this.selectedJobId, this.selectedCity);
    this.showJobDemandByLiteracy(this.selectedJobId, this.selectedCity);
    this.getRelatedJobs(this.selectedJobId);
    this.showTopHiringCompany(this.selectedJobId, this.selectedCity);
    this.showTopCompanyHighestSalary(this.selectedJobId, this.selectedCity)
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
    this.showChart = false;
    this.selectedCity = selectedCityId;
    this.selectedCityName = this.cityList.find(x => x.id === selectedCityId).name;
    this.showJobDemandAndAverageSalary(this.selectedJobId, this.selectedCity);
    this.showJobDemandByAge(this.selectedJobId, this.selectedCity);
    this.showJobDemandByLiteracy(this.selectedJobId, this.selectedCity);
    this.showTopHiringCompany(this.selectedJobId, this.selectedCity);
    // console.log(this.selectedCity);
  }

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
        this.filteredOptions = this.control.valueChanges
          .pipe(
            startWith<string | City>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.cityList.slice())
          );
        // console.log(this.filteredOptions);
    });
  }
  jobInfoHeader(idJob: string): void {
    this.jobsService.getJobInfo(idJob)
      .subscribe((data: any) => {
        console.log('jobInfoHeader');
        this.jobInfo.maxSalary = data.maxSalary;
        this.jobInfo.minSalary = data.minSalary;
        this.jobInfo.numJob = Math.floor(parseFloat(data.numJob));
        this.jobInfo.name = data.name;
      });
  }
  showJobDemandAndAverageSalary(idJob: string, idLocation: string): void {
    document.getElementById('chart').innerHTML = '';
    this.jobsService.getJobDemandByPeriodOfTime(idJob, idLocation)
      .subscribe((data: any) => {
        console.log('getJobDemandByPeriodOfTime');
        console.log(data);
        // this.jobDemandByPeriodOfTime = data.result;
        const dataTable = [];
        if (Object.keys(data).length > 1) {
          const milestones = data.timestamp;
          const numJob = data.data;
          const growthJob = data.growth;
          this.jobsService.getAverageSalary(idJob, idLocation)
            .subscribe((data1: any) => {
              // const milestones = data.timestamp;
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

                var chart = new ApexCharts(document.querySelector('#chart'), options);
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
  showJobDemandByAge(idJob: string, idLocation: string): void {
    document.getElementById('nhu-cau-viec-lam-theo-do-tuoi').innerHTML = '';
    this.jobsService.getJobDemandByAge(idJob, idLocation)
      .subscribe((data: any) => {
        console.log('getJobDemandByAge');
        console.log(data);
        this.dataJobDemandByAge = data; 
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          this.timeAgeChart = [];
          let j = 0;
          for(const time of milestones){
            j++;
            if ( j < milestones.length){
              this.timeAgeChart.push({name: time, selected: false});
            } else {
              this.timeAgeChart.push({name: time, selected: true});
            }
          }
          const ageRanges = data.ageRange;
          const male = data[milestones[milestones.length -1]].male;
          const female = data[milestones[milestones.length -1]].female;
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

          const chart = new ApexCharts(document.querySelector('#nhu-cau-viec-lam-theo-do-tuoi'), options);
          chart.render();
        } else {
          // alert("Khu vực bạn chọn không có dữ liệu về độ tuổi");
        }
      });
  }
  reloadJobDemandByAge(index: number){
    document.getElementById('nhu-cau-viec-lam-theo-do-tuoi').innerHTML = '';
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

      const chart = new ApexCharts(document.querySelector('#nhu-cau-viec-lam-theo-do-tuoi'), options);
      chart.render();
    } else {
      // alert("Khu vực bạn chọn không có dữ liệu về độ tuổi");
    }
  }
  showJobDemandByLiteracy(idJob: string, idLocation: string): void {
    document.getElementById('nhu-cau-viec-lam-theo-trinh-do').innerHTML = '';
    this.jobsService.getJobDemandByLiteracy(idJob, idLocation)
      .subscribe((data: any) => {
        console.log('getJobDemandByLiteracy');
        // console.log(data.result);
        this.dataJobDemandByLiteracy = data; 
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          this.timeLiteracyChart = [];
          let j = 0;
          for(const time of milestones){
            j++;
            if ( j < milestones.length){
              this.timeLiteracyChart.push({name: time, selected: false});
            } else {
              this.timeLiteracyChart.push({name: time, selected: true});
            }
          }
          const literacies = data.literacy;
          const numJob = data[milestones[milestones.length -1]].data;
          const growth = data[milestones[milestones.length -1]].growth;
          const dataTable = [];

          for (let i = 0; i < literacies.length; i++) {
            const obj = { literacy: '', numJob: 0, growth: 0.0 };
            obj.literacy = literacies[i];
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
            colors:  ['#2e7932', '#77792e', '#9e9c00', '#649628', '#0890a9'],
            labels: literacies,
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

          const chart = new ApexCharts(document.querySelector('#nhu-cau-viec-lam-theo-trinh-do'), options);
          chart.render();
        } else {
          // alert("Khu vực bạn chọn không có dữ liệu về trình độ học vấn");
        }
      });
  }
  reloadJobDemandByLiteracy(index: number){
    document.getElementById('nhu-cau-viec-lam-theo-trinh-do').innerHTML = '';
    if (Object.keys(this.dataJobDemandByLiteracy).length > 2) {
      const milestones = this.dataJobDemandByLiteracy.timestamps;
      const literacies = this.dataJobDemandByLiteracy.literacy;
      const numJob = this.dataJobDemandByLiteracy[milestones[index]].data;
      const growth = this.dataJobDemandByLiteracy[milestones[index]].growth;
      const dataTable = [];

      for (let i = 0; i < literacies.length; i++) {
        const obj = { literacy: '', numJob: 0, growth: 0.0 };
        obj.literacy = literacies[i];
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
        colors:  ['#2e7932', '#77792e', '#9e9c00', '#649628', '#0890a9'],
        labels: literacies,
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

      const chart = new ApexCharts(document.querySelector('#nhu-cau-viec-lam-theo-trinh-do'), options);
      chart.render();
    } else {
      // alert("Khu vực bạn chọn không có dữ liệu về trình độ học vấn");
    }
  }
  showTopHiringRegion(idJob: string) {
    document.getElementById('nhu_cau_tuyen_dung_theo_khu_vuc').innerHTML = '';
    this.jobsService.getTopHiringRegion(idJob)
      .subscribe((data: any) => {
        console.log('getTopHiringRegion');
        console.log(data);
        this.dataTopHiringRegion = data;
        const milestones = data.timestamps;
        this.timeRegionNumJobChart = [];
        let j = 0;
        for(const time of milestones){
          j++;
          if ( j < milestones.length){
            this.timeRegionNumJobChart.push({name: time, selected: false});
          } else {
            this.timeRegionNumJobChart.push({name: time, selected: true});
          }
        }
        const numJob = data[milestones[milestones.length - 1]].data;
        const companyObj = data[milestones[milestones.length - 1]].object;
        const companyName = companyObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Số lượng công việc',
            data: numJob,
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
  reloadTopHiringRegion(index: number){
    document.getElementById('nhu_cau_tuyen_dung_theo_khu_vuc').innerHTML = '';
    const milestones = this.dataTopHiringRegion.timestamps;
    const numJob = this.dataTopHiringRegion[milestones[index]].data;
    const companyObj = this.dataTopHiringRegion[milestones[index]].object;
    const companyName = companyObj.map(function (el) { return el.name; })
    const options = {
      series: [{
        name: 'Số lượng công việc',
        data: numJob,
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
        text: 'Các khu vực có nhu cầu tuyển dụng lớn',
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
    const chart = new ApexCharts(document.querySelector('#nhu_cau_tuyen_dung_theo_khu_vuc'), options);
    chart.render();
  }
  showHighestSalaryRegion(idJob: string) {
    document.getElementById('khu_vuc_tra_luong_cao').innerHTML = '';
    this.jobsService.getHighestSalaryRegion(idJob)
      .subscribe((data: any) => {
        console.log('getHighestSalaryRegion');
        console.log(data);
        this.dataHighestSalaryRegion = data;
        const milestones = data.timestamps;
        this.timeRegionSalaryChart = [];
        let j = 0;
        for(const time of milestones){
          j++;
          if ( j < milestones.length){
            this.timeRegionSalaryChart.push({name: time, selected: false});
          } else {
            this.timeRegionSalaryChart.push({name: time, selected: true});
          }
        }
        const numJob = data[milestones[milestones.length - 1]].data;
        const companyObj = data[milestones[milestones.length - 1]].object;
        const companyName = companyObj.map(function (el) { return el.name; })
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
            text: 'Các khu vực có mức lương trung bình cao',
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
  reloadHighestSalaryRegion(index: number){
    document.getElementById('khu_vuc_tra_luong_cao').innerHTML = '';
    const milestones = this.dataHighestSalaryRegion.timestamps;
    const numJob = this.dataHighestSalaryRegion[milestones[index]].data;
    const companyObj = this.dataHighestSalaryRegion[milestones[index]].object;
    const companyName = companyObj.map(function (el) { return el.name; })
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
        text: 'Các khu vực có mức lương trung bình cao',
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
    const chart = new ApexCharts(document.querySelector('#khu_vuc_tra_luong_cao'), options);
    chart.render();
  }
  showTopHiringCompany(idJob: string, idLocation: string) {
    document.getElementById('nhu-cau_tuyen_dung_theo_cong_ty').innerHTML = '';
    this.jobsService.getTopHiringCompanies(idJob, idLocation)
      .subscribe((data: any) => {
        console.log('getTopHiringCompanies');
        console.log(data);
        this.dataTopHiringCompany = data;
        const milestones = data.timestamps;
        this.timeCompanyNumJobChart = [];
        let j = 0;
        for(const time of milestones){
          j++;
          if ( j < milestones.length){
            this.timeCompanyNumJobChart.push({name: time, selected: false});
          } else {
            this.timeCompanyNumJobChart.push({name: time, selected: true});
          }
        }
        const numJob = data[milestones[milestones.length - 1]].data;
        const companyObj = data[milestones[milestones.length - 1]].object;
        const companyName = companyObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Số lượng công việc',
            data: numJob,
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
  reloadTopHiringCompany(index: number){
    document.getElementById('nhu-cau_tuyen_dung_theo_cong_ty').innerHTML = '';
    const milestones = this.dataTopHiringCompany.timestamps;
    const numJob = this.dataTopHiringCompany[milestones[index]].data;
    const companyObj = this.dataTopHiringCompany[milestones[index]].object;
    const companyName = companyObj.map(function (el) { return el.name; })
    const options = {
      series: [{
        name: 'Số lượng công việc',
        data: numJob,
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
        text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[index],
        align: 'left'
      },
    };
    const chart = new ApexCharts(document.querySelector('#nhu-cau_tuyen_dung_theo_cong_ty'), options);
    chart.render();
  }
  showTopCompanyHighestSalary(idJob: string, idLocation: string) {
    document.getElementById('cong_ty_tra_luong_cao').innerHTML = '';
    this.jobsService.getTopHighestSalaryCompanies(idJob, idLocation)
      .subscribe((data: any) => {
        console.log('getTopHighestSalaryCompanies');
        console.log(data);
        this.dataHighestSalaryCompany = data;
        const milestones = data.timestamps;
        this.timeCompanySalaryChart = [];
        let j = 0;
        for(const time of milestones){
          j++;
          if ( j < milestones.length){
            this.timeCompanySalaryChart.push({name: time, selected: false});
          } else {
            this.timeCompanySalaryChart.push({name: time, selected: true});
          }
        }
        const numJob = data[milestones[milestones.length - 1]].data;
        const companyObj = data[milestones[milestones.length - 1]].object;
        const companyName = companyObj.map(function (el) { return el.name; })
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
  reloadTopCompanyHighestSalary(index: number){
    document.getElementById('cong_ty_tra_luong_cao').innerHTML = '';
    const milestones = this.dataHighestSalaryCompany.timestamps;
    const numJob = this.dataHighestSalaryCompany[milestones[index]].data;
    const companyObj = this.dataHighestSalaryCompany[milestones[index]].object;
    const companyName = companyObj.map(function (el) { return el.name; })
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
  getRelatedJobs(idJob: string): void {
    this.jobsService.getRelatedJobs(idJob)
      .subscribe((data: any) => {
        console.log('getJobsRelated');
        console.log(data.result.slice(4));
        this.relatedJobs = data.result.slice(4);
      });
  }

}
