import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {

    $('.elementor-counter-number').each(function () {
      $(this).prop('Counter', 0).animate({
              Counter: $(this).data('value')
          }, {
          duration: 1000,
          easing: 'swing',
          step: function (now) {                      
              $(this).text(this.Counter.toFixed(2));
          }
      });
  });
  }

  ngOnInit() {

  }

}
