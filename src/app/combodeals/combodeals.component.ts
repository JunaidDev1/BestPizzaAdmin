import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ComboDeals } from '../models/combo-deals';
import { Constant } from '../models/constant.enum';

@Component({
  selector: 'app-combodeals',
  templateUrl: './combodeals.component.html',
  styleUrls: ['./combodeals.component.scss']
})
export class CombodealsComponent implements OnInit {

  deal: any = {
    items: []
  };
  comboDeals: Array<ComboDeals>;
  loading: boolean = false;
  dealItem: any = '';
  activeIndex: any;

  constructor() {
    this.getAllDeals();
  }

  ngOnInit() {
  }


  getAllDeals() {
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
  }


  addNewDeal() {
    this.deal = { items: [] };
  }

  addItem() {
    if (this.dealItem != '') {
      this.deal.items.push(this.dealItem);
      this.dealItem = '';
    }
  }

  removeItem(index) {
    this.deal.items.splice(index, 1);
  }

  editDeal(deal, index) {
    this.activeIndex = index;
    this.deal = Object.assign({}, deal);
    this.deal.items = [];
    deal.items.forEach(element => {
      this.deal.items.push(element);
    });
  }

  deleteDeal(index) {
    this.activeIndex = index;
  }


  saveDeal() {
    var self = this;
    var postKey;
    var updates = {};
    if (!self.deal.key) {
      self.deal.timestamp = Number(new Date());
      self.deal.uid = localStorage.getItem('uid');
      postKey = firebase.database().ref().child('comboDeals').push().key;
      self.deal.key = postKey;
      self.comboDeals.push(self.deal);
    } else {
      postKey = self.deal.key;
    }
    updates['/comboDeals/' + postKey] = self.deal;
    firebase.database().ref().update(updates).then(() => {
      alert(Constant.DEAL_SUCCESS);
      if (!self.deal.key) {
        self.deal = {};
      } else {
        self.comboDeals[self.activeIndex] = self.deal;
      }
    })
  }


  removeFirebaseDeal() {
    var self = this;
    var updates = {};
    updates['/comboDeals/' + self.comboDeals[self.activeIndex].key] = null;
    firebase.database().ref().update(updates).then(() => {
      alert(Constant.DEAL_REMOVE);
      self.comboDeals.splice(self.activeIndex, 1);
    })
  }

}
