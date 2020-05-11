import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MarketsService } from '../../markets.service';
import 'apexcharts';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-market-chart',
  templateUrl: './market-chart.component.html',
  styleUrls: ['./market-chart.component.css'],
  providers: [MarketsService]
})
export class MarketChartComponent implements OnInit {
  salaryTableColumns = ['name', 'value', 'growth', 'hiring'];
  hiringTableColumns = ['name', 'value', 'growth'];
  hiringByCityTableColumns = ['timestamp', 'hn', 'dn', 'hcm'];
  ageDistributionTableColumns = ['age', 'male', 'female'];
  areas = new FormControl();
  areaList = ['Hà Nội', 'TP Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Bắc Ninh', 'Bình Dương'];

  public jobsHighestSalary: any[];
  public jobsHighestHiring: any[];
  public topHiringCompany: any[];
  public jobDistributionByAge: any[];
  public jobDistributionByLiteracy: any[];
  public jobDistributionByIndustry: any[];
  public jobDistributionByMonth: any[];
  public averageWageByMonthChart: any[];
  public averageWageByIndustry: any[];


  constructor(private marketsService: MarketsService, private pageScrollService: PageScrollService) {
    // PageScrollConfig.defaultScrollOffset = 200;
    // PageScrollConfig.defaultDuration = 250;
  }
  ngOnInit() {
    this.jobsHighestSalary = this.marketsService.getListJobsHighestSalary();
    this.jobsHighestHiring = this.marketsService.getTopJobsHighestHiring();
    this.topHiringCompany = this.marketsService.getTopHiringCompany();
    this.jobDistributionByAge = this.marketsService.getJobDistributionByAge();
    this.jobDistributionByLiteracy = this.marketsService.getJobDistributionByLiteracy();
    this.jobDistributionByIndustry = this.marketsService.getJobDistributionByIndustry();
    this.jobDistributionByMonth = this.marketsService.getJobDistributionByMonth();
    this.averageWageByIndustry = this.marketsService.getAverageWageByIndustry();
    this.averageWageByMonthChart = this.marketsService.getJobDistributionByMonth();

    this.showJobsHighestSalaryChart(this.jobsHighestSalary);
    this.showTopJobsHiringChart(this.jobsHighestHiring);
    this.showTopHiringCompanyChart(this.topHiringCompany);
    this.showAverageWageByIndustryChart(this.averageWageByIndustry);
    this.showJobDistributionByIndustryChart(this.jobDistributionByIndustry);
    this.showJobDistributionByAgeChart(this.jobDistributionByAge);
    this.showJobDistributionByMonthChart(this.jobDistributionByMonth);
    this.showAverageWageByMonthChart(this.averageWageByMonthChart);
    this.showJobDistributionByLiteracy(this.jobDistributionByLiteracy);
  }
  showJobsHighestSalaryChart(jobsHighestSalary:  Array<any>): void {
    let data = jobsHighestSalary;
    let jobNames = [];
    let salary = [];
    data.forEach(function (obj) {
      jobNames.push(obj.name);
      salary.push(obj.value);
    });
    var options = {
      series: [{
        data: salary
      }],
      chart: {
        type: 'bar',
        height: 'auto'
      },
      plotOptions: {
        bar: {
          // horizontal: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      colors: ['#36a800', '#545454'],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "triệu";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#333"]
        }
      },
      title: {
        text: 'Biểu đồ top 10 công việc được trả lương cao nhất quý IV/2019',
        align: 'left',
        style: {
          fontSize:  '18px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
        align: 'left'
      },
      xaxis: {
        categories: jobNames
      }
    };

    var chart = new ApexCharts(document.querySelector('#cong-viec-duoc-tra-luong-cao-nhat'), options);
    chart.render();
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
        data: numOfJobs
      }],
      chart: {
        type: 'bar',
        height: 'auto'
      },
      plotOptions: {
        bar: {
          // horizontal: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      colors: ['#36a800', '#545454'],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "công việc";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#333"]
        }
      },
      title: {
        text: 'Biểu đồ top 10 công việc được tuyển dụng nhiều nhất quý IV/2019',
        align: 'left',
        style: {
          fontSize:  '18px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
        align: 'left'
      },
      xaxis: {
        categories: jobNames
      },
      
    };

