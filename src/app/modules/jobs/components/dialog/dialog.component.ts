import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { JobsService } from '../../jobs.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var ApexCharts: any;

export interface DialogData {
  city1: string;
  cityName1: string;
  city2: string;
  cityName2: string;
  jobId: string;
  jobName: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [JobsService]
})
export class DialogComponent implements OnInit {

  public timeAgeAndGenderChart1: any = [];
  public timeLiteracyChart1: any = [];
  public timeAgeAndGenderChart2: any = [];
  public timeLiteracyChart2: any = [];
  nameCity1 = '';
  nameCity2 = '';
  dataJobDemandByAge1: any;
  dataJobDemandByLiteracy1: any;
  dataJobDemandByAge2: any;
  dataJobDemandByLiteracy2: any;
  isLoading = true;
  numApi = 0;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private jobsService: JobsService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.numApi = 0;
    this.isLoading = true;
    this.nameCity1 = '';
    if (this.data.city1.split(',').length > 1 ) {
      this.nameCity1 = 'nhóm khu vực 1';
    } else {
      this.nameCity1 = this.data.cityName1;
    }
    this.nameCity2 = '';
    if (this.data.city2.split(',').length > 1 ) {
      this.nameCity2 = 'nhóm khu vực 2';
    } else {
      this.nameCity2 = this.data.cityName2;
    }

    this.showNumJobAndSalaryCity('compare-number-job-salary-1', this.data.city1, this.nameCity1);
    this.showNumJobAndSalaryCity('compare-number-job-salary-2', this.data.city2, this.nameCity2);
    this.showAgeAndGenderChart('job-demand-by-age-and-gender1', this.data.city1, this.nameCity1);
    this.showAgeAndGenderChart('job-demand-by-age-and-gender2', this.data.city2, this.nameCity2);
    this.showJobDemandByLiteracy('job-demand-by-literacy1', this.data.city1, this.nameCity1);
    this.showJobDemandByLiteracy('job-demand-by-literacy2', this.data.city2, this.nameCity2);
  }
  changeAgeAndGenderChart(index: number, selector: string) {
    if(selector === 'job-demand-by-age-and-gender1'){
      this.timeAgeAndGenderChart1.forEach(element => {
        element.selected = false;
      });
      this.timeAgeAndGenderChart1[index].selected = true;
      console.log(index);
      this.reloadJobDemandByAge(index, selector, this.dataJobDemandByAge1, this.nameCity1);
    } else if(selector === 'job-demand-by-age-and-gender2'){
      this.timeAgeAndGenderChart2.forEach(element => {
        element.selected = false;
      });
      this.timeAgeAndGenderChart2[index].selected = true;
      console.log(index);
      this.reloadJobDemandByAge(index, selector, this.dataJobDemandByAge2, this.nameCity2);
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
      this.reloadJobDemandByLiteracy(index, selector, this.dataJobDemandByLiteracy1, this.nameCity1);
    } else if(selector === 'job-demand-by-literacy2'){
      this.timeLiteracyChart2.forEach(element => {
        element.selected = false;
      });
      this.timeLiteracyChart2[index].selected = true;
      console.log(index);
      this.reloadJobDemandByLiteracy(index, selector, this.dataJobDemandByLiteracy2, this.nameCity2);
    }
  }
  showNumJobAndSalaryCity(selector: string, cityId: string, nameCity: string) {
    document.getElementById(selector).innerHTML = '';
    this.jobsService.getJobDemandByPeriodOfTime(this.data.jobId, cityId)
      .subscribe((data: any) => {
        console.log('getJobDemandByPeriodOfTime');
        console.log(data);
        this.numApi++;
        if(this.numApi === 8 ){
          this.isLoading = false;
        }
        // this.increaseNumApi();
        if (Object.keys(data).length > 1) {
          const milestones = data.timestamp;
          const numJob = data.data;
          this.jobsService.getAverageSalary(this.data.jobId, cityId)
            .subscribe((data1: any) => {
              console.log('getAverageSalary');
              console.log(data1);
              this.numApi++;
              if(this.numApi === 8 ){
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
  showAgeAndGenderChart(selector: string, cityId: string, nameCity: string) {
    document.getElementById(selector).innerHTML = '';
    this.jobsService.getJobDemandByAge(this.data.jobId, cityId)
      .subscribe((data: any) => {
        console.log('getJobDemandByAge');
        console.log(data);
        this.numApi++;
        if(this.numApi === 8 ){
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
          console.log(this.timeAgeAndGenderChart1);
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
  showJobDemandByLiteracy(selector: string, cityId: string, nameCity: string): void {
    document.getElementById(selector).innerHTML = '';
    this.jobsService.getJobDemandByLiteracy(this.data.jobId, cityId)
      .subscribe((data: any) => {
        console.log('getJobDemandByLiteracy');
        console.log(data);
        this.numApi++;
        if(this.numApi === 8 ){
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
      // const literacies = dataJobDemandByLiteracy.literacy;
      // const literacyObj = dataJobDemandByLiteracy.literacy;
      // const literacyName = literacyObj.map(function (el) { return el.name; })
      const literacyName = dataJobDemandByLiteracy.literacy;
      const numJob = dataJobDemandByLiteracy[milestones[index]].data;
      const growth = dataJobDemandByLiteracy[milestones[index]].growth;
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
