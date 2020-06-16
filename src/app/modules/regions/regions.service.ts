import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};
@Injectable()
export class RegionsService {
    rootUrl = 'http://localhost:8080/regions';
    constructor(private http: HttpClient) {
    }

    // private jobSource = new BehaviorSubject('J1');
    // selectedJob = this.jobSource.asObservable();

    // changeSelectedJob(jobId: string){
    //     this.jobSource.next(jobId);
    // }

   

    getDashboardData(locationIdParam: string) {
        const postData = {
            locationId: locationIdParam,
        };
        const specificPath = '/get_dashboard_data';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getAverageSalaryByIndustry(locationIdParam: string) {
        const postData = {
            locationId: locationIdParam,
        };
        const specificPath = '/get_average_salary_by_industry';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByIndustry(locationIdParam: string) {
        const postData = {
            locationId: locationIdParam,
        };
        const specificPath = '/get_job_demand_by_industry';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getHighestSalaryJobs(locationIdParam: string) {
        const postData = {
            locationId: locationIdParam,
        };
        const specificPath = '/get_highest_salary_jobs';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getHighestDemandJobs(locationIdParam: string) {
        const postData = {
            locationId: locationIdParam,
        };
        const specificPath = '/get_highest_demand_jobs';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getHighestPayingCompanies(locationIdParam: string) {
        const postData = {
            locationId: locationIdParam,
        };
        const specificPath = '/get_highest_paying_companies';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getTopHiringCompanies(locationIdParam: string) {
        const postData = {
            locationId: locationIdParam,
        };
        const specificPath = '/get_top_hiring_companies';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByAge(locationIdParam: string) {
        const postData = {
            locationId: locationIdParam,
        };
        const specificPath = '/get_job_demand_by_age';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByLiteracy(locationIdParam: string) {
        const postData = {
            locationId: locationIdParam,
        };
        const specificPath = '/get_job_demand_by_literacy';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }
}