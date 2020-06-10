import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, OnInit, Input } from '@angular/core';
import { IndustriesService } from '../../industries.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
declare var ApexCharts: any;

@Component({
  selector: 'app-industry-detail',
  templateUrl: './industry-detail.component.html',
  styleUrls: ['./industry-detail.component.scss'],
  providers: [IndustriesService]
})
export class IndustryDetailComponent {
  public congtylon_linhvuc = [
    { name: 'Viettel', soluong: 10, vitri: 'Hanoi', imgsrc: 'https://thietkelogo.vn/wp-content/uploads/2015/12/viettel.png' },
    { name: 'Misa', soluong: 20, vitri: 'Sài Gòn', imgsrc: 'https://upload.wikimedia.org/wikipedia/vi/1/11/Logo_MISA.jpg' },
    { name: 'Gear.Inc', soluong: 15, vitri: 'Hanoi', imgsrc: 'https://cdn.itviec.com/employers/gear-inc/logo/w170/5FJEvYXV6fCJt46bYY6ccgD2/gear-inc-logo.png' },
    { name: 'BKAV', soluong: 12, vitri: 'Đà Nẵng', imgsrc: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Bkav_logo.jpg' }
  ];
  
 
  topCompanies = [];


  jobID$: Observable<any>;
  selectedJobId: string;

  constructor(private industriesService: IndustriesService,
    private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.getTopCompanies('I1', 'P24')
    this.showDotuoiGioitinh();
    this.showTrinhdoHocvan();
    this.showNhuCauTuyenDungTheoLinhVuc();
    // new ApexCharts(document.querySelector('#chart-do-tuoi-trung-binh'), chartDoTuoiTrungBinh).render();
    this.showNhuCauKVC();
    this.showNhuCauTuyenDung();    
    this.showDanhSachNhuCtyTheoQuy();
  }

  getTopCompanies(industryId: string, idProvince: string): void {
    this.industriesService.getTopCompanies(industryId, idProvince)
      .subscribe((data: any) => {
        console.log("getTopCompanies");
        console.log(data.result);
        this.topCompanies = data.result;
      });
  }

  getJobDemandByPeriodOfTime(industryId: string, idProvince: string): void {
    this.industriesService.getJobDemandByPeriodOfTime(industryId, idProvince)
      .subscribe((data: any) => {
        console.log("getJobDemandByPeriodOfTime");
        console.log(data.result);
        this.topCompanies = data.result;
      });
  }


  public quy_dotuoi_gioitinh: any = [
    {name: 'II/2019', selected: true},
    {name: 'III/2019', selected: false},
    {name: 'IV/2019', selected: false},
    
  ];
  public quy_hocvan: any = [
    {name: 'II/2019', selected: true},
    {name: 'III/2019', selected: false},
    {name: 'IV/2019', selected: false},
    {name: 'I/2020', selected: false},
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
        height: 350,
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

  showNhuCauTuyenDung() {
    var numJob = [{
      name: 'SL tin',
      data: [2.3, 3.1, 4.0, 10.1],
    }];
    var options = {
      series: numJob,
      title: {
        text: 'Nhu cầu việc làm theo độ tuổi, giới tính',
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
          'Quý IV',
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

      fill: {
        color: "#36a800"
      },


    };
    var chart = new ApexCharts(document.querySelector("#chart_nhu_cau_tuyen_dung"), options);
    chart.render();
  }

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
        height: 350,
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
        width: 650,
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
    var chart= new ApexCharts(document.querySelector('#trinhdo_hocvan'), options);
    chart.render();
  }
}
