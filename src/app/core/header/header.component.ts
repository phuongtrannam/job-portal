import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menu: any = [ 
    {name: '/', text: 'Trang chủ'},
    {name: '/markets', text: 'Thị trường'},
    {name: '/companies', text: 'Công ty'},
    {name: '/jobs', text: 'Vị trí công việc'},
    {name: '/industries', text: 'Lĩnh vực'},
    {name: '/region', text: 'Khu vực'},
  ];
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public headerService: HeaderService
  ) {
        
    this.activeRoute.url.subscribe(params => {
      console.log(params);
    });
  }

  ngOnInit() {

  }

}
