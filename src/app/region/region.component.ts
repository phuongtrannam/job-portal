import { Component, OnInit } from '@angular/core';
declare var ApexCharts: any;
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const options = {
      series: [{
      name: 'Inflation',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
      chart: {
      height: 350,
      type: 'bar',
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
          rangeBarOverlap: true,
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
      categories: ['Công nghệ Viễn thông', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
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
          return val + 'tr';
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
      text: 'Monthly Inflation in Argentina, 2002',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
    };

    const chart = new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-nhanh-nghe'), options);
    chart.render();
  }

}
