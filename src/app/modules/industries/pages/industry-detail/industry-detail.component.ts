import { chartLuongTrungBinh } from './config.chart-luong-trung-binh';
import { chartNhuCauTuyenDung } from './config.chart-nhu-cau-tuyendung';
import { luotDangTinTheoNganhNghe } from './config.luot-dang-tin-theo-nganh-nghe';
import { mucLuongTrungBinhTheoNganhNghe } from './config.muc-luong-trung-binh-theo-nganh-nghe';
import { Component, OnInit } from '@angular/core';
// import { chartDoTuoiTrungBinh } from './config.chart-do-tuoi-trung-binh     ';
import { chartCongTy } from './config.chart-cong-ty';
declare var ApexCharts: any;

@Component({
  selector: 'app-industry-detail',
  templateUrl: './industry-detail.component.html',
  styleUrls: ['./industry-detail.component.scss']
})
export class IndustryDetailComponent implements OnInit {

  public quickTab: any = [
    {name: 'Theo ngành nghề', selected: true},
    {name: 'Theo vị trí công việc', selected: false},
    {name: 'Theo công ty', selected: false},
  ]
  constructor() { }

  ngOnInit() {


    new ApexCharts(document.querySelector('#chart-viec-nhu-cau-tuyendung'), chartNhuCauTuyenDung).render();
    new ApexCharts(document.querySelector('#chart-cong-ty'), chartCongTy).render();
    new ApexCharts(document.querySelector('#chart-luong-trung-binh'), chartLuongTrungBinh).render();
    // new ApexCharts(document.querySelector('#chart-do-tuoi-trung-binh'), chartDoTuoiTrungBinh).render();

    new ApexCharts(document.querySelector('#muc-luong-trung-binh-theo-nganh-nghe'), mucLuongTrungBinhTheoNganhNghe).render();
    new ApexCharts(document.querySelector('#luot-dang-tin-theo-nganh-nghe'), luotDangTinTheoNganhNghe).render();

  }

}
