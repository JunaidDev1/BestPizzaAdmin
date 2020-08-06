import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Deals } from '../models/deals';
import { Constant } from '../models/constant.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  deal: Deals = new Deals();
  comboDeals: Array<Deals> = [];
  allDeals: Array<Deals> = [];
  loading: boolean = false;
  dealItem: any = '';
  activeIndex: any;

  dealDeletionMsg: string;
  comboDealDeletionMsg: string;
  sideorderDeletionMsg: string;

  dealNode: string;
  comboDealNode: string;
  sideorderNode: string;

  constructor() {
    this.getAllDeals();
    this.getComboAllDeals();
  }

  ngOnInit() {
    this.dealDeletionMsg = Constant.HOTDEAL_DELETION_MSG;
    this.comboDealDeletionMsg = Constant.COMBODEAL_DELETION_MSG;
    this.sideorderDeletionMsg = Constant.SIDEORDER_DELETION_MSG;

    this.dealNode = Constant.HOTDEAL_NODE;
    this.comboDealNode = Constant.COMBODEAL_NODE;
    this.sideorderNode = Constant.SIDEORDER_Node;
  }

  getAllDeals() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('deals')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allDeals.push(temp);
        }
        self.loading = false;
      })
      .catch((e) => {
        console.log(e.message);
        self.loading = false;
      })
    console.log(this.allDeals);
  }


  getComboAllDeals() {
    var self = this;
    firebase.database().ref().child('comboDeals')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.comboDeals.push(temp);
        }
        self.comboDeals.reverse();
      })
      .catch((e) => {
        console.log(e.message);
      })
    console.log(this.comboDeals);
  }
}
