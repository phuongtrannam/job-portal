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
    rootUrl = 'http://localhost:8080/industries';
    constructor(private http: HttpClient) { 

    }

    // getIndustryList() {
    //     const specificPath = '/get_industry_list';
    //     const url = this.rootUrl + specificPath;
    //     return this.http.get(url);
    // }





    getJobDemandByPeriodOfTime(idJob: string) {
        const postData = {
            id: idJob,
        };
        const specificPath = '/get_job_demand_by_period_of_time';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByAge(idJob: string) {
        const postData = {
            id: idJob,
        };
        const specificPath = '/get_job_demand_by_age';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByLiteracy(idJob: string) {
        const postData = {
            id: idJob,
        };
        const specificPath = '/get_job_demand_by_literacy';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getAverageSalaryByPeriodOfTime(idJob: string) {
        const postData = {
            id: idJob,
        };
        const specificPath = '/get_average_salary_by_period_of_time';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }
} 