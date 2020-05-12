import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};
@Injectable()
export class CompaniesService {
    rootUrl = 'http://localhost:8080/companies';
    postData = {
        id: 'C188',
    }
    constructor(private http: HttpClient) {
    }

    getCompanyList() {
        const specificPath = '/get_company_list';
        const url = this.rootUrl + specificPath;
        return this.http.get(url);
    }

    getBusinessLinesOfCompany(idCompany: string) {
        const postData = {
            id: idCompany,
        };
        const specificPath = '/get_business_lines_of_the_company';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getCompanyInfo(idCompany: string) {
        const postData = {
            id: idCompany,
        };
        const specificPath = '/get_company_info';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getRelatedCompanies(idCompany: string) {
        const postData = {
            id: idCompany,
        };
        const specificPath = '/get_related_company';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getRecentJobsByCompany(idCompany: string) {
        const postData = {
            id: idCompany,
        };
        const specificPath = '/get_recent_job_by_company';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByPeriodOfTime(idCompany: string) {
        const postData = {
            id: idCompany,
        };
        const specificPath = '/get_job_demand_by_period_of_time';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByLiteracy(idCompany: string) {
        const postData = {
            id: idCompany,
        };
        const specificPath = '/get_job_demand_by_literacy';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByAge(idCompany: string) {
        const postData = {
            id: idCompany,
        };
        const specificPath = '/get_job_demand_by_age';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
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
   

  

} 