
import { Component, OnInit, Input } from '@angular/core';
import { JobsService } from '../../jobs.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


declare var ApexCharts: any;
@Component({
  selector: 'app-job-analysis',
  templateUrl: './job-analysis.component.html',
  styleUrls: ['./job-analysis.component.scss'],
  providers: [JobsService]
})
export class JobAnalysisComponent implements OnInit {


  @Input() selectedCity: string;

  public quy: any = [
    {name: 'III/2019', selected: false},
    {name: 'IV/2019', selected: false},
    {name: 'I/2020', selected: false},
    {name: 'II/2020', selected: true},
  ];
  jobDemandAndAverageSalaryTable = ['timestamp', 'numJob', 'salary'];
  jobDemandAndAverageSalary = new MatTableDataSource<any>([]);

  jobDemandByAgeAndGenderTable = ['ageRange', 'male', 'female'];
  jobDemandByAgeAndGender = new MatTableDataSource<any>([]);

  jobDemandByLiteracyTable = ['literacy', 'numJob', 'growth'];
  jobDemandByLiteracy = new MatTableDataSource<any>([]);

  relatedJobs = [];


  jobID$: Observable<any>;
  selectedJobId: string;

  constructor(private jobsService: JobsService,
    private route: ActivatedRoute) {


  }
  thayDoiQuy(index) {
    this.quy.forEach(element => {
      element.selected = false;
    });
    this.quy[index].selected = true;
  }
  ngOnInit() {
    // this.showJobDemandByPeriodOfTime('J1', 'P24');
    // this.showAverageSalary('J1', 'P24');
    this.selectedJobId = this.route.snapshot.paramMap.get('id');
    console.log("idJob is: -- " + this.selectedJobId);
    this.showJobDemandAndAverageSalary(this.selectedJobId, this.selectedCity);
    this.showJobDemandByAge(this.selectedJobId, this.selectedCity);
    this.showJobDemandByLiteracy(this.selectedJobId, this.selectedCity);
    this.getRelatedJobs(this.selectedJobId);

  }


  ngOnChanges() {
    // create header using child_id
    console.log(this.selectedCity);
    // this.showJobDemandAndAverageSalary(this.selectedJobId, this.selectedCity);
    // this.showJobDemandByAge(this.selectedJobId, this.selectedCity);
    // this.showJobDemandByLiteracy(this.selectedJobId, this.selectedCity);

  }

  showJobDemandAndAverageSalary(idJob: string, idLocation: string): void {
    this.jobsService.getJobDemandByPeriodOfTime(idJob, idLocation)
      .subscribe((data: any) => {
        console.log("getJobDemandByPeriodOfTime");
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

                for (var i = 0; i < milestones.length; i++) {
                  const obj = { timestamp: '', numJob: 0, salary: 0.0, growthJob: 0.0, growthSalary: 0.0 };
                  obj.timestamp = milestones[i];
                  obj.numJob = numJob[i];
                  obj.salary = salary[i];
                  obj.growthSalary = growthSalary[i];
                  obj.growthJob = growthJob[i];
                  dataTable.push(obj);

                }
                console.log("jobDemandAndAverageSalary");
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
  showJobDemandByPeriodOfTime(idJob: string, idLocation: string): void {
    this.jobsService.getJobDemandByPeriodOfTime(idJob, idLocation)
      .subscribe((data: any) => {
        console.log("getJobDemandByPeriodOfTime");
        // console.log(data.result);
        // this.jobDemandByPeriodOfTime = data.result;
        const milestones = data.timestamp.reverse();
        const numJob = data.data.reverse();

        var options = {
          series: [{
            name: 'Việc làm',
            data: numJob
          }],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#36a800'],
          dataLabels: {
            enabled: false
          },
          labels: milestones,
          stroke: {
            curve: 'straight',
            width: [3, 0]
            // colors: []
          },
          title: {
            text: 'Nhu cầu tuyển dụng theo thời gian',
            align: 'left',
            style: {
              fontSize: '26px',
              // fontWeight:  'bold',
              // fontFamily:  undefined,
              // color:  '#263238'
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
            align: 'left'
          },
          markers: {
            size: 4,
            strokeColors: '#37933c',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: 'circle',
            radius: 2,
            colors: ['#ffffff']
          },
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
            // type: 'datetime',
            // categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z']
          },
          yaxis: [
            {
              min: Math.min(...numJob) - (Math.max(...numJob) - Math.min(...numJob)),
              max: Math.max(...numJob) + (Math.max(...numJob) - Math.min(...numJob)),
              title: {
                text: 'Việc làm',
              },
            },
          ],
          grid: {
            //   show: false
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + "";
                }
                return y;
              }
            }
          },
        };
        var chart = new ApexCharts(document.querySelector("#nhu-cau-tuyen-dung-thoi-gian"), options);
        chart.render();
      });
  }

