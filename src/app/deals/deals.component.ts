import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Deals } from '../models/deals';
import { Constant } from '../models/constant.enum';


@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  deal: Deals;
  allDeals: Array<Deals>;
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
  }


  addNewDeal() {
    this.deal = new Deals();
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
      self.deal.uid = 'xqI3oZ7q3AYFyYZA8NRPrjqvGGE2';
      postKey = firebase.database().ref().child('deals').push().key;
      self.deal.key = postKey;
      self.allDeals.push(self.deal);
    } else {
      postKey = self.deal.key;
    }
    updates['/deals/' + postKey] = self.deal;
    firebase.database().ref().update(updates).then(() => {
      alert(Constant.DEAL_SUCCESS);
      if (!self.deal.key) {
        self.deal = new Deals();
      } else {
        self.allDeals[self.activeIndex] = self.deal;
      }
    })
  }


  removeFirebaseDeal() {
    var self = this;
    var updates = {};
    updates['/deals/' + self.allDeals[self.activeIndex].key] = null;
    firebase.database().ref().update(updates).then(() => {
      alert(Constant.DEAL_REMOVE);
      self.allDeals.splice(self.activeIndex, 1);
    })
  }



}
