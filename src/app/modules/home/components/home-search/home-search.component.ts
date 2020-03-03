import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css'],
  providers: [HomeService]
})
export class HomeSearchComponent implements OnInit {


  constructor(private homeService: HomeService) {

  }
  ngOnInit() {

  }

}
