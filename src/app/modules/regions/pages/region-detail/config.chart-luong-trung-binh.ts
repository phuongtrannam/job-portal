export const chartLuongTrungBinh = {
  series: [{
  name: 'Net Profit',
  data: [44, 55, 58, 46]
}],
  chart: {
  type: 'bar',
  height: 130,
  zoom: {
    enabled: false
},
toolbar: {
    show: false
}
},
plotOptions: {
  bar: {
    horizontal: false,
    // columnWidth: '55%',
    // endingShape: 'rounded'
  },
},
dataLabels: {
  enabled: false
},
colors: ['#37933c'],
stroke: {
  show: true,
  width: 2,
  colors: ['transparent']
},
xaxis: {
  labels: {
    show: false,
  },
  categories: ['Feb', 'Mar', 'Apr', 'May'],
},
yaxis: {
  show: false,
  title: {
    text: '$ (thousands)'
  }
},
fill: {
  opacity: 1
},
tooltip: {
  y: {
    formatter: function (val) {
      return "$ " + val + " thousands"
    }
  }
}
};
