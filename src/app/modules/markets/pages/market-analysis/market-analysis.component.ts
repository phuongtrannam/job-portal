import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../../markets.service';

@Component({
  selector: 'app-market-analysis',
  templateUrl: './market-analysis.component.html',
  styleUrls: ['./market-analysis.component.css'],
  providers: [MarketsService]
})
export class MarketAnalysisComponent implements OnInit {


  constructor(private marketsService: MarketsService) {

  }
  ngOnInit() {

  }

}