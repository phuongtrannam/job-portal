import { Component, OnInit } from '@angular/core';
declare var Swiper: any;

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})


export class MainSliderComponent implements OnInit {
  public swiper: any;
  constructor() { }

  ngOnInit() {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      // init: false,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        '@0.75': {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        '@1.00': {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        '@1.50': {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      }
    });
  }

}
