import { chartLuongTrungBinh } from './config.chart-luong-trung-binh';
import { chartViecLamMoi } from './config.chart-viec-lam-moi';
import { luotDangTinTheoNganhNghe } from './config.luot-dang-tin-theo-nganh-nghe';
import { mucLuongTrungBinhTheoNganhNghe } from './config.muc-luong-trung-binh-theo-nganh-nghe';

import { Component, OnInit } from '@angular/core';
import { chartDoTuoiTrungBinh } from './config.chart-do-tuoi-trung-binh';
import { chartCongTy } from './config.chart-cong-ty';
import { HeaderService } from '../core/header/header.service';
declare var ApexCharts: any;
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

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
  constructor(
    public headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.region = '/region';

    new ApexCharts(document.querySelector('#chart-viec-lam-moi'), chartViecLamMoi).render();
    new ApexCharts(document.querySelector('#chart-cong-ty'), chartCongTy).render();
    new ApexCharts(document.querySelector('#chart-luong-trung-binh'), chartLuongTrungBinh).render();
    new ApexCharts(document.querySelector('#chart-do-tuoi-trung-binh'), chartDoTuoiTrungBinh).render();

    new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-nganh-nghe'), mucLuongTrungBinhTheoNganhNghe).render();
    new ApexCharts(document.querySelector('#luot-dang-tin-theo-nganh-nghe'), luotDangTinTheoNganhNghe).render();

    new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-vi-tri-cong-viec'), mucLuongTrungBinhTheoNganhNghe).render();
    new ApexCharts(document.querySelector('#luot-dang-tin-theo-vi-tri-cong-viec'), luotDangTinTheoNganhNghe).render();

  }

  thayDoiQuy(index) {
    this.quy.forEach(element => {
      element.selected = false;
    });
    this.quy[index].selected = true;
  }

}
