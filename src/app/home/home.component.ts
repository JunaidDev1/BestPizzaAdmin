import { Component, OnInit } from '@angular/core';
import { Deals } from '../models/deals';
import { Constant } from '../models/constant.enum';
import { DataHelperService } from '../data-helper.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  comboDeals: Array<Deals> = [];
  allDeals: Array<Deals> = [];
  dealDeletionMsg: string;
  comboDealDeletionMsg: string;
  sideorderDeletionMsg: string;

  dealNode: string;
  comboDealNode: string;
  sideorderNode: string;

  constructor(public service: DataHelperService) {
    this.allDeals = this.service.allDeals;
    this.comboDeals = this.service.comboDeals;

    service.getObservable().subscribe(data => {
      if (data.allDealsFetched) {
        this.allDeals = service.allDeals;
      } else if (data.comboDealsFetched) {
        this.comboDeals = service.comboDeals;
      }
    });
  }

  ngOnInit() {
    this.dealDeletionMsg = Constant.HOTDEAL_DELETION_MSG;
    this.comboDealDeletionMsg = Constant.COMBODEAL_DELETION_MSG;
    this.sideorderDeletionMsg = Constant.SIDEORDER_DELETION_MSG;

    this.dealNode = Constant.HOTDEAL_NODE;
    this.comboDealNode = Constant.COMBODEAL_NODE;
    this.sideorderNode = Constant.SIDEORDER_NODE;
  }
}
