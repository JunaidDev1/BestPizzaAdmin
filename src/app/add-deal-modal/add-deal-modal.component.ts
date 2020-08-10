import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Deals } from '../models/deals';
import * as firebase from 'firebase';
import { Constant } from '../models/constant.enum';
import { DataHelperService } from '../data-helper.service';

@Component({
  selector: 'app-add-deal-modal',
  templateUrl: './add-deal-modal.component.html',
  styleUrls: ['./add-deal-modal.component.scss']
})
export class AddDealModalComponent implements OnInit {

  @Input() deal: Deals;
  @Input() firebaseNode: string;
  @Output() modalClosed = new EventEmitter<boolean>();
  dealItem: string = '';

  constructor(
    public service: DataHelperService
  ) { }

  ngOnInit() {

  }

  addItem() {
    if (this.dealItem !== '') {
      this.deal.items.push(this.dealItem);
      this.dealItem = '';
    }
  }

  emitCloseModal() {
    this.modalClosed.emit(false);
  }


  removeItem(index) {
    this.deal.items.splice(index, 1);
  }

  saveDeal() {
    var self = this;
    var postKey;
    var updates = {};
    if (!self.deal.key) {
      self.deal.timestamp = Number(new Date());
      self.deal.uid = localStorage.getItem('uid');
      postKey = firebase.database().ref().child(self.firebaseNode).push().key;
    } else {
      postKey = self.deal.key;
    }
    updates[self.firebaseNode + postKey] = self.deal;
    firebase.database().ref().update(updates).then(() => {
      this.service.publishSomeData({alertMessage: Constant.DEAL_SUCCESS, type:Constant.SUCCESS_MSG});
      if (!self.deal.key) {
        self.deal.key = postKey;
        self.firebaseNode === Constant.HOTDEAL_NODE ? self.service.allDeals.unshift(self.deal)
          : self.service.comboDeals.unshift(self.deal);
        self.service.publishSomeData({ allDealsFetched: true });
        self.service.publishSomeData({ comboDealsFetched: true });
      } else {
        self.replaceDealInService();
      }
    });
    this.emitCloseModal()
  }


  replaceDealInService() {
    let serviceArray: Array<Deals> = [];
    serviceArray = this.firebaseNode === Constant.HOTDEAL_NODE ? this.service.allDeals : this.service.comboDeals;
    let index: number;
    index = serviceArray.findIndex(deal => deal.key === this.deal.key);
    serviceArray[index] = this.deal;
    this.service.publishSomeData({ allDealsFetched: true });
    this.service.publishSomeData({ comboDealsFetched: true });
  }

}
