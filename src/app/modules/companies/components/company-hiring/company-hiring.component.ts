import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-company-hiring',
  templateUrl: './company-hiring.component.html',
  styleUrls: ['./company-hiring.component.scss'],
  providers: [CompaniesService]
})
export class CompanyHiringComponent implements OnInit {
  jobDemandAndAverageSalaryTable = ['timestamp', 'numJob', 'salary'];
  jobDemandAndAverageSalary = new MatTableDataSource<any>([]);

  jobDemandByAgeAndGenderTable = ['ageRange', 'male', 'female'];
  jobDemandByAgeAndGender = new MatTableDataSource<any>([]);

  jobDemandByLiteracyTable = ['literacy', 'numJob', 'growth'];
  jobDemandByLiteracy = new MatTableDataSource<any>([]);

  dataTopHiringJob;
  dataHighestSalaryJob;
  dataJobDemandByAge;
  dataJobDemandByLiteracy;

  public timeJobNumJobChart: any = [];
  public timeJobSalaryChart: any = [];
  public timeAgeChart: any = [];
  public timeLiteracyChart: any = [];

  selectedCompanyId: string;
  constructor(private companiesService: CompaniesService,
              private route: ActivatedRoute) {
    this.selectedCompanyId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    this.showJobDemandAndAverageSalary(this.selectedCompanyId);
    this.showJobDemandByAge(this.selectedCompanyId);
    this.showJobDemandByLiteracy(this.selectedCompanyId);
    this.showTopHiringJob(this.selectedCompanyId);
    this.showHighestSalaryJob(this.selectedCompanyId);
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

  showJobDemandAndAverageSalary(companyId: string): void {
    document.getElementById('chart').innerHTML = '';
    this.companiesService.getJobDemandByCompany(companyId)
      .subscribe((data: any) => {
        console.log('getJobDemandByPeriodOfTime');
        console.log(data);
        // this.jobDemandByPeriodOfTime = data.result;
        const dataTable = [];
        if (Object.keys(data).length > 1) {
          const milestones = data.timestamp;
          const numJob = data.data;
          const growthJob = data.growth;
          this.companiesService.getSalaryByCompany(companyId)
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

  showTopHiringJob(companyId: string) {
    document.getElementById('nhu_cau_tuyen_dung_theo_cong_viec').innerHTML = '';
    this.companiesService.getHighestDemandJobByCompany(companyId)
      .subscribe((data: any) => {
        console.log('getHighestDemandJobByCompany');
        console.log(data);
        this.dataTopHiringJob = data;
        const milestones = data.timestamps;
        this.timeJobNumJobChart = [];
        let j = 0;
        for(const time of milestones){
          j++;
          if ( j < milestones.length){
            this.timeJobNumJobChart.push({name: time, selected: false});
          } else {
            this.timeJobNumJobChart.push({name: time, selected: true});
          }
        }
        const numJob = data.result[milestones[milestones.length - 1]].numJob;
        const jobObj = data.result[milestones[milestones.length - 1]].job;
        const jobName = jobObj.map(function (el) { return el.name; })
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
            text: 'Các công việc có nhu cầu tuyển dụng lớn',
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
        const chart = new ApexCharts(document.querySelector('#nhu_cau_tuyen_dung_theo_cong_viec'), options);
        chart.render();
      });
  }
  reloadTopHiringJob(index: number){
    document.getElementById('nhu_cau_tuyen_dung_theo_cong_viec').innerHTML = '';
    const milestones = this.dataTopHiringJob.timestamps;
    const numJob = this.dataTopHiringJob.result[milestones[index]].data;
    const jobObj = this.dataTopHiringJob.result[milestones[index]].object;
    const jobName = jobObj.map(function (el) { return el.name; })
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
        text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[index],
        align: 'left'
      },
    };
    const chart = new ApexCharts(document.querySelector('#nhu_cau_tuyen_dung_theo_cong_viec'), options);
    chart.render();
  }
  showHighestSalaryJob(companyId: string) {
    document.getElementById('cong_viec_tra_luong_cao').innerHTML = '';
    this.companiesService.getHighestSalaryJobByCompany(companyId)
      .subscribe((data: any) => {
        console.log('getHighestSalaryJobByCompany');
        console.log(data);
        this.dataHighestSalaryJob = data;
        const milestones = data.timestamps;
        this.timeJobSalaryChart = [];
        let j = 0;
        for(const time of milestones){
          j++;
          if ( j < milestones.length){
            this.timeJobSalaryChart.push({name: time, selected: false});
          } else {
            this.timeJobSalaryChart.push({name: time, selected: true});
          }
        }
        const numJob = data.result[milestones[milestones.length - 1]].salary;
        const jobObj = data.result[milestones[milestones.length - 1]].job;
        const jobName = jobObj.map(function (el) { return el.name; })
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
            text: 'Các công việc có mức lương trung bình cao',
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
        const chart = new ApexCharts(document.querySelector('#cong_viec_tra_luong_cao'), options);
        chart.render();
      });
  }
  reloadHighestSalaryJob(index: number){
    document.getElementById('cong_viec_tra_luong_cao').innerHTML = '';
    const milestones = this.dataHighestSalaryJob.timestamps;
    const numJob = this.dataHighestSalaryJob.result[milestones[index]].salary;
    const jobObj = this.dataHighestSalaryJob.result[milestones[index]].job;
    const jobName = jobObj.map(function (el) { return el.name; })
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
        text: 'Các công việc có mức lương trung bình cao',
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
    const chart = new ApexCharts(document.querySelector('#cong_viec_tra_luong_cao'), options);
    chart.render();
  }

  showJobDemandByAge(companyId: string): void {
    document.getElementById('nhu-cau-viec-lam-theo-do-tuoi').innerHTML = '';
    this.companiesService.getJobDemandByAge(companyId)
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
  showJobDemandByLiteracy(companyId: string): void {
    document.getElementById('nhu-cau-viec-lam-theo-trinh-do').innerHTML = '';
    this.companiesService.getJobDemandByLiteracy(companyId)
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
}
