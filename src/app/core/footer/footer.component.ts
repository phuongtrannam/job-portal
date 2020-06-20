import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  count = {
    countTo: 2401,
    from: 0,
    duration: 1
  };
  countPostJob = {
    countTo: 58142,
    from: 0,
    duration: 1
  };
  countJobSite = {
    countTo: 5,
    from: 0,
    duration: 1
  };
  countCompany = {
    countTo: 15617,
    from: 0,
    duration: 1
  };
  countJob = {
    countTo: 12618,
    from: 0,
    duration: 1
  };
  constructor() {


  }

  ngOnInit() {

  }

}
