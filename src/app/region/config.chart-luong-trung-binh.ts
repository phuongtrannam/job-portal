export const chartLuongTrungBinh = {
    series: [44, 55, 41, 17, 15],
    chart: {
    type: 'donut',
  },
  dataLabels: {
    enabled: false
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
