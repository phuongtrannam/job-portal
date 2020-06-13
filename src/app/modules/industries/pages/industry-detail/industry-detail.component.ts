import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, OnInit, Input } from '@angular/core';
import { IndustriesService } from '../../industries.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { JobsService } from '../../../jobs/jobs.service';
declare var ApexCharts: any;
export interface City {
  name: string;
  id: string;
  // area: string;
}
@Component({
  selector: 'app-industry-detail',
  templateUrl: './industry-detail.component.html',
  styleUrls: ['./industry-detail.component.scss'],
  providers: [IndustriesService, JobsService]
})
export class IndustryDetailComponent {
  public congtylon_linhvuc = [
    { name: 'Viettel', soluong: 10, vitri: 'Hanoi', imgsrc: 'https://thietkelogo.vn/wp-content/uploads/2015/12/viettel.png' },
    { name: 'Misa', soluong: 20, vitri: 'Sài Gòn', imgsrc: 'https://upload.wikimedia.org/wikipedia/vi/1/11/Logo_MISA.jpg' },
    { name: 'Gear.Inc', soluong: 15, vitri: 'Hanoi', imgsrc: 'https://cdn.itviec.com/employers/gear-inc/logo/w170/5FJEvYXV6fCJt46bYY6ccgD2/gear-inc-logo.png' },
    { name: 'BKAV', soluong: 12, vitri: 'Đà Nẵng', imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Bkav_logo.jpg' }
  ];


  topCompanies = [];

  jobDemandByIndustryTable = ['timestamp', 'numJob', 'growth'];
  jobDemandByIndustry = new MatTableDataSource<any>([]);

  jobDemandByAgeAndGenderTable = ['ageRange', 'male', 'female'];
  jobDemandByAgeAndGender = new MatTableDataSource<any>([]);

  jobDemandByLiteracyTable = ['literacy', 'numJob', 'growth'];
  jobDemandByLiteracy = new MatTableDataSource<any>([]);

  jobID$: Observable<any>;
  selectedIndustryId: string;

  selectedCity = 'P0';
  control = new FormControl();
  cityList: City[] = [{ id: '1', name: 'Champs-Élysées' },
  { id: '2', name: 'Lombard Street' },
  { id: '3', name: 'Abbey Road' },
  { id: '4', name: 'Fifth Avenue' }];
  filteredOptions: Observable<City[]>;
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
    // console.log(this.selectedCity);
  }

