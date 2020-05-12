import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
@Component({
  selector: 'app-company-hiring',
  templateUrl: './company-hiring.component.html',
  styleUrls: ['./company-hiring.component.css'],
  providers: [CompaniesService]
})
export class CompanyHiringComponent implements OnInit {
  hiringTableColumns = ['name', 'value', 'growth'];
  salaryTableColumns = ['name', 'value', 'growth', 'hiring'];
  ageDistributionTableColumns = ['age', 'male', 'female'];
  hiringTableColumnsByMonth = ['timestamp', 'value', 'growth'];

  jobDemandByAge = [];
  jobDemandByPeriodOfTime = [];
  jobDemandByLiteracy = [];

  public numberOfJob: any[];
  public jobsHighestSalary: any[];



  constructor(private companiesService: CompaniesService) {

  }
  ngOnInit() {
    // this.showJobDistributionByAgeChart('C188');
    // this.showJobDemandByPeriodOfTime('C188');
    this.showJobDemandByLiteracy('C188');
    


  }
  // showRecruitmentDemandChart(idCompany: string): void {
  //   let data = numberOfJob;
  //   let jobNames = [];
  //   let numOfJobs = [];
  //   data.forEach(function (obj) {
  //     jobNames.push(obj.name);
  //     numOfJobs.push(obj.value);
  //   });
  //   var options = {
  //     series: [{
  //       data: numOfJobs
  //     }],
  //     chart: {
  //       type: 'bar',
  //       height: 'auto'
  //     },
  //     plotOptions: {
  //       bar: {
  //         // horizontal: true,
  //         dataLabels: {
  //           position: 'top', // top, center, bottom
  //         },
  //       }
  //     },
  //     colors: ['#82b440', '#545454'],
  //     dataLabels: {
  //       enabled: true,
  //       formatter: function (val) {
  //         return val + "công việc";
  //       },
  //       offsetY: -20,
  //       style: {
  //         fontSize: '12px',
  //         colors: ["#333"]
  //       }
  //     },
  //     title: {
  //       text: 'Biểu đồ top 10 công việc được tuyển dụng nhiều nhất quý IV/2019',
  //       align: 'left',
  //       style: {
  //         fontSize: '18px',
  //         fontWeight: 'bold',
  //         fontFamily: undefined,
  //         color: '#263238'
  //       },
  //     },
  //     subtitle: {
  //       text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
  //       align: 'left'
  //     },
  //     xaxis: {
  //       categories: jobNames
  //     },

  //   };

  //   var chart = new ApexCharts(document.querySelector('#nhu-cau-tuyen-dung-theo-cong-viec'), options);
  //   chart.render();
  // }
  // showJobsHighestSalaryChart(idCompany: string): void {
  //   let data = jobsHighestSalary;
  //   let jobNames = [];
  //   let salary = [];
  //   data.forEach(function (obj) {
  //     jobNames.push(obj.name);
  //     salary.push(obj.value);
  //   });
  //   var options = {
  //     series: [{
  //       data: salary
  //     }],
  //     chart: {
  //       type: 'bar',
  //       height: 'auto'
  //     },
  //     plotOptions: {
  //       bar: {
  //         // horizontal: true,
  //         dataLabels: {
  //           position: 'top', // top, center, bottom
  //         },
  //       }
  //     },
  //     colors: ['#82b440', '#545454'],
  //     dataLabels: {
  //       enabled: true,
  //       formatter: function (val) {
  //         return val + "triệu";
  //       },
  //       offsetY: -20,
  //       style: {
  //         fontSize: '12px',
  //         colors: ["#333"]
  //       }
  //     },
  //     title: {
  //       text: 'Biểu đồ top 10 công việc được trả lương cao nhất quý IV/2019',
  //       align: 'left',
  //       style: {
  //         fontSize: '18px',
  //         fontWeight: 'bold',
  //         fontFamily: undefined,
  //         color: '#263238'
  //       },
  //     },
  //     subtitle: {
  //       text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
  //       align: 'left'
  //     },
  //     xaxis: {
  //       categories: jobNames
  //     }
  //   };

