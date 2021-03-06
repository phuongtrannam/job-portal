import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../../markets.service';
import 'apexcharts';
import { collectExternalReferences } from '@angular/compiler';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MarketsService]
})
export class DashboardComponent implements OnInit {
  public jobsHighestHiring: any[];

  constructor(private marketsService: MarketsService) {

  }
  ngOnInit() {
    this.jobsHighestHiring = this.marketsService.getTopJobsHighestHiring();
    this.showTopJobsHiringChart(this.jobsHighestHiring);
    this.showTopJobsHiringChart1(this.jobsHighestHiring);
    this.showTopJobsHiringChart2(this.jobsHighestHiring);
    this.showTopJobsHiringChart3(this.jobsHighestHiring);
  }

  showTopJobsHiringChart(jobsHighestHiring:  Array<any>): void{
    let data = jobsHighestHiring;
    let jobNames = [];
    let numOfJobs = [];
    data.forEach(function (obj) {
      jobNames.push(obj.name);
      numOfJobs.push(obj.value);
    });
    var options = {
      series: [{
        name: 'col',
        type: 'line',
        data: numOfJobs
      }, {
        name: 'linechart',
        type: 'column',
        data: numOfJobs
      }],
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      chart: {
        type: 'line',
        height: '100px',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          // horizontal: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      yaxis: {
        show: false,
        lines: {
          show: false,
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        lines: {
          show: false,
        }
      },
      grid: {
        show: false,
      },
      
      colors: ['#36a800', '#82b440'],
      // dataLabels: {
      //   enabled: true,
      //   formatter: function (val) {
      //     return val + "công việc";
      //   },
      //   offsetY: -20,
      //   style: {
      //     fontSize: '12px',
      //     colors: ["#333"]
      //   }
      // },
      // title: {
      //   text: 'Biểu đồ top 10 công việc được tuyển dụng nhiều nhất quý IV/2019',
      //   align: 'left',
      //   style: {
      //     fontSize:  '18px',
      //     fontWeight:  'bold',
      //     fontFamily:  undefined,
      //     color:  '#263238'
      //   },
      // },
      // subtitle: {
      //   text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
      //   align: 'left'
      // },
      // xaxis: {
      //   categories: jobNames
      // },
      
    };

    var chart = new ApexCharts(document.querySelector('#so-luong-tuyen-dung'), options);
    chart.render();
  }

  showTopJobsHiringChart1(jobsHighestHiring:  Array<any>): void{
    let data = jobsHighestHiring;
    let jobNames = [];
    let numOfJobs = [];
    data.forEach(function (obj) {
      jobNames.push(obj.name);
      numOfJobs.push(obj.value);
    });
    var options = {
      series: [{
        name: 'col',
        type: 'line',
        data: numOfJobs
      }, {
        name: 'linechart',
        type: 'column',
        data: numOfJobs
      }],
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      chart: {
        type: 'line',
        height: '100px',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          // horizontal: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      yaxis: {
        show: false,
        lines: {
          show: false,
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        lines: {
          show: false,
        }
      },
      grid: {
        show: false,
      },
      
      colors: ['#36a800', '#82b440'],
    };

    var chart = new ApexCharts(document.querySelector('#so-luong-cong-ty'), options);
    chart.render();
  }
  showTopJobsHiringChart2(jobsHighestHiring:  Array<any>): void{
    let data = jobsHighestHiring;
    let jobNames = [];
    let numOfJobs = [];
    data.forEach(function (obj) {
      jobNames.push(obj.name);
      numOfJobs.push(obj.value);
    });
    var options = {
      series: [{
        name: 'col',
        type: 'line',
        data: numOfJobs
      }, {
        name: 'linechart',
        type: 'column',
        data: numOfJobs
      }],
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      chart: {
        type: 'line',
        height: '100px',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          // horizontal: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      yaxis: {
        show: false,
        lines: {
          show: false,
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        lines: {
          show: false,
        }
      },
      grid: {
        show: false,
      },
      
      colors: ['#36a800', '#82b440'],
    };

    var chart = new ApexCharts(document.querySelector('#luong-trung-binh'), options);
    chart.render();
  }
  showTopJobsHiringChart3(jobsHighestHiring:  Array<any>): void{
    let data = jobsHighestHiring;
    let jobNames = [];
    let numOfJobs = [];
    data.forEach(function (obj) {
      jobNames.push(obj.name);
      numOfJobs.push(obj.value);
    });
    var options = {
      series: [{
        name: 'col',
        type: 'line',
        data: numOfJobs
      }, {
        name: 'linechart',
        type: 'column',
        data: numOfJobs
      }],
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      chart: {
        type: 'line',
        height: '100px',
        toolbar: {
          show: false,
        },

        events: {
          // dataPointSelection: function(e, chart, opts) {
          //   console.log("Inside the dataPointSelection Event");
          // },
          
          click: function(e, chart, opts) {
              // console.log("Inside the click Event");
              window.location.replace("http://www.w3schools.com");
          }
        }
      },
      plotOptions: {
        bar: {
          // horizontal: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      yaxis: {
        show: false,
        lines: {
          show: false,
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        lines: {
          show: false,
        }
      },
      grid: {
        show: false,
      },
      
      colors: ['#36a800', '#82b440'],
    };

    var chart = new ApexCharts(document.querySelector('#tuoi-trung-binh'), options);
    chart.render();
  }
}