  getCityList(): void {
    this.jobsService.getCityList()
      .subscribe((data: any) => {
        console.log("getCityList");
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

  constructor(private industriesService: IndustriesService,
              private jobsService: JobsService,
              private route: ActivatedRoute) {
    this.selectedIndustryId = this.route.snapshot.paramMap.get('id');
    console.log(this.selectedIndustryId + 'this.selectedIndustryId')
  }

  ngOnInit() {
    this.getCityList();
    this.getTopCompanies(this.selectedIndustryId, this.selectedCity);
    this.showJobDemandByPeriodOfTime(this.selectedIndustryId, this.selectedCity);
    this.showTopHiringCompany(this.selectedIndustryId, this.selectedCity);
    this.showTopHiringJob(this.selectedIndustryId, this.selectedCity);
    this.showHighestSalaryJob(this.selectedIndustryId, this.selectedCity);
    this.showJobDemandByAge(this.selectedIndustryId, this.selectedCity);
    this.showJobDemandByLiteracy(this.selectedIndustryId, this.selectedCity);

    // this.showDotuoiGioitinh();
    // this.showTrinhdoHocvan();
    // this.showNhuCauTuyenDungTheoLinhVuc();
    // // new ApexCharts(document.querySelector('#chart-do-tuoi-trung-binh'), chartDoTuoiTrungBinh).render();
    // this.showNhuCauKVC();

    // this.showDanhSachNhuCtyTheoQuy();
  }

  getTopCompanies(industryId: string, idProvince: string): void {
    this.industriesService.getTopCompanies(industryId, idProvince)
      .subscribe((data: any) => {
        console.log('getTopCompanies');
        console.log(data.result);
        this.topCompanies = data.result;
      });
  }


  showJobDemandByPeriodOfTime(idIndustry: string, idLocation: string) {
    this.industriesService.getJobDemandByPeriodOfTime(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log("getJobDemandByPeriodOfTime");
        console.log(data);
        const milestones = data["timestamps"];
        let numJob = [];
        let growthJob = [];
        let regionName = [];
        if(this.selectedCity === 'P0'){
          numJob = data['ALL'].data;
          growthJob = data['ALL'].growth;
          regionName = data['ALL'].name;
        }else{
          numJob = data[this.selectedIndustryId].data;
          growthJob = data[this.selectedIndustryId].growth;
          regionName = data[this.selectedIndustryId].name;
        }
        const dataTable = [];
        for (let i = 0; i < milestones.length; i++) {
          const obj = { timestamp: '', numJob: 0, growth: 0.0 };
          obj.timestamp = milestones[i];
          obj.numJob = numJob[i];
          obj.growth = growthJob[i];
          dataTable.push(obj);
        }
        console.log(dataTable);
        this.jobDemandByIndustry.data = dataTable;

        const options = {
          series: [{
            name: 'Số lượng công việc',
            type: 'line',
            data: numJob
          }],
          title: {
            text: 'Nhu cầu việc làm theo thời gian tại ' + regionName,
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
          chart: {
            height: 350,
            type: 'line',
            fontFamily: 'Helvetica, Arial, sans-serif',
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: val => {
              return val + 'việc làm';
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
                position: 'top', // top, center, bottom
              },
              colors: {
                ranges: [{
                  from: 0,
                  to: 1000000000,
                  color: '#37933c'
                }],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
              },
            }
          },
          xaxis: {
            categories: milestones,
            position: 'bot',
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: true,
              formatter: val => {
                return val + '';
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            }
          },

          fill: {
            color: "#37933c"
          },


        };
        let chart = new ApexCharts(document.querySelector("#chart_nhu_cau_tuyen_dung"), options);
        chart.render();
      });



  }

  showTopHiringCompany(idIndustry: string, idLocation: string) {
    this.industriesService.getTopHiringCompany(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log("getTopHiringCompany");
        console.log(data);
        const milestones = data['timestamps'];
        const numJob = data[milestones[milestones.length - 1]].data;
        const companyObj = data[milestones[milestones.length - 1]].company;
        const companyName = companyObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Số lượng công việc',
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
            categories: companyName,
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
            text: 'Các công ty có nhu cầu tuyển dụng lớn',
            align: 'left',
            style: {
              fontSize: '18px',
              fontFamily: 'Nunito, Arial, sans-serif',
              fontWeight: '600',
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[-1],
            align: 'left'
          },
        };
        const chart = new ApexCharts(document.querySelector('#nhu-cau_tuyen_dung_theo_cong_ty'), options);
        chart.render();
      });
  }
  showTopHiringJob(idIndustry: string, idLocation: string) {
    this.industriesService.getTopHiringJob(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log("getTopHiringJob");
        console.log(data);
        const milestones = data['timestamps'];
        const numJob = data[milestones[milestones.length - 1]].data;
        const jobObj = data[milestones[milestones.length - 1]].job;
        const jobName = jobObj.map(function (el) { return el.name; })
        const options = {
          series: [{
            name: 'Số lượng công việc',
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
                  to: 100000000,
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
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[-1],
            align: 'left'
          },
        };
        const chart = new ApexCharts(document.querySelector('#nhu-cau_tuyen_dung_theo_cong_viec'), options);
        chart.render();
      });
  }