  //   var chart = new ApexCharts(document.querySelector('#cong-viec-duoc-tra-luong-cao-nhat'), options);
  //   chart.render();
  // }
  showJobDistributionByAgeChart(idCompany: string): void {

    this.companiesService.getJobDemandByAge(idCompany)
      .subscribe((data: any) => {
        console.log("getRecentJobsByCompany");
        console.log(data.result);
        this.jobDemandByAge = data.result;
      });
    // tslint:disable-next-line: no-unused-expression
    // let data = jobDemandByAge;
    // let ageRange = [];
    // let maleValues = [];
    // let femaleValues = [];
    // data.forEach(function (obj) {
    //   ageRange.push(obj.name);
    //   maleValues.push(obj.series[0].value);
    //   femaleValues.push(obj.series[1].value);
    // });
    // // "#caf270", "#45c490", "#008d93", "#2e5468",
    // var options = {
    //   series: [{
    //     name: ' Nam',
    //     data: maleValues
    //   }, {
    //     name: 'Nữ',
    //     data: femaleValues
    //   }],
    //   chart: {
    //     type: 'bar',
    //     height: 350,
    //     stacked: true,
    //     toolbar: {
    //       show: true
    //     },
    //     zoom: {
    //       enabled: true
    //     }
    //   },
    //   colors: ['#82b440', '#8dc971'],
    //   responsive: [{
    //     breakpoint: 480,
    //     options: {
    //       legend: {
    //         position: 'bottom',
    //         offsetX: -10,
    //         offsetY: 0
    //       }
    //     }
    //   }],
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //     },
    //   },
    //   xaxis: {
    //     // type: 'datetime',
    //     categories: ageRange,
    //   },
    //   legend: {
    //     position: 'right',
    //     offsetY: 40
    //   },
    //   fill: {
    //     opacity: 1
    //   }
    // };

    // var chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-do-tuoi"), options);
    // chart.render();
  }
  showJobDemandByPeriodOfTime(idCompany: string): void {

    this.companiesService.getJobDemandByPeriodOfTime(idCompany)
      .subscribe((data: any) => {
        console.log("getJobDemandByPeriodOfTime");
        console.log(data.result);
        this.jobDemandByPeriodOfTime = data.result;
      });

    // tslint:disable-next-line: no-unused-expression

    // let data = jobDemandByMonth;
    // let milestones = [];
    // let numOfJobs = [];
    // data.forEach(function (obj) {
    //   milestones.push(obj.timestamp);
    //   numOfJobs.push(obj.value);
    // });

    // var options = {
    //   series: [{
    //     name: 'Công ty',
    //     type: 'line',
    //     data: numOfJobs
    //   }],
    //   chart: {
    //     height: 350,
    //     type: 'line',
    //   },
    //   stroke: {
    //     curve: 'smooth'
    //   },
    //   fill: {
    //     type: 'solid',
    //     opacity: [0.35, 1],
    //   },
    //   labels: milestones,
    //   title: {
    //     text: 'Biểu đồ  nhu cầu tuyển dụng của công ty theo thời gian',
    //     align: 'left'
    //   },
    //   subtitle: {
    //     text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
    //     align: 'left'
    //   },
    //   markers: {
    //     size: 0
    //   },
    //   yaxis: [
    //     {
    //       title: {
    //         text: 'Việc làm',
    //       },
    //     },
    //     // {
    //     //   opposite: true,
    //     //   title: {
    //     //     text: 'Series B',
    //     //   },
    //     // },
    //   ],
    //   grid: {
    //     row: {
    //       colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
    //       opacity: 0.5
    //     },
    //   },
    //   tooltip: {
    //     shared: true,
    //     intersect: false,
    //     y: {
    //       formatter: function (y) {
    //         if (typeof y !== "undefined") {
    //           return y.toFixed(0) + " Việc làm";
    //         }
    //         return y;
    //       }
    //     }
    //   },
    //   legend: {
    //     position: 'top'
    //   }
    // };

    // var chart = new ApexCharts(document.querySelector("#nhu-cau-tuyen-dung-thoi-gian"), options);
    // chart.render();
  }
  showJobDemandByLiteracy(idCompany: string): void {
    this.companiesService.getJobDemandByLiteracy(idCompany)
      .subscribe((data: any) => {
        console.log("getJobDemandByLiteracy");
        console.log(data.result);
        this.jobDemandByLiteracy = data.result;
      });
    // let data = jobDistributionByLiteracy;
    // let literacies = [];
    // let numberOfJobs = [];
    // // https://stackoverflow.com/questions/26397009/how-to-create-datasets-dynamically-for-chart-js-line-chart
    // data.forEach(function (obj) {
    //   literacies.push(obj.name);
    //   numberOfJobs.push(obj.value);
    // });
    // var options = {
    //   series: numberOfJobs,
    //   chart: {
    //     width: '100%',
    //     height: 350,
    //     type: 'pie',
    //   },
    //   labels: literacies,
    //   theme: {
    //     palette: 'palette2',
    //     monochrome: {
    //       enabled: true,
    //       color: '#82b440',
    //     }
    //   },

    //   title: {
    //     text: "Biểu đồ phân bổ việc làm theo trình độ học vấn",
    //     align: 'left',
    //     style: {
    //       fontSize: '18px',
    //       fontWeight: 'bold',
    //       fontFamily: undefined,
    //       color: '#263238'
    //     },
    //   },
    //   subtitle: {
    //     text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
    //     align: 'left'
    //   },
    //   responsive: [{
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200
    //       },
    //       legend: {
    //         position: 'bottom'
    //       }
    //     }
    //   }]
    // };

    // var chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-trinh-do"), options);
    // chart.render();
  }
}
