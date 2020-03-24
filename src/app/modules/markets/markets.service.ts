import { Injectable } from '@angular/core';

@Injectable()
export class MarketsService {
    constructor() { }

    getListJobsHighestSalary() {
        return [
            {
                name: 'Giám đốc kinh doanh',
                value: 50,
                growth: -0.5,
                hiring: 86,
            },
            {
                name: 'Giám đốc kĩ thuật',
                value: 40,
                growth: 2.2,
                hiring: 56,
            },
            {
                name: 'Phi công',
                value: 35,
                growth: 1.3,
                hiring: 80,
            },
            {
                name: 'Nhân viên kinh doanh',
                value: 30,
                growth: 2.1,
                hiring: 26,
            },
            {
                name: 'Lập trình viên',
                value: 20,
                growth: 0.2,
                hiring: 30,
            },
            {
                name: 'Kĩ sư xây dựng',
                value: 15,
                growth: -2.1,
                hiring: 45,
            },
            {
                name: 'Bác sĩ',
                value: 12,
                growth: 3.0,
                hiring: 30,
            },
            {
                name: 'Y tá',
                value: 10,
                growth: -2.5,
                hiring: 100,
            },
        ];
    }
    getTopJobsHighestHiring() {
        return [
            {
                name: 'Công nhân dệt',
                value: 5000,
                growth: -0.5,
            },
            {
                name: 'Công nhân xây dựng',
                value: 4000,
                growth: 2.2,
            },
            {
                name: 'Nhân viên giao nhận',
                value: 6500,
                growth: 1.3,
            },
            {
                name: 'Nhân viên bán hàng',
                value: 3000,
                growth: 2.1,
            },
            {
                name: 'Công nhân cơ khí',
                value: 5000,
                growth: 0.2,
            },
            {
                name: 'Kĩ sư xây dựng',
                value: 3500,
                growth: -2.1,
            },
            {
                name: 'Nhân viên kinh doanh',
                value: 4200,
                growth: 3.0,
            },
            {
                name: 'Lái xe',
                value: 3000,
                growth: -2.5,
            },
        ];
    }
    getTopHiringCompany() {
        return [
            {
                name: 'Vietel',
                value: 15000,
                growth: -2.5,
            },
            {
                name: 'Vinaphone',
                value: 1000,
                growth: 2.1,
            },
            {
                name: 'Samsung',
                value: 10000,
                growth: -0.5,
            },
            {
                name: 'Cengroup',
                value: 3000,
                growth: 5.0,
            },
            {
                name: 'May 10',
                value: 8000,
                growth: -1.5,
            },
            {
                name: 'Gang thép',
                value: 9500,
                growth: 1.0,
            },
            {
                name: 'Vingroup',
                value: 9000,
                growth: 3.5,
            },
            {
                name: 'Bốc vác',
                value: 5000,
                growth: -3.5,
            },
        ];
    }

    getJobDistributionByAge() {
        return [
            {
                name: '18-25',
                series: [
                    {
                        name: 'Nam',
                        value: 30000
                    },
                    {
                        name: 'Nữ',
                        value: 20000
                    }
                ],
                percentage: 60.0,
            },
            {
                name: '25-35',
                series: [
                    {
                        name: 'Nam',
                        value: 51000
                    },
                    {
                        name: 'Nữ',
                        value: 45000
                    },
                ],
                percentage: 51.3,
            },
            {
                name: '35-50',
                series: [
                    {
                        name: 'Nam',
                        value: 41632
                    },
                    {
                        name: 'Nữ',
                        value: 30632
                    },
                ],
                percentage: 57.3,
            },
            {
                name: 'Trên 50 tuổi',
                series: [
                    {
                        name: 'Nam',
                        value: 1632
                    },
                    {
                        name: 'Nữ',
                        value: 2632
                    },
                ],
                percentage: 38.3,
            },
        ];
    }

    getJobDistributionByLiteracy() {
        return [
            {
                name: 'Trung học cơ sở',
                value: 5000,
                growth: -3.5,
            },
            {
                name: 'Trung học phổ thông',
                value: 1000,
                growth: -1.5,
            },
            {
                name: 'Đại học',
                value: 10000,
                growth: -0.5,
            },
            {
                name: 'Cao học',
                value: 3000,
                growth: 2.5,
            },
            {
                name: 'Cao đẳng',
                value: 8000,
                growth: 5.0,
            },
            {
                name: 'Trung cấp nghề',
                value: 9500,
                growth: 4.5,
            },
            {
                name: 'Khác',
                value: 9000,
                growth: 0.5,
            },
        ];
    }

    getJobDistributionByIndustry() {
        return [
            {
                name: 'May mặc',
                value: 5000,
                growth: 4.5,
            },
            {
                name: 'Luyện kim',
                value: 1000,
                growth: -0.5,
            },
            {
                name: 'Nông nghiệp',
                value: 10000,
                growth: 1.0,
            },
            {
                name: 'Hóa chất',
                value: 3000,
                growth: 2.5,
            },
            {
                name: 'Chế biến',
                value: 8000,
                growth: -5.5,
            },
            {
                name: 'Sản xuất ô tô',
                value: 9500,
                growth: 2.0,
            },
            {
                name: 'Khác',
                value: 9000,
                growth: 1.0,
            },

        ];
    }

    getJobDistributionByMonth() {
        return [
            {
                timestamp: 'QIV/2017',
                hn: 6200,
                dn: 3400,
                hcm: 7100,
            },
            {
                timestamp: 'QIII/2017',
                hn: 5500,
                dn: 2400,
                hcm: 6100,
            },
            {
                timestamp: 'QI/2018',
                hn: 5200,
                dn: 3400,
                hcm: 7100,
            },
            {
                timestamp: 'QII/2018',
                hn: 4500,
                dn: 3000,
                hcm: 7900,
            },
            {
                timestamp: 'QIII/2018',
                hn: 6000,
                dn: 2900,
                hcm: 6000,
            },
            {
                timestamp: 'QIV/2018',
                hn: 5600,
                dn: 3200,
                hcm: 6900,
            },
            {
                timestamp: 'QI/2019',
                hn: 5500,
                dn: 3500,
                hcm: 7000,
            },
            {
                timestamp: 'QII/2019',
                hn: 5100,
                dn: 3900,
                hcm: 8000,
            },
            {
                timestamp: 'QIII/2019',
                hn: 6100,
                dn: 3400,
                hcm: 7000,
            },
            {
                timestamp: 'QIV/2019',
                hn: 5500,
                dn: 3500,
                hcm: 7000,
            },
        ];
    }

    getAverageWageByIndustry(){
        return [
            {
                name: 'May mặc',
                value: 15,
                growth: -0.5,
            },
            {
                name: 'Luyện kim',
                value: 10,
                growth: -1.5,
            },
            {
                name: 'Nông nghiệp',
                value: 8,
                growth: 2.5,
            },
            {
                name: 'Hóa chất',
                value: 9,
                growth: 3.5,
            },
            {
                name: 'Chế biến',
                value: 8.5,
                growth: 1.5,
            },
            {
                name: 'Sản xuất ô tô',
                value: 6,
                growth: -3.5,
            },
            {
                name: 'Khác',
                value: 5,
                growth: -0.5,
            },
        ];
    }

   
} 