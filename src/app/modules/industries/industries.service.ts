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
export class IndustriesService {
    // rootUrl = 'http://localhost:8080/industries';
    rootUrl = 'http://' + document.location.hostname + ':8080/industries';
    constructor(private http: HttpClient) { 

    }

    getIndustryList() {
        const specificPath = '/get_industry_list';
        const url = this.rootUrl + specificPath;
        return this.http.get(url);
    }

    getJobListByIndustry( industryIdParam: string, idProvinceParam: string) {
        const postData = {
            industryId: industryIdParam,
        };
        const specificPath = '/get_job_list';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getTopCompanies( industryIdParam: string, idProvinceParam: string) {
        const postData = {
            industryId: industryIdParam,
            locationId: idProvinceParam,
        };
        const specificPath = '/get_top_company';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }
    getJobDemandByPeriodOfTime( industryIdParam: string, idProvinceParam: string) {
        const postData = {
            industryId: industryIdParam,
            locationId: idProvinceParam,
        };
        const specificPath = '/get_job_demand';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }
    getAverageSalary(industryIdParam: string, idProvinceParam: string) {
        const postData = {
            industryId: industryIdParam,
            locationId: idProvinceParam,
        };
        const specificPath = '/get_salary';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }
    getTopHiringCompany(industryIdParam: string, idProvinceParam: string) {
        const postData = {
            industryId: industryIdParam,
            locationId: idProvinceParam,
        };
        const specificPath = '/get_top_hiring_company';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }
    getTopCompanyHighestSalary(industryIdParam: string, idProvinceParam: string) {
        const postData = {
            industryId: industryIdParam,
            locationId: idProvinceParam,
        };
        const specificPath = '/get_top_salary_company';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }
    getTopHiringJob(industryIdParam: string, idProvinceParam: string) {
        const postData = {
            industryId: industryIdParam,
            locationId: idProvinceParam,
        };
        const specificPath = '/get_top_hiring_job';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getHighestSalaryJob(industryIdParam: string, idProvinceParam: string) {
        const postData = {
            industryId: industryIdParam,
            locationId: idProvinceParam,
        };
        const specificPath = '/get_highest_salary_job';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getTopHiringRegion(industryIdParam: string) {
        const postData = {
            industryId: industryIdParam,
        };
        const specificPath = '/get_top_hiring_region';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getHighestSalaryRegion(industryIdParam: string) {
        const postData = {
            industryId: industryIdParam,
        };
        const specificPath = '/get_highest_salary_region';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByAge(industryIdParam: string, idProvinceParam: string) {
        const postData = {
            industryId: industryIdParam,
            locationId: idProvinceParam,
        };
        const specificPath = '/get_job_demand_by_age';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByLiteracy(industryIdParam: string, idProvinceParam: string) {
        const postData = {
            industryId: industryIdParam,
            locationId: idProvinceParam,
        };
        const specificPath = '/get_job_demand_by_literacy';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

   

    
} 