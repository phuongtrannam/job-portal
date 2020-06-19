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
  control = new FormControl();
  cityList: City[] = [{id: '1', name: 'Champs-Élysées'},
              {id: '2', name: 'Lombard Street'},
              {id: '3', name: 'Abbey Road'},
              {id: '4', name: 'Fifth Avenue'}];
  dataJobDemandByAge;
  dataJobDemandByLiteracy;
  public timeAgeChart: any = [
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
  jobInfo = {name: '', minSalary: '', maxSalary: '', numJob: 0};
  filteredOptions: Observable<City[]>;
  ngOnInit() {
    this.getCityList();
    this.selectedJobId = this.route.snapshot.paramMap.get('id');
    this.jobInfoHeader(this.selectedJobId);
    this.showJobDemandAndAverageSalary(this.selectedJobId, this.selectedCity);
    this.showJobDemandByAge(this.selectedJobId, this.selectedCity);
    this.showJobDemandByLiteracy(this.selectedJobId, this.selectedCity);
    this.getRelatedJobs(this.selectedJobId);
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
    this.showJobDemandAndAverageSalary(this.selectedJobId, this.selectedCity);
    this.showJobDemandByAge(this.selectedJobId, this.selectedCity);
    this.showJobDemandByLiteracy(this.selectedJobId, this.selectedCity);
    // console.log(this.selectedCity);
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
  getRelatedJobs(idJob: string): void {
    this.jobsService.getRelatedJobs(idJob)
      .subscribe((data: any) => {
        console.log('getJobsRelated');
        console.log(data.result.slice(4));
        this.relatedJobs = data.result.slice(4);
      });
  }

}
