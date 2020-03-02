import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
  providers: [ HomeService ]
})
export class SlideshowComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private homeService: HomeService) {

  }
  ngOnInit() {
  }

}
