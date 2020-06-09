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
export class JobsService {
    rootUrl = 'http://localhost:8080/jobs';
    constructor(private http: HttpClient) {
    }

    // private jobSource = new BehaviorSubject('J1');
    // selectedJob = this.jobSource.asObservable();

    // changeSelectedJob(jobId: string){
    //     this.jobSource.next(jobId);
    // }

    getCityList() {
        const specificPath = '/city_list';
        const url = this.rootUrl + specificPath;
        return this.http.get(url);
    }

    getTopJob(numJobParam: string) {
        const postData = {
            numJob: numJobParam,
        };
        const specificPath = '/top_job';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
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

    getJobInfo(idJobParam: string) {
        const postData = {
            idJob: idJobParam,
        };
        const specificPath = '/get_job_info';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

}