  showAverageSalary(idJob: string, idLocation: string): void {
    this.jobsService.getAverageSalary(idJob, idLocation)
      .subscribe((data: any) => {
        console.log("getAverageSalary");
        // console.log(data.result);
        // this.jobDemandByPeriodOfTime = data.result;
        const milestones = data.timestamp.reverse();
        const salary = data.data.reverse();
        const growth = data.growth.reverse();

        var options = {
          series: [{
            name: 'Lương trung bình',
            data: salary
          }],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#37933c'],
          dataLabels: {
            enabled: false
          },
          labels: milestones,
          stroke: {
            curve: 'straight',
            width: [3, 0]
            // colors: []
          },
          title: {
            text: 'Mức lương trung bình theo thời gian',
            align: 'left',
            style: {
              fontSize: '26px',
              // fontWeight:  'bold',
              // fontFamily:  undefined,
              // color:  '#263238'
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length - 1],
            align: 'left'
          },
          markers: {
            size: 4,
            strokeColors: '#37933c',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: 'circle',
            radius: 2,
            colors: ['#ffffff']
          },
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
            // type: 'datetime',
            // categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z']
          },
          yaxis: [
            {
              min: Math.min(...salary) - (Math.max(...salary) - Math.min(...salary)),
              max: Math.max(...salary) + (Math.max(...salary) - Math.min(...salary)),
              title: {
                text: 'Việc làm',
              },
            },
          ],
          grid: {
            //   show: false
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + "triệu";
                }
                return y;
              }
            }
          },
        };
        var chart = new ApexCharts(document.querySelector("#luong-theo-thoi-gian"), options);
        chart.render();
      });
  }
  showJobDemandByAge(idJob: string, idLocation: string): void {

    this.jobsService.getJobDemandByAge(idJob, idLocation)
      .subscribe((data: any) => {
        console.log("getJobDemandByAge");
        console.log(data);
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          const ageRanges = data.ageRange;
          const male = data[milestones[milestones.length -1]].male;
          const female = data[milestones[milestones.length -1]].female;
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
          // alert("Khu vực bạn chọn không có dữ liệu về độ tuổi");
        }
      });
  }


  showJobDemandByLiteracy(idJob: string, idLocation: string): void {
    this.jobsService.getJobDemandByLiteracy(idJob, idLocation)
      .subscribe((data: any) => {
        console.log("getJobDemandByLiteracy");
        // console.log(data.result);
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          const literacies = data.literacy;
          const numJob = data[milestones[milestones.length -1]].data;
          const growth = data[milestones[milestones.length -1]].growth;
          const dataTable = [];

          for (var i = 0; i < literacies.length; i++) {
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
          // alert("Khu vực bạn chọn không có dữ liệu về trình độ học vấn");
        }
      });
  }

  getRelatedJobs(idJob: string): void {
    this.jobsService.getRelatedJobs(idJob)
      .subscribe((data: any) => {
        console.log("getJobsRelated");
        console.log(data.result.slice(4));
        this.relatedJobs = data.result.slice(4);
      });
  }

}
