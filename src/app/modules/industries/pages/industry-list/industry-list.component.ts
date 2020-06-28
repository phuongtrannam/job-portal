import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.css']
})
export class IndustryListComponent implements OnInit {
  numApi = 0;
  isLoading = true;
  constructor() { }

  ngOnInit() {
  }
  increase_industry(e){
    this.numApi += 1;
    if(this.numApi === 1){
      this.isLoading = false;
    }
  }
}
