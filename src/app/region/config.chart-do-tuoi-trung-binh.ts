export const chartDoTuoiTrungBinh = {
    series: [44, 55, 41, 15],
    chart: {
    type: 'donut',
  },
  colors: ['#2b752f'],
  labels: ["16-20 tuổi", "20-25 tuổi", "25-30 tuổi", "Trên 30 tuổi"],
  dataLabels: {
    enabled: false
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        // width: 200,
        height: 150,
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
};