  showHighestSalaryJob(idIndustry: string, idLocation: string) {
    this.industriesService.getHighestSalaryJob(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log("getHighestSalaryJob");
        console.log(data);
        const milestones = data['timestamps'];
        const numJob = data[milestones[milestones.length - 1]].data;
        const jobObj = data[milestones[milestones.length - 1]].job;
        const jobName = jobObj.map(function (el) { return el.name; });


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
                  to: 1000000000,
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
            text: 'Các vị trí công việc có mức lương trung bình cao',
            align: 'left',
            style: {
              fontSize: '18px',
              fontFamily: 'Nunito, Arial, sans-serif',
              fontWeight: '600',
            },
          },
          subtitle: {
            text: 'Dữ liệu cập nhật lần cuối quý ' + milestones[-1],
            align: 'left'
          },
        };
        const chart = new ApexCharts(document.querySelector('#viec_duoc_tra_luong_cao'), options);
        chart.render();
      });
  }

  showJobDemandByAge(idIndustry: string, idLocation: string): void {

    this.industriesService.getJobDemandByAge(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log("getJobDemandByAge");
        console.log(data);
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          const ageRanges = data.ageRange;
          const male = data[milestones[milestones.length - 1]].male;
          const female = data[milestones[milestones.length - 1]].female;
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
          alert("Khu vực bạn chọn không có dữ liệu về độ tuổi");
        }
      });
  }


  showJobDemandByLiteracy(idIndustry: string, idLocation: string): void {
    this.industriesService.getJobDemandByLiteracy(idIndustry, idLocation)
      .subscribe((data: any) => {
        console.log("getJobDemandByLiteracy");
        console.log(data);
        if (Object.keys(data).length > 2) {
          const milestones = data.timestamps;
          const literacies = data.literacy;
          const literacyObj = data.literacy;
          const literacyName = literacyObj.map(function (el) { return el.name; })

          const numJob = data[milestones[milestones.length - 1]].data;
          const growth = data[milestones[milestones.length - 1]].growth;
          const dataTable = [];

          for (var i = 0; i < literacies.length; i++) {
            const obj = { literacy: '', numJob: 0, growth: 0.0 };
            obj.literacy = literacies[i].name;
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
          alert("Khu vực bạn chọn không có dữ liệu về trình độ học vấn");
        }
      });
  }

  public quy_dotuoi_gioitinh: any = [
    { name: 'II/2019', selected: true },
    { name: 'III/2019', selected: false },
    { name: 'IV/2019', selected: false },

  ];
  public quy_hocvan: any = [
    { name: 'II/2019', selected: true },
    { name: 'III/2019', selected: false },
    { name: 'IV/2019', selected: false },
    { name: 'I/2020', selected: false },
  ];
  thayDoiQuy_dotuoi_gioitinh(index) {
    this.quy_dotuoi_gioitinh.forEach(element => {
      element.selected = false;
    });
    this.quy_dotuoi_gioitinh[index].selected = true;
  }
  thayDoiQuy_hocvan(index) {
    this.quy_hocvan.forEach(element => {
      element.selected = false;
    });
    this.quy_hocvan[index].selected = true;
  }
  showNhuCauKVC() {
    var numJob = [
      { name: 'Ha Noi', data: [8.1, 4.0, 10.1, 20] },
      { name: 'Da Nang', data: [6, 9, 7, 20] },
      { name: 'Sai Gon', data: [5, 8, 9, 10] }
    ];

    var options = {
      series: numJob,
      chart: {
        height: 280,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        formatter: val => {
          return val + 'tr';
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
            position: 'top', // top, center, bottom
          },
          colors: {
            ranges: [{
              from: 0,
              to: 100,
              color: '#36a800'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {
        categories: [
          'Quý I',
          'Quý II',
          'Quý III',
          'Quý IV'
        ],
        position: 'bot',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: val => {
            return val + '';
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        }
      },
      title: {
        text: 'Biểu đồ nhu cầu tuyển dụng theo khu vực con',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600'
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý ',
        align: 'left'
      },
      // title: {
      //   text: 'Biểu đồ nhu cầu tuyển dụng theo khu vực con',
      //   align: 'center',
      //   style: {
      //     fontWeight:  'normal',
      //     fontStyle: 'italic',
      //     color: '#333'
      //   }
      // }
    };
    var chart = new ApexCharts(document.querySelector("#chart_nhu_cau_kvc"), options);
    chart.render();
  };


  showDanhSachNhuCtyTheoQuy() {
    var numJob = [{
      name: 'SL tin',
      data: [230, 310, 400, 101, 402, 362]
    }];
    var options = {
      series: numJob,
      fill: {
        colors: ['#36a800']
      },
      chart: {
        height: 280,
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
              to: 100,
              color: '#36a800'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {

        categories: [
          'Viettel',
          'Shopee',
          'Mobilefone',
          'Vinaphone',
          'Techcombank',
          'Vin',

        ],
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
          enabled: false,
        }
      },

      legend: {
        show: false,
        position: 'top'
      },
      title: {
        text: 'Danh sách các công ty có nhu cầu tuyển dụng theo quý',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600'
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý ',
        align: 'left'
      },
    };
    var chart = new ApexCharts(document.querySelector('#danh_sach_cty'), options);
    chart.render();
  }

  showNhuCauTuyenDungTheoLinhVuc() {
    var numJob = [{
      name: 'SL tin',
      data: [2300, 3000, 2000, 1001, 2000, 3060]
    }];
    var options = {
      series: numJob,
      fill: {
        colors: ['#36a800']
      },
      chart: {
        height: 280,
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
              to: 100,
              color: '#36a800'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      xaxis: {
        categories: [
          'Dệt may',
          'Cơ khí',
          'Thời trang',
          'Điện lạnh',
          'Lập trình',
          'Đầu bếp',

        ],
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
        text: 'Nhu cầu tuyển dụng công việc thuộc lĩnh vực',
        align: 'left',
        style: {
          fontSize: '18px',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '600',
        },
      },
      subtitle: {
        text: 'Dữ liệu cập nhật lần cuối quý ',
        align: 'left'
      },
      // title: {
      //   text: 'Danh sách nhu cầu tuyển dụng công việc thuộc lĩnh vực(số lượng tin, mức lương)',
      //   align: 'center',
      //   style: {
      //     fontWeight:  'normal',
      //     color: '#333'
      //   }
      // }
    };
    var chart = new ApexCharts(document.querySelector('#danh_sach_linh_vuc'), options);
    chart.render();
  }

  showDotuoiGioitinh() {
    var numJob = [{
      name: 'Nam',
      data: [44000, 55000, 41000, 6700]
    }, {
      name: 'Nữ',
      data: [13000, 23000, 20000, 8000]
    }];
    var options = {
      series: numJob,
      colors: ["#36a800", '#8dc971'],
      chart: {
        type: 'bar',
        height: 280,
        width: 400,
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
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
          horizontal: false,
        },
      },
      xaxis: {
        type: 'text',
        categories: ['18-25', '25-35', '35-50', 'trên 50'],
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      //   fill: {
      //       colors: ['#36a800', '#33CC6']
      //     }
      //   colors: {
      //      [          
      //         color: '#36a800'
      //     ],
      // }
    };
    var chart = new ApexCharts(document.querySelector('#dotuoi_gioitinh'), options);
    chart.render();
  };

  showTrinhdoHocvan() {
    var numJob = [5, 5, 20, 20, 25, 13, 12];
    var label_data = ['Trung học cơ sở', 'Trung học phổ thông', 'Đại học', 'Cao học', 'Cao đẳng', 'Trung cấp nghề', 'Khác']
    var options = {
      series: numJob,
      chart: {
        width: 530,
        type: 'donut',
      },
      labels: label_data,
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
      }],
      // colors: ['#2e7932', '', '', '#649628', '#0890a9',],
      colors: ['#36a800', '#00CCFF', '#00CCCC', '#33CC66', '#33CC33', '#77792e', '#9e9c00'],
      // fill: {
      //   colors: ['#36a800', '#36a100']
      // }
    };
    var chart = new ApexCharts(document.querySelector('#trinhdo_hocvan'), options);
    chart.render();
  }
}
