import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { Deals } from '../models/deals';
import { Constant } from '../models/constant.enum';


@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  @Input() allDeals: Array<Deals> = [];
 message:string;
  modalClick: boolean;
  modalClickDel:boolean;
  deal: Deals = new Deals();
  // allDeals: Array<Deals> = [];
  loading: boolean = false;
  dealItem: any = '';
  activeIndex: any;

  constructor() {
    // this.getAllDeals();
  }

  ngOnInit() {
  }


  // getAllDeals() {
  //   var self = this;
  //   self.loading = true;
  //   firebase.database().ref().child('deals')
  //     .once('value', (snapshot) => {
  //       var data = snapshot.val();
  //       for (var key in data) {
  //         var temp = data[key];
  //         temp.key = key;
  //         self.allDeals.push(temp);
  //       }
  //       self.loading = false;
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //       self.loading = false;
  //     })
  // }


  addNewDeal() {
    this.deal = new Deals();
    this.modalClick = true;
  }


  closeModal(e: boolean) {
    this.modalClick = e;
  }
  closeModalDel(e: boolean) {
    this.modalClickDel = e;
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
    this.modalClick = true;
  }

  deleteDeal(deal, index) {
    this.activeIndex = index;
    this.message=deal.message;
    this.modalClickDel = true;
    this.deal=deal;
    this.activeIndex=index;
  }


  saveDeal() {
    var self = this;
    var postKey;
    var updates = {};
    if (!self.deal.key) {
      self.deal.timestamp = Number(new Date());
      self.deal.uid = localStorage.getItem('uid');
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


  // removeFirebaseDeal() {
  //   var self = this;
  //   var updates = {};
  //   updates['/deals/' + self.allDeals[self.activeIndex].key] = null;
  //   firebase.database().ref().update(updates).then(() => {
  //     alert(Constant.DEAL_REMOVE);
  //     self.allDeals.splice(self.activeIndex, 1);
  //   })
  // }



}
