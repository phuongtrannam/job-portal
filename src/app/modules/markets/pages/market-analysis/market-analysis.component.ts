import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../../markets.service';
import { HeaderService } from 'src/app/core/header/header.service';

@Component({
  selector: 'app-market-analysis',
  templateUrl: './market-analysis.component.html',
  styleUrls: ['./market-analysis.component.css'],
  providers: [MarketsService]
})
export class MarketAnalysisComponent implements OnInit {


  constructor(private marketsService: MarketsService,
    public headerService: HeaderService) {

  }
  ngOnInit() {
    this.headerService.regions = '/markets';
  }

}
