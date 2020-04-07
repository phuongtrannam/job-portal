import { Injectable } from '@angular/core';

@Injectable()
export class IndustriesService {
    constructor() { }

    getJobDemandByMonth() {
        return [
            {
                timestamp: 'QIV/2017',
                value: 6200,
                growth: 0.5,
            },
            {
                timestamp: 'QIII/2017',
                value: 5500,
                growth: -10,
            },
            {
                timestamp: 'QI/2018',
                value: 5200,
                growth: -1,
            },
            {
                timestamp: 'QII/2018',
                value: 4500,
                growth: -2,
            },
            {
                timestamp: 'QIII/2018',
                value: 6000,
                growth: 5,
            },
            {
                timestamp: 'QIV/2018',
                value: 5600,
                growth: -3,
            },
            {
                timestamp: 'QI/2019',
                value: 5500,
                growth: -0.5,
            },
            {
                timestamp: 'QII/2019',
                value: 5100,
                growth: -4,
            },
            {
                timestamp: 'QIII/2019',
                value: 6100,
                growth: 11,
            },
            {
                timestamp: 'QIV/2019',
                value: 5500,
                growth: -5,
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
    getJobDemandByLiteracy() {
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

    getAverageSalaryByQuarter() {
        return [
            {
                timestamp: 'QIV/2017',
                value: 6200,
                growth: 0.5,
            },
            {
                timestamp: 'QIII/2017',
                value: 5500,
                growth: -10,
            },
            {
                timestamp: 'QI/2018',
                value: 5200,
                growth: -1,
            },
            {
                timestamp: 'QII/2018',
                value: 4500,
                growth: -2,
            },
            {
                timestamp: 'QIII/2018',
                value: 6000,
                growth: 5,
            },
            {
                timestamp: 'QIV/2018',
                value: 5600,
                growth: -3,
            },
            {
                timestamp: 'QI/2019',
                value: 5500,
                growth: -0.5,
            },
            {
                timestamp: 'QII/2019',
                value: 5100,
                growth: -4,
            },
            {
                timestamp: 'QIII/2019',
                value: 6100,
                growth: 11,
            },
            {
                timestamp: 'QIV/2019',
                value: 5500,
                growth: -5,
            },
        ];
    }
} 