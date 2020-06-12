import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
  providers: [HomeService]
})
export class HomeSearchComponent implements OnInit {
  public menu: any = [
    {name: 'Lĩnh vực', selected: true, placehoder: 'VD: CNTT', logo: 'fa fa-home'},
    {name: 'Ngành nghề', selected: false, placehoder: 'VD: Lập trình Web', logo: 'fa fa-map-marker'},
    {name: 'Công việc', selected: false, placehoder: 'VD: FullStack DEV', logo: 'fa fa-building '},
    
  ];
  logo= "fa fa-home";
  ph= 'VD: CNTT';
  
  thayDoi(index) {
    this.menu.forEach(element => {
      element.selected = false;
    });
    this.menu[index].selected = true;
    this.logo=this.menu[index].logo;
    this.ph= this.menu[index].placehoder;
  }
  constructor(private homeService: HomeService) {

  }
  ngOnInit() {

  }

}
