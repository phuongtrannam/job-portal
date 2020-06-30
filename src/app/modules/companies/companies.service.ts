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
    // rootUrl = 'http://localhost:8080/companies';
    rootUrl = 'http://' + document.location.hostname + ':8080/companies';
    // postData = {
    //     id: 'C188',
    // }
    constructor(private http: HttpClient) {
    }

    getCompanyList() {
        const specificPath = '/get_company_list';
        const url = this.rootUrl + specificPath;
        return this.http.get(url);
    }   
    searchCompany(companyNameParam: string) {
        const postData = {
            companyName: companyNameParam,
        };
        const specificPath = '/search_company';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    advancedSearchCompany(companyNameParam: string, industryIdParam: string, 
                    minSalaryParam: string, maxSalaryParam: string) {
    const postData = {
        companyName: companyNameParam,
        industryId: industryIdParam,
        minSalary: minSalaryParam,
        maxSalary: maxSalaryParam,
    };
    const specificPath = '/advanced_search_company';
    const url = this.rootUrl + specificPath;
    return this.http.post(url, postData, httpOptions);
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

    getJobDemandByCompany(companyIdParam: string) {
        const postData = {
            companyId: companyIdParam,
        };
        const specificPath = '/get_job_demand';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getSalaryByCompany(companyIdParam: string) {
        const postData = {
            companyId: companyIdParam,
        };
        const specificPath = '/get_salary';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getHighestDemandJobByCompany(companyIdParam: string) {
        const postData = {
            companyId: companyIdParam,
        };
        const specificPath = '/get_highest_demand_jobs';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getHighestSalaryJobByCompany(companyIdParam: string) {
        const postData = {
            companyId: companyIdParam,
        };
        const specificPath = '/get_highest_salary_jobs';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByLiteracy(companyIdParam: string) {
        const postData = {
            companyId: companyIdParam,
        };
        const specificPath = '/get_job_demand_by_literacy';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

    getJobDemandByAge(companyIdParam: string) {
        const postData = {
            companyId: companyIdParam,
        };
        const specificPath = '/get_job_demand_by_age';
        const url = this.rootUrl + specificPath;
        return this.http.post(url, postData, httpOptions);
    }

} 