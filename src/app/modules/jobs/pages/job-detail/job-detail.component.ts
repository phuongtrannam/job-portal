import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { JobsService } from '../../jobs.service';

export interface City {
  name: string;
  id: string;
  area: string;
}

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
  providers: [JobsService]
})
export class JobDetailComponent implements OnInit {


  constructor(private jobsService: JobsService) {

  }
  selectedCity = 'P0';
  control = new FormControl();
  cityList: City[] = [{id: '1', name: 'Champs-Élysées', area: 'tnb'},
              {id: '2', name: 'Lombard Street', area: 'tnb'},
              {id: '3', name: 'Abbey Road', area: 'tnb'},
              {id: '4', name: 'Fifth Avenue', area: 'tnb'}];
  filteredOptions: Observable<City[]>;
  ngOnInit() {
    this.getCityList();
  }

  displayFn(cityList: City[]): (id: string) => string | null {
    return (id: string) => { 
      const correspondingOption = Array.isArray(cityList) ? cityList.find(option => option.id === id) : null;
      return correspondingOption ? correspondingOption.name : '';
    };
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.cityList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onCitySelected(selectedCityId) {
    // console.log('### Trigger');
    // console.log(this.selectedCity);
    // console.log(selectedCityId);
    this.selectedCity = selectedCityId;
    // console.log(this.selectedCity);
  }
  
  getCityList(): void {
    this.jobsService.getCityList()
      .subscribe((data: any) => {
        console.log("getCityList");
        console.log(data.result);
        this.cityList = data.result;
        this.filteredOptions = this.control.valueChanges
          .pipe(
            startWith<string | City>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.cityList.slice())
          );
        // console.log(this.filteredOptions);
    });
  }
}
