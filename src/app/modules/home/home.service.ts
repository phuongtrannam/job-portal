import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
    constructor() { }

    getMenuItems() {
        return ['Thị trường', 'Công ty', 'Nghề nghiệp'];
    }
    getListCompanies() {
        return [
            {
                name: 'Shiseido Co',
                industry: 'Accounting / Finance',
                location: 'New York',
                numberOfJob: 50,
            },
            {
                name: 'Mencap Co',
                industry: 'Automotive Jobs',
                location: 'New York',
                numberOfJob: 150,
            },
            {
                name: 'Herbal Ltd',
                industry: 'Accounting / Finance',
                location: 'New York',
                numberOfJob: 100,
            },
            {
                name: 'NonStop Co',
                industry: 'Automotive Job',
                location: 'Indiana',
                numberOfJob: 50,
            },
            {
                name: 'Personnel Ltd',
                industry: 'Education Training',
                location: 'New York',
                numberOfJob: 80,
            },
            {
                name: 'Michael MC',
                industry: 'Accounting / Finance',
                location: 'New York',
                numberOfJob: 50,
            },
            {
                name: 'Shiseido Co',
                industry: 'Accounting / Finance',
                location: 'New York',
                numberOfJob: 50,
            },
            {
                name: 'Shiseido Co',
                industry: 'Accounting / Finance',
                location: 'New York',
                numberOfJob: 50,
            },
        ];
    }

   
} 