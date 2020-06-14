import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RegionsService } from '../../regions.service';
import { JobsService } from '../../../jobs/jobs.service';
import { HeaderService } from '../../../../core/header/header.service';
import { chartLuongTrungBinh } from './config.chart-luong-trung-binh';
import { chartViecLamMoi } from './config.chart-viec-lam-moi';
import { luotDangTinTheoNganhNghe } from './config.luot-dang-tin-theo-nganh-nghe';
import { mucLuongTrungBinhTheoNganhNghe } from './config.muc-luong-trung-binh-theo-nganh-nghe';

import { chartDoTuoiTrungBinh } from './config.chart-do-tuoi-trung-binh';
import { chartCongTy } from './config.chart-cong-ty';
declare var ApexCharts: any;
export interface City {
  name: string;
  id: string;
  // area: string;
}

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.scss'],
  providers: [RegionsService, HeaderService, JobsService]
})
export class RegionDetailComponent implements OnInit {

  public quickTab: any = [
    {name: 'Theo ngành nghề', selected: true},
    {name: 'Theo vị trí công việc', selected: false},
    {name: 'Theo công ty', selected: false},
  ];

  public quy: any = [
    {name: 'II/2019', selected: true},
    {name: 'III/2019', selected: false},
    {name: 'IV/2019', selected: false},
    {name: 'I/2020', selected: false},
  ];
  constructor(private regionsService: RegionsService,
              private jobsService: JobsService,
              public headerService: HeaderService) {

  }
  selectedCity = 'P0';
  control = new FormControl();
  cityList: City[] = [{id: '1', name: 'Champs-Élysées'},
              {id: '2', name: 'Lombard Street'},
              {id: '3', name: 'Abbey Road'},
              {id: '4', name: 'Fifth Avenue'}];
  filteredOptions: Observable<City[]>;
  ngOnInit() {
    this.headerService.regions = '/regions';
    this.getCityList();

    new ApexCharts(document.querySelector('#chart-viec-lam-moi'), chartViecLamMoi).render();
    new ApexCharts(document.querySelector('#chart-cong-ty'), chartCongTy).render();
    new ApexCharts(document.querySelector('#chart-luong-trung-binh'), chartLuongTrungBinh).render();
    new ApexCharts(document.querySelector('#chart-do-tuoi-trung-binh'), chartDoTuoiTrungBinh).render();

    new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-nganh-nghe'), mucLuongTrungBinhTheoNganhNghe).render();
    new ApexCharts(document.querySelector('#luot-dang-tin-theo-nganh-nghe'), luotDangTinTheoNganhNghe).render();

    new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-vi-tri-cong-viec'), mucLuongTrungBinhTheoNganhNghe).render();
    new ApexCharts(document.querySelector('#luot-dang-tin-theo-vi-tri-cong-viec'), luotDangTinTheoNganhNghe).render();

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

  thayDoiQuy(index) {
    this.quy.forEach(element => {
      element.selected = false;
    });
    this.quy[index].selected = true;
  }
}