    var chart = new ApexCharts(document.querySelector('#cong-viec-duoc-tuyen-dung-nhieu-nhat'), options);
    chart.render();
  }
  

  showTopHiringCompanyChart(topHiringCompany:  Array<any>): void{
    let data = topHiringCompany;
    let companyNames = [];
    let numOfJobs = [];
    data.forEach(function (obj) {
      companyNames.push(obj.name);
      numOfJobs.push(obj.value);
    });
    var options = {
      series: [{
        data: numOfJobs
      }],
      chart: {
        type: 'bar',
        height: 'auto'
      },
      plotOptions: {
        bar: {
          // horizontal: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      colors: ['#36a800', '#545454'],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "công việc";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#333"]
        }
      },
      title: {
        text: 'Biểu đồ top 10 công ty tuyển dụng nhiều nhất quý IV/2019',
        align: 'left',
        style: {
          fontSize:  '18px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
        align: 'left'
      },
      xaxis: {
        categories: companyNames
      }
    };

    var chart = new ApexCharts(document.querySelector('#cong-ty-tuyen-dung-nhieu-nhat'), options);
    chart.render();
  }
  
  showAverageWageByIndustryChart(averageWageByIndustry:  Array<any>): void{
    // tslint:disable-next-line: no-unused-expression
    let data = averageWageByIndustry;
    let jobNames = [];
    let salaryAverage = [];
    data.forEach(function(obj){
      jobNames.push(obj.name);
      salaryAverage.push(obj.value);
    });

    var options = {
      series: [{
        data: salaryAverage
      }],
      chart: {
        type: 'bar',
        height: 'auto'
      },
      plotOptions: {
        bar: {
          // horizontal: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      colors: ['#36a800', '#545454'],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "triệu";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#333"]
        }
      },
      title: {
        text: 'Biểu đồ mức luong trung bình theo ngành quý IV/2019',
        align: 'left',
        style: {
          fontSize:  '18px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
        align: 'left'
      },
      xaxis: {
        categories: jobNames
      },
      legend: {
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector('#muc-luong-theo-nganh'), options);
    chart.render();
  }

  showJobDistributionByAgeChart(jobDistributionByAge:  Array<any>): void{
    // tslint:disable-next-line: no-unused-expression
    let data = jobDistributionByAge;
    let ageRange = [];
    let maleValues = [];
    let femaleValues = [];
    data.forEach(function(obj){
      ageRange.push(obj.name);
      maleValues.push(obj.series[0].value);
      femaleValues.push(obj.series[1].value);
    });
    // "#caf270", "#45c490", "#008d93", "#2e5468",
    var options = {
      series: [{
      name: ' Nam',
      data: maleValues
    }, {
      name: 'Nữ',
      data: femaleValues
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
    colors:['#36a800', '#8dc971'],
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
        horizontal: false,
      },
    },
    xaxis: {
      // type: 'datetime',
      categories: ageRange,
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
    };

    var chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-do-tuoi"), options);
    chart.render();
  }

  showJobDistributionByIndustryChart(jobDistributionByIndustry:  Array<any>): void{
    // tslint:disable-next-line: no-unused-expression
    let data = jobDistributionByIndustry;
    let industries = [];
    let numberOfJobs = [];
    data.forEach(function(obj){
      industries.push(obj.name);
      numberOfJobs.push(obj.value);
    });
    var options = {
      series: numberOfJobs,
      chart: {
        width: '100%',
        height: 350,
        type: 'pie',
        events: {
          dataPointSelection: function(event, chartContext, config) {
            console.log( config.dataPointIndex);
          },
          click: function(e, chart, opts) {
            // console.log("Inside the click Event");
            window.location.href = "industries/job-category/education-training";
          }
        }
      },
    labels: industries,
    theme: {
      palette: 'palette2',
      monochrome: {
        enabled: true,
        color: '#36a800',
      }
    },
    title: {
      text: "Biểu đồ phân bổ việc làm theo ngành nghề",
      align: 'left',
      style: {
        fontSize:  '18px',
        fontWeight:  'bold',
        fontFamily:  undefined,
        color:  '#263238'
      },
    },
    subtitle: {
      text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
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

    var chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-nganh"), options);
    chart.render();
  }

  showJobDistributionByMonthChart(jobDistributionByMonth:  Array<any>): void{
    // tslint:disable-next-line: no-unused-expression
    let data = jobDistributionByMonth;
    let milestones = [];
    let hn = [];
    let dn = [];
    let hcm = [];
    // Khi ko biết trước có bao nhiêu dataset
    // https://stackoverflow.com/questions/26397009/how-to-create-datasets-dynamically-for-chart-js-line-chart
    data.forEach(function(obj){
      milestones.push(obj.timestamp);

      hn.push(obj.hn);
      dn.push(obj.dn);
      hcm.push(obj.hcm);
    });
    var options = {
      series: [{
      name: 'Hà Nội',
      type: 'line',
      data: hn
    }, {
      name: 'Thành phố Hồ Chí Minh',
      type: 'line',
      data: hcm
    }, {
      name: 'Đà Nẵng',
      type: 'line',
      data: dn
    }],
      chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type:'solid',
      opacity: [0.35, 1],
    },
    labels: ['QI/2018','QII/2018','QIII/2018','QIV/2018','QI/2019','QII/2019','QIII/2019','QIV/2019'],
    title: {
      text: 'Biểu đồ so sánh nhu cầu tuyển dụng các thành phố lớn theo thời gian',
      align: 'left'
    },
    subtitle: {
      text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
      align: 'left'
    },
    markers: {
      size: 0
    },
    yaxis: [
      {
        title: {
          text: 'Việc làm',
        },
      },
      // {
      //   opposite: true,
      //   title: {
      //     text: 'Series B',
      //   },
      // },
    ],
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return  y.toFixed(0) + " Việc làm";
          }
          return y;
        }
      }
    },
    legend: {
      position: 'top'
    }
    };

    var chart = new ApexCharts(document.querySelector("#nhu-cau-tuyen-dung-thoi-gian"), options);
    chart.render();
  }
  showAverageWageByMonthChart(averageWageByMonthChart:  Array<any>): void{
    // tslint:disable-next-line: no-unused-expression
    let data = averageWageByMonthChart;
    let milestones = [];
    let hn = [];
    let dn = [];
    let hcm = [];
    // Khi ko biết trước có bao nhiêu dataset
    // https://stackoverflow.com/questions/26397009/how-to-create-datasets-dynamically-for-chart-js-line-chart
    data.forEach(function(obj){
      milestones.push(obj.timestamp);

      hn.push(obj.hn);
      dn.push(obj.dn);
      hcm.push(obj.hcm);
    });
    var options = {
      series: [{
      name: 'Hà Nội',
      type: 'line',
      data: hn
    }, {
      name: 'Thành phố Hồ Chí Minh',
      type: 'line',
      data: hcm
    }, {
      name: 'Đà Nẵng',
      type: 'line',
      data: dn
    }],
      chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type:'solid',
      opacity: [0.35, 1],
    },
    labels: ['QI/2018','QII/2018','QIII/2018','QIV/2018','QI/2019','QII/2019','QIII/2019','QIV/2019'],
    title: {
      text: 'Biểu đồ so sánh mức lương trung bình các thành phố lớn theo thời gian',
      align: 'left'
    },
    subtitle: {
      text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
      align: 'left'
    },
    markers: {
      size: 0
    },
    yaxis: [
      {
        title: {
          text: 'Lương (triệu)',
        },
      },
      // {
      //   opposite: true,
      //   title: {
      //     text: 'Series B',
      //   },
      // },
    ],
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return  y.toFixed(0) + " triệu";
          }
          return y;
        }
      }
    },
    legend: {
      position: 'top'
    }
    };

    var chart = new ApexCharts(document.querySelector("#luong-theo-thoi-gian"), options);
    chart.render();
  }
  showJobDistributionByLiteracy(jobDistributionByLiteracy: Array<any>): void{
    let data = jobDistributionByLiteracy;
    let literacies = [];
    let numberOfJobs = [];
    // https://stackoverflow.com/questions/26397009/how-to-create-datasets-dynamically-for-chart-js-line-chart
    data.forEach(function(obj){
      literacies.push(obj.name);
      numberOfJobs.push(obj.value);
    });
    var options = {
      series: numberOfJobs,
      chart: {
        width: '100%',
        height: 350,
        type: 'pie',
      },
    labels: literacies,
    theme: {
      palette: 'palette2',
      monochrome: {
        enabled: true,
        color: '#36a800',
      }
    },
    
    title: {
      text: "Biểu đồ phân bổ việc làm theo trình độ học vấn",
      align: 'left',
      style: {
        fontSize:  '18px',
        fontWeight:  'bold',
        fontFamily:  undefined,
        color:  '#263238'
      },
    },
    subtitle: {
      text: 'Dữ liệu cập nhật lần cuối quý IV/2019',
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

    var chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-trinh-do"), options);
    chart.render();
  }
  showTopSkillChart(): void{
    
  }

  showSalaryChart(): void {
    
  }
}
