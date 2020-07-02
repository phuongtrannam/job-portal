import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { JobsService } from '../../jobs.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var ApexCharts: any;

export interface DialogData {
  cityId: string,
  cityName: string,
  job1: string;
  jobName1: string;
  job2: string;
  jobName2: string;
  dataJobDemand: any;
  dataAverageSalary: any;
  dataJobDemandByAge: any;
  dataJobDemandByLiteracy: any;
}

@Component({
  selector: 'app-comparing-job',
  templateUrl: 'comparing-job.component.html',
  styleUrls: ['./comparing-job.component.scss'],
  providers: [JobsService]
})
export class ComparingJobComponent implements OnInit {

  public timeAgeAndGenderChart1: any = [];
  public timeLiteracyChart1: any = [];
  public timeAgeAndGenderChart2: any = [];
  public timeLiteracyChart2: any = [];
  nameCity = '';
  dataJobDemandByAge1: any;
  dataJobDemandByLiteracy1: any;
  dataJobDemandByAge2: any;
  dataJobDemandByLiteracy2: any;
  isLoading = true;
  numApi = 0;
  constructor(
    public dialogRef: MatDialogRef<ComparingJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private jobsService: JobsService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.numApi = 0;
    this.isLoading = true;
    this.nameCity = '';
    if (this.data.cityId.split(',').length > 1 ) {
      this.nameCity = 'nhóm khu vực';
    } else {
      this.nameCity = this.data.cityName;
    }
    this.dataJobDemandByAge1 = this.data.dataJobDemandByAge;
    this.timeAgeAndGenderChart1 = [];
    let i = 0;
    const lenTimeAgeChart1 = this.dataJobDemandByAge1.timestamps.length;
    for (const time of this.dataJobDemandByAge1.timestamps) {
      i++;
      if (i < this.dataJobDemandByAge1.timestamps.length) {
        this.timeAgeAndGenderChart1.push({ name: time, selected: false });
      } else {
        this.timeAgeAndGenderChart1.push({ name: time, selected: true });
      }
    }
    this.dataJobDemandByLiteracy1 = this.data.dataJobDemandByLiteracy;
    const lenTimeLiteracyChart1 = this.dataJobDemandByLiteracy1.timestamps.length;
    this.timeLiteracyChart1 = [];
    let j = 0;
    for (const time of this.dataJobDemandByLiteracy1.timestamps) {
      j++;
      if (j < this.dataJobDemandByLiteracy1.timestamps.length) {
        this.timeLiteracyChart1.push({ name: time, selected: false });
      } else {
        this.timeLiteracyChart1.push({ name: time, selected: true });
      }
    }
    const milestones = this.data.dataJobDemand.timestamp;
    const numJob = this.data.dataJobDemand.data;
    const salary = this.data.dataAverageSalary.data;

    this.showNumJobAndSalaryJob1('compare-number-job-salary-1', numJob,salary, milestones, this.nameCity);
    this.showNumJobAndSalary('compare-number-job-salary-2', this.data.job2, this.data.cityId, this.nameCity);
    this.reloadJobDemandByAge(lenTimeAgeChart1 - 1 , 'job-demand-by-age-and-gender1',
                                  this.dataJobDemandByAge1, this.nameCity);
    this.showAgeAndGenderChart('job-demand-by-age-and-gender2', this.data.job2, this.data.cityId, this.nameCity);
    this.reloadJobDemandByLiteracy(lenTimeLiteracyChart1 - 1, 'job-demand-by-literacy1',
                                  this.dataJobDemandByLiteracy1, this.nameCity);
    this.showJobDemandByLiteracy('job-demand-by-literacy2', this.data.job2, this.data.cityId, this.nameCity);
  }
  changeAgeAndGenderChart(index: number, selector: string) {
    if(selector === 'job-demand-by-age-and-gender1'){
      this.timeAgeAndGenderChart1.forEach(element => {
        element.selected = false;
      });
      this.timeAgeAndGenderChart1[index].selected = true;
      console.log(index);
      this.reloadJobDemandByAge(index, selector, this.dataJobDemandByAge1, this.nameCity);
    } else if(selector === 'job-demand-by-age-and-gender2'){
      this.timeAgeAndGenderChart2.forEach(element => {
        element.selected = false;
      });
      this.timeAgeAndGenderChart2[index].selected = true;
      console.log(index);
      this.reloadJobDemandByAge(index, selector, this.dataJobDemandByAge2, this.nameCity);
    }
  }
  changeLiteracyChart(index: number, selector: string) {
    if(selector === 'job-demand-by-literacy1'){
      this.timeLiteracyChart1.forEach(element => {
        element.selected = false;
      });
      this.timeLiteracyChart1[index].selected = true;
      console.log(index);
      console.log(selector);
      this.reloadJobDemandByLiteracy(index, selector, this.dataJobDemandByLiteracy1, this.nameCity);
    } else if(selector === 'job-demand-by-literacy2'){
      this.timeLiteracyChart2.forEach(element => {
        element.selected = false;
      });
      this.timeLiteracyChart2[index].selected = true;
      console.log(index);
      this.reloadJobDemandByLiteracy(index, selector, this.dataJobDemandByLiteracy2, this.nameCity);
    }
  }
  showNumJobAndSalaryJob1(selector: string, numJob: any, salary: any, milestones: any, nameCity: string){
    document.getElementById(selector).innerHTML = '';
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
        text: 'Nhu cầu việc làm và lương trung bình tại ' + nameCity,
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
    var chart = new ApexCharts(document.querySelector('#' + selector), options);
    chart.render();
  }
  showNumJobAndSalary(selector: string, jobId: string, cityId: string, nameCity: string) {
    document.getElementById(selector).innerHTML = '';
    this.jobsService.getJobDemandByPeriodOfTime(jobId, cityId)
      .subscribe((data: any) => {
        console.log('getJobDemandByPeriodOfTime');
        console.log(data);
        this.numApi++;
        if(this.numApi === 4 ){
          this.isLoading = false;
        }
        // this.increaseNumApi();
        if (Object.keys(data).length > 1) {
          const milestones = data.timestamp;
          const numJob = data.data;
          this.jobsService.getAverageSalary(jobId, cityId)
            .subscribe((data1: any) => {
              console.log('getAverageSalary');
              console.log(data1);
              this.numApi++;
              if(this.numApi === 4 ){
                this.isLoading = false;
              }
              // this.increaseNumApi();
              if (Object.keys(data1).length > 1) {
                const salary = data1.data;
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
                    text: 'Nhu cầu việc làm và lương trung bình tại ' + nameCity,
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
                var chart = new ApexCharts(document.querySelector('#' + selector), options);
                chart.render();
              }
            });
        }
      });
  }
  showAgeAndGenderChart(selector: string, jobId: string, cityId: string, nameCity: string) {
    document.getElementById(selector).innerHTML = '';
    this.jobsService.getJobDemandByAge(jobId, cityId)
      .subscribe((data: any) => {
        console.log('getJobDemandByAge');
        console.log(data);
        this.numApi++;
        if(this.numApi === 4 ){
          this.isLoading = false;
        }
        // this.increaseNumApi();
        // dataJobDemandByAge = data;
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          const timeAgeAndGenderChart = [];
          let i = 0;
          for (const time of milestones) {
            i++;
            if (i < milestones.length) {
              timeAgeAndGenderChart.push({ name: time, selected: false });
            } else {
              timeAgeAndGenderChart.push({ name: time, selected: true });
            }
          }
          if(selector === 'job-demand-by-age-and-gender1'){
            this.dataJobDemandByAge1 = data;
            this.timeAgeAndGenderChart1 = timeAgeAndGenderChart;
          } else if(selector === 'job-demand-by-age-and-gender2'){
            this.dataJobDemandByAge2 = data;
            this.timeAgeAndGenderChart2 = timeAgeAndGenderChart;
          }
          console.log(this.dataJobDemandByAge1);
          const ageRanges = data.ageRange;
          const male = data[milestones[milestones.length - 1]].male;
          const female = data[milestones[milestones.length - 1]].female;
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
              text: 'Nhu cầu việc làm theo độ tuổi, giới tính tại' + nameCity,
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

          const chart = new ApexCharts(document.querySelector('#' + selector), options);
          chart.render();
        } else {
          alert('Khu vực bạn chọn không có dữ liệu về độ tuổi');
        }
      });
  }
  reloadJobDemandByAge(index: number, selector: string, dataJobDemandByAge: any, nameCity: string) {
    document.getElementById(selector).innerHTML = '';
    if (Object.keys(dataJobDemandByAge).length > 2) {
      const milestones = dataJobDemandByAge.timestamps;
      const ageRanges = dataJobDemandByAge.ageRange;
      const male = dataJobDemandByAge[milestones[index]].male;
      const female = dataJobDemandByAge[milestones[index]].female;
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
          text: 'Nhu cầu việc làm theo độ tuổi, giới tính tại ' + nameCity,
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

      const chart = new ApexCharts(document.querySelector('#' + selector), options);
      chart.render();
    } else {
      alert("Khu vực bạn chọn không có dữ liệu về độ tuổi");
    }
  }
  showJobDemandByLiteracy(selector: string, jobId: string, cityId: string, nameCity: string): void {
    document.getElementById(selector).innerHTML = '';
    this.jobsService.getJobDemandByLiteracy(jobId, cityId)
      .subscribe((data: any) => {
        console.log('getJobDemandByLiteracy');
        console.log(data);
        this.numApi++;
        if(this.numApi === 4 ){
          this.isLoading = false;
        }
        // this.increaseNumApi();
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          const timeLiteracyChart = [];
          let i = 0;
          for (const time of milestones) {
            i++;
            if (i < milestones.length) {
              timeLiteracyChart.push({ name: time, selected: false });
            } else {
              timeLiteracyChart.push({ name: time, selected: true });
            }
          }
          console.log(timeLiteracyChart);
          console.log(selector);
          if (selector === 'job-demand-by-literacy1') {
            this.dataJobDemandByLiteracy1 = data;
            this.timeLiteracyChart1 = timeLiteracyChart;
            console.log(this.timeLiteracyChart1);
          } else if (selector === 'job-demand-by-literacy2') {
            this.dataJobDemandByLiteracy2 = data;
            this.timeLiteracyChart2 = timeLiteracyChart;
          }
          // const literacyObj = data.literacy;
          // const literacyName = literacyObj.map(function (el) { return el.name; })
          const literacyName = data.literacy;
          const numJob = data[milestones[milestones.length - 1]].data;
          const options = {
            series: numJob,
            chart: {
              width: '100%',
              height: 350,
              type: 'donut',

            },
            colors: ['#2e7932', '#77792e', '#9e9c00', '#649628', '#0890a9'],
            labels: literacyName,
            title: {
              text: 'Biểu đồ phân bổ việc làm theo trình độ học vấn tại ' + nameCity ,
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

          const chart = new ApexCharts(document.querySelector('#' + selector), options);
          chart.render();
        } else {
          alert('Khu vực bạn chọn không có dữ liệu về trình độ học vấn');
        }
      });
  }
  reloadJobDemandByLiteracy(index: number, selector: string, dataJobDemandByLiteracy: any, nameCity: string) {
    document.getElementById(selector).innerHTML = '';
    if (Object.keys(dataJobDemandByLiteracy).length > 2) {
      const milestones = dataJobDemandByLiteracy.timestamps;
      console.log(milestones);
      console.log(dataJobDemandByLiteracy);
      // const literacies = dataJobDemandByLiteracy.literacy;
      // const literacyObj = dataJobDemandByLiteracy.literacy;
      // const literacyName = literacyObj.map(function (el) { return el.name; })
      const literacyName = dataJobDemandByLiteracy.literacy;
      const numJob = dataJobDemandByLiteracy[milestones[index]].data;
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
          text: 'Biểu đồ phân bổ việc làm theo trình độ học vấn tại ' + nameCity,
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

      const chart = new ApexCharts(document.querySelector('#' + selector), options);
      chart.render();
    } else {
      alert('Khu vực bạn chọn không có dữ liệu về trình độ học vấn');
    }
  }
}
