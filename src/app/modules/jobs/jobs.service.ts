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
export class JobsService {
    rootUrl = 'http://localhost:8080/jobs';
    constructor(private http: HttpClient) {
    }

    getJobDemandByPeriodOfTime(idJobParam: string, idLocationParam: string) {
        const postData = {
            idJob: idJobParam,
            idLocation: idLocationParam,
        };
        const specificPath = '/get_job_demand_by_period_of_time';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getAverageSalary(idJobParam: string, idLocationParam: string) {
        const postData = {
            idJob: idJobParam,
            idLocation: idLocationParam,
        };
        const specificPath = '/get_average_salary';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }
    getJobDemandByAge(idJobParam: string, idLocationParam: string) {
        const postData = {
            idJob: idJobParam,
            idLocation: idLocationParam,
        };
        const specificPath = '/get_job_demand_by_age';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByLiteracy(idJobParam: string, idLocationParam: string) {
        const postData = {
            idJob: idJobParam,
            idLocation: idLocationParam,
        };
        const specificPath = '/get_job_demand_by_literacy';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getRelatedJobs(idJobParam: string) {
        const postData = {
            idJob: idJobParam,
        };
        const specificPath = '/get_related_job';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }
}