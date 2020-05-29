import { chartLuongTrungBinh } from './config.chart-luong-trung-binh';
import { chartViecLamMoi } from './config.chart-viec-lam-moi';
import { luotDangTinTheoNganhNghe } from './config.luot-dang-tin-theo-nganh-nghe';
import { mucLuongTrungBinhTheoNganhNghe } from './config.muc-luong-trung-binh-theo-nganh-nghe';

import { Component, OnInit } from '@angular/core';
declare var ApexCharts: any;
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    new ApexCharts(document.querySelector('#chart-viec-lam-moi'), chartViecLamMoi).render();
    new ApexCharts(document.querySelector('#chart-luong-trung-binh'), chartLuongTrungBinh).render();

    new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-nganh-nghe'), mucLuongTrungBinhTheoNganhNghe).render();
    new ApexCharts(document.querySelector('#luot-dang-tin-theo-nganh-nghe'), luotDangTinTheoNganhNghe).render();

  }

}
