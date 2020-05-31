export const chartNhuCauTuyenDung = {
    series: [{
    name: 'series1',
    data: [31, 40, 28, 51]
  }],
    chart: {
    height: 130,
    type: 'area',
    zoom: {
        enabled: false,
    },
    toolbar: {
        show: false,
    }
  },
  colors: ['#37933c'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: [3, 0]
    // colors: []
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
        show: false,
    },
    axisBorder: {
        show: false,
    },
    axisTicks: {
        show: false,
    },
    // type: 'datetime',
    // categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z']
  },
  yaxis: {
    show: false,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    }
  },
  grid: {
      // show: false,
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
  };
