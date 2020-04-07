import { Component, OnInit } from '@angular/core';
import { IndustriesService } from '../../industries.service';

@Component({
  selector: 'app-job-analysis',
  templateUrl: './job-analysis.component.html',
  styleUrls: ['./job-analysis.component.css'],
  providers: [IndustriesService]
})
export class JobAnalysisComponent implements OnInit {
  hiringTableColumns = ['name', 'value', 'growth'];
  salaryTableColumns = ['name', 'value', 'growth', 'hiring'];
  ageDistributionTableColumns = ['age', 'male', 'female'];
  hiringTableColumnsByMonth = ['timestamp', 'value', 'growth'];

  public jobDemandByAge: any[];
  public jobDemandByMonth: any[];
  public jobDemandByLiteracy: any[];
  public averageSalaryByQuarter: any[];
  

  constructor(private industriesService: IndustriesService) {

  }
  ngOnInit() {
    this.jobDemandByMonth = this.industriesService.getJobDemandByMonth();
    this.showJobDemandByMonthChart(this.jobDemandByMonth);

    this.jobDemandByAge = this.industriesService.getJobDistributionByAge();
    this.showJobDistributionByAgeChart(this.jobDemandByAge);

    this.jobDemandByLiteracy = this.industriesService.getJobDemandByLiteracy();
    this.showJobDemandByLiteracy(this.jobDemandByLiteracy);

    this.averageSalaryByQuarter = this.industriesService.getAverageSalaryByQuarter();
    this.showAverageSalaryByQuarter(this.averageSalaryByQuarter);
  }

  showJobDemandByMonthChart(jobDemandByMonth: Array<any>): void{
    // tslint:disable-next-line: no-unused-expression
    
    let data = jobDemandByMonth;
    let milestones = [];
    let numOfJobs = [];
    data.forEach(function (obj) {
      milestones.push(obj.timestamp);
      numOfJobs.push(obj.value);
    });

    var options = {
      series: [{
      name: 'Việc làm',
      type: 'line',
      data: numOfJobs
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
    labels: milestones,
    title: {
      text: 'Biểu đồ  nhu cầu tuyển dụng theo thời gian',
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
  showJobDistributionByAgeChart(jobDemandByAge: Array<any>): void{
    // tslint:disable-next-line: no-unused-expression
    let data = jobDemandByAge;
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
    colors:['#82b440', '#8dc971'],
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
  showJobDemandByLiteracy(jobDistributionByLiteracy: Array<any>): void{
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
        color: '#82b440',
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
  showAverageSalaryByQuarter(averageSalaryWageByQuarter: Array<any>): void{
    let data = averageSalaryWageByQuarter;
    let milestones = [];
    let salary = [];
    data.forEach(function (obj) {
      milestones.push(obj.timestamp);
      salary.push(obj.value);
    });

    var options = {
      series: [{
      name: 'Công ty',
      type: 'line',
      data: salary
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
    labels: milestones,
    title: {
      text: 'Biểu đồ mức lương theo thời gian',
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

    var chart = new ApexCharts(document.querySelector("#luong-theo-thoi-gian"), options);
    chart.render();
  }
}
