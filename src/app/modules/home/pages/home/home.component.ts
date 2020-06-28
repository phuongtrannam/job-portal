import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { LoadingComponent } from './../../../../core/loading/loading.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  numApi = 0;
  isLoading = true;
  constructor() {

  }
  ngOnInit() {
  }
  increase_industry(e){
    this.numApi += 1;
    if(this.numApi === 3){
      this.isLoading = false;
    }
  }
  increase_search(e){
    this.numApi += 1;
    if(this.numApi === 3){
      this.isLoading = false;
    }
  }

}
