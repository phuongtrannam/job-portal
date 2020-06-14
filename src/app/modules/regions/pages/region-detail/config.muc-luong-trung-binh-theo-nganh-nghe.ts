export const mucLuongTrungBinhTheoNganhNghe = {
    series: [{
    name: 'Inflation',
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
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
  colors: ['#37933c'],
  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    formatter: val => {
      return val + 'tr';
    },
    offsetX: 0,
    style: {
      fontSize: '12px',
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
    }
  },
  xaxis: {
    categories: [
      'Công nghệ Viễn thông',
      'Công nghệ thông tin',
      'Hướng dẫn viên du lịch',
      'Kỹ sư công nghệ ô tô',
      'Kỹ sư xây dựng công trình',
      'Marketing- truyền thông',
      'Nhân viên kinh doanh',
      'Sinh học ứng dụng',
      'Thiết kế công nghiệp',
      'Khoa học môi trường',
      'Kinh tế quốc tế',
      'Thiết kế đồ họa'
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
    text: 'Biểu đồ so sánh mức lương trung bình theo ngành nghề',
    align: 'center',
    style: {
      color: '#333'
    }
  }
};
