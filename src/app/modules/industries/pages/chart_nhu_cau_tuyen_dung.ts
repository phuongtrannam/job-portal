export const NhuCauTuyenDung = {
    series: [{
    name: 'Inflation',
    data: [2.3, 3.1, 4.0, 10.1]
  }],
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
