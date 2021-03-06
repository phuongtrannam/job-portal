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
    {name: '/regions', text: 'Khu vực'},
    {name: '/industries', text: 'Lĩnh vực'},
    {name: '/jobs', text: 'Vị trí công việc'},
    {name: '/companies', text: 'Công ty'}
  ];
  searchJobTerm = '';
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
  searchJob(jobNameParam: string ){
    this.router.navigate(['/jobs/search', jobNameParam ]);
  }

}
