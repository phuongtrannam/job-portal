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


  jobDemandByPeriodOfTimeTable = ['timestamp', 'province', 'value'];
  jobDemandByLiteracyTable = ['timestamp', 'literacy', 'value'];
  jobDemandByAgeTable = ['timestamp', 'age', 'gender','value'];

  jobDemandByAge = [];
  jobDemandByAgeLastQuarter = [];
  jobDemandByPeriodOfTime = [];
  jobDemandByLiteracy = [];

  public numberOfJob: any[];
  public jobsHighestSalary: any[];



  constructor(private companiesService: CompaniesService) {

  }
  ngOnInit() {
    this.showJobDistributionByAgeChart('C188');
    // this.showJobDemandByPeriodOfTime('C188');
    // this.showJobDemandByLiteracy('C188');

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
        console.log("getJobDemandByAge");
        console.log(data.result);
        this.jobDemandByAge = data.result;
        // this.jobDemandByAgeLastQuarter = this.jobDemandByAge.slice(1,6);
        const ageRanges = [...new Set(this.jobDemandByAge.map(x => x.age))].sort();
        const milestones = [...new Set(this.jobDemandByAge.map(x => x.timestamp))];
        console.log(ageRanges);
        console.log(milestones);
        const lenMilestones = milestones.length;
        let count = 0;
        for (let j = 0; j<this.jobDemandByAge.length; j++){
          if(this.jobDemandByAge[j].timestamp === milestones[lenMilestones-1]){
            count++;
          }
        }
        this.jobDemandByAgeLastQuarter = this.jobDemandByAge.slice(this.jobDemandByAge.length - count,this.jobDemandByAge.length);
        console.log(this.jobDemandByAgeLastQuarter);

        const lenAgeRanges = ageRanges.length;
        const maleMilestone1 = Array(lenAgeRanges).fill(0);
        const femaleMilestone1 = Array(lenAgeRanges).fill(0);
        const maleMilestone2 = Array(lenAgeRanges).fill(0);
        const femaleMilestone2 = Array(lenAgeRanges).fill(0);
        const maleMilestone3 = Array(lenAgeRanges).fill(0);
        const femaleMilestone3 = Array(lenAgeRanges).fill(0);
        this.jobDemandByAge.forEach(function (obj) {
          if (obj.timestamp === milestones[lenMilestones-1]) {
            for( var i = 0; i< lenAgeRanges ; i++){
              if(obj.age === ageRanges[i]){
                if(obj.gender === "Nam"){
                  maleMilestone1[i] = parseFloat(obj.num_job);
                } else {
                  femaleMilestone1[i] = parseFloat(obj.num_job);
                }
              }
            }
          }
          if (milestones.length > 1) {
            if (obj.timestamp === milestones[lenMilestones-2]) {
              for( var i = 0; i< lenAgeRanges ; i++){
                if(obj.age === ageRanges[i]){
                  if(obj.gender === "Nam"){
                    maleMilestone2[i] = parseFloat(obj.num_job);
                  } else {
                    femaleMilestone2[i] = parseFloat(obj.num_job);
                  }
                }
              }
            }
          }
          if (milestones.length > 2) {
            if (obj.timestamp === milestones[lenMilestones-3]) {
              for( var i = 0; i< lenAgeRanges ; i++){
                if(obj.age === ageRanges[i]){
                  if(obj.gender === "Nam"){
                    maleMilestone3[i] = parseFloat(obj.num_job);
                  } else {
                    femaleMilestone3[i] = parseFloat(obj.num_job);
                  }
                }
              }
            }
          }
        });

        var options = {
          series: [{
            name: ' Nam',
            data: maleMilestone1
          }, {
            name: 'Nữ',
            data: femaleMilestone1
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
          colors: ['#82b440', '#8dc971'],
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
    
        var chart = new ApexCharts(document.querySelector("#nhu-cau-viec-lam-theo-do-tuoi"), options);
        chart.render();

      });
  }
  showJobDemandByPeriodOfTime(idCompany: string): void {

    this.companiesService.getJobDemandByPeriodOfTime(idCompany)
      .subscribe((data: any) => {
        console.log("getJobDemandByPeriodOfTime");
        console.log(data.result);
        this.jobDemandByPeriodOfTime = data.result;
        const distinctProvinces = [...new Set(this.jobDemandByPeriodOfTime.map(x => x.province))];
        const milestones = [...new Set(this.jobDemandByPeriodOfTime.map(x => x.timestamp))];
        // const grouped = this.groupBy(this.jobDemandByPeriodOfTime, x => x.province);
        console.log(distinctProvinces);
        console.log(milestones);

        const len = milestones.length;
        const province1 = Array(len).fill(0);
        const province2 = Array(len).fill(0);
        const province3 = Array(len).fill(0);
        this.jobDemandByPeriodOfTime.forEach(function (obj) {
          if (obj.province === distinctProvinces[0]) {
            for( let i = 0; i < len ; i++){
              if (obj.timestamp === milestones[i]) {
                province1[i] = parseFloat(obj.num_job);
              }
            }
          }
          if (distinctProvinces.length > 1) {
            if (obj.province === distinctProvinces[1]) {
              for( let i = 0; i < len ; i++){
                if (obj.timestamp === milestones[i]) {
                  province2[i] = parseFloat(obj.num_job);
                }
              }
            }
          }
          if (distinctProvinces.length > 2) {
            if (obj.province === distinctProvinces[2]) {
              for( let i = 0; i < len ; i++){
                if (obj.timestamp === milestones[i]) {
                  province3[i] = parseFloat(obj.num_job);
                }
              }
            }
          }
        });


        var options = {
          series: [{
            name: distinctProvinces[0],
            type: 'line',
            data: province1
          }, {
            name: distinctProvinces[1],
            type: 'line',
            data: province2
          }, {
            name: distinctProvinces[2],
            type: 'line',
            data: province3
          }],
          chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            curve: 'smooth'
          },
          fill: {
            type: 'solid',
            opacity: [0.35, 1],
          },
          labels: milestones,
          title: {
            text: 'Biểu đồ nhu cầu tuyển dụng tại các thành phố lớn theo thời gian',
            align: 'left'
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[milestones.length-1],
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
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " Việc làm";
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
      });



  }
  showJobDemandByLiteracy(idCompany: string): void {
    this.companiesService.getJobDemandByLiteracy(idCompany)
      .subscribe((data: any) => {
        console.log("getJobDemandByLiteracy");
        console.log(data.result);
        this.jobDemandByLiteracy = data.result;

        const distinctLiteracies = [...new Set(this.jobDemandByLiteracy.map(x => x.literacy))];
        const milestones = [...new Set(this.jobDemandByLiteracy.map(x => x.timestamp))];
        // const grouped = this.groupBy(this.jobDemandByPeriodOfTime, x => x.province);
        console.log(distinctLiteracies);
        console.log(milestones);
        const lenMilestones = milestones.length;
        const len = distinctLiteracies.length;
        const milestone1 = Array(len).fill(0);
        const milestone2 = Array(len).fill(0);
        const milestone3 = Array(len).fill(0);
        this.jobDemandByLiteracy.forEach(function (obj) {
          if (obj.timestamp === milestones[lenMilestones-1]) {
            for( var i = 0; i< len ; i++){
              if(obj.literacy === distinctLiteracies[i]){
                milestone1[i] = parseFloat(obj.num_job)
              }
            }
          }
          if (lenMilestones > 1) {
            if (obj.timestamp === milestones[lenMilestones-2]) {
              for( var i = 0; i< len ; i++){
                if(obj.literacy === distinctLiteracies[i]){
                  milestone2[i] = parseFloat(obj.num_job)
                }
              }
            }
          }
          if (lenMilestones > 2) {
            if (obj.timestamp === milestones[lenMilestones-3]) {
              for( var i = 0; i< len ; i++){
                if(obj.literacy === distinctLiteracies[i]){
                  milestone3[i] = parseFloat(obj.num_job)
                }
              }
            }
          }
        });
        
        var options = {
          series: milestone1,
          chart: {
            width: '100%',
            height: 350,
            type: 'pie',
          },
          labels: distinctLiteracies,
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
              fontSize: '18px',
              fontWeight: 'bold',
              fontFamily: undefined,
              color: '#263238'
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[lenMilestones-1],
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
      });

  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
