import { chartLuongTrungBinh } from './config.chart-luong-trung-binh';
import { chartViecLamMoi } from './config.chart-viec-lam-moi';
import { luotDangTinTheoNganhNghe } from './config.luot-dang-tin-theo-nganh-nghe';
import { mucLuongTrungBinhTheoNganhNghe } from './config.muc-luong-trung-binh-theo-nganh-nghe';

import { Component, OnInit } from '@angular/core';
import { chartDoTuoiTrungBinh } from './config.chart-do-tuoi-trung-binh';
import { chartCongTy } from './config.chart-cong-ty';
declare var ApexCharts: any;
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  public quickTab1 = [
    {name: 'Quý I', selected: true},
    {name: 'Quý II', selected: false},
    {name: 'Quý III', selected: false},
    {name: 'Quý IV', selected: true}
  ];
  public quickTab2 = [
    {name: 'Quý I', selected: true},
    {name: 'Quý II', selected: false},
    {name: 'Quý III', selected: false},
    {name: 'Quý IV', selected: true}
  ];
  constructor() { }

  ngOnInit() {


    new ApexCharts(document.querySelector('#chart-viec-lam-moi'), chartViecLamMoi).render();
    new ApexCharts(document.querySelector('#chart-cong-ty'), chartCongTy).render();
    new ApexCharts(document.querySelector('#chart-luong-trung-binh'), chartLuongTrungBinh).render();
    new ApexCharts(document.querySelector('#chart-do-tuoi-trung-binh'), chartDoTuoiTrungBinh).render();

    new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-nganh-nghe'), mucLuongTrungBinhTheoNganhNghe).render();
    new ApexCharts(document.querySelector('#luot-dang-tin-theo-nganh-nghe'), luotDangTinTheoNganhNghe).render();

  }

}
