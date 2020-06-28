import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class HomeService {
    rootUrl = 'http://localhost:8080/industries';
    constructor(private http: HttpClient) { }

    getIndustryList() {
        const specificPath = '/get_industry_list';
        const url = this.rootUrl + specificPath;
        return this.http.get(url);
    }
} 