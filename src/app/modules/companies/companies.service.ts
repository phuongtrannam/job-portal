import { Injectable } from '@angular/core';

@Injectable()
export class CompaniesService {
    constructor() { }


    getListCompanies() {
        return [
            {
                name: 'Viettel',
                industry: 'Viễn thông',
                location: 'Hà Nội',
                numberOfJob: 50,
            },
            {
                name: 'Cengroup',
                industry: 'Bất động sản',
                location: 'Hà Nội',
                numberOfJob: 150,
            },
            {
                name: 'Herbal Ltd',
                industry: 'Giáo dục',
                location: 'Hà Nội',
                numberOfJob: 100,
            },
            {
                name: 'Vingroup',
                industry: 'Bán lẻ',
                location: 'Hà Nội',
                numberOfJob: 50,
            },
            {
                name: 'Personnel Ltd',
                industry: 'Giáo dục',
                location: 'Hà Nội',
                numberOfJob: 80,
            },
            {
                name: 'Michael MC',
                industry: 'Tài Chính',
                location: 'Hà Nội',
                numberOfJob: 50,
            },
            {
                name: 'Shiseido Co',
                industry: 'Ngân hàng',
                location: 'Hà Nội',
                numberOfJob: 50,
            },
            {
                name: 'Shiseido Co',
                industry: 'Giáo dục',
                location: 'Hà Nội',
                numberOfJob: 50,
            },
        ];
    }
    getCompanyInfo(id: string) {
        var info = {
            name: 'Shiseido Co',
            industry: 'Accounting / Finance',
            location: 'New York',
            phonenumber: '+610123456',
            website: 'www.themeforest.com',
            logo: '',
            latitude: 46.879966,
            longitude: -121.726909,
            teamSize: 50,
            views: 1584,
            numberOfJob: 2,
            foundedDate: 2002,
            description: '',
            officeImage: [],
        };
        return info;
    }

    getNumberOfJob() {
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
                value: 3500,
                growth: 1.3,
            },
            {
                name: 'Nhân viên bán hàng',
                value: 3000,
                growth: 2.1,
            },
            {
                name: 'Công nhân cơ khí',
                value: 2000,
                growth: 0.2,
            },
            {
                name: 'Kĩ sư xây dựng',
                value: 1500,
                growth: -2.1,
            },
            {
                name: 'Nhân viên kinh doanh',
                value: 1200,
                growth: 3.0,
            },
            {
                name: 'Lái xe',
                value: 1000,
                growth: -2.5,
            },
        ];
    }
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
                name: 'Ăn xin',
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
                name: 'Bốc vác',
                value: 10,
                growth: -2.5,
                hiring: 100,
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

} 