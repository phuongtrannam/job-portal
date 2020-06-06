export const luotDangTinTheoNganhNghe = {
    series: [44, 55, 41, 17, 15],
    chart: {
        type: 'donut',
    },
    colors: ['#37933c'],
    responsive: [{
        breakpoint: 480,
        options: {
        chart: {
            width: 180
        },
        legend: {
            position: 'bottom'
        }
        }
    }],
    title: {
        text: 'Biểu đồ so sánh lượt tin đăng theo ngành nghề',
        align: 'center',
        style: {
          color: '#333'
        }
    }
};

