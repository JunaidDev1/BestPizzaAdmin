import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Deals } from '../models/deals';
import * as firebase from 'firebase';
import { Constant } from '../models/constant.enum';

@Component({
  selector: 'app-add-deal-modal',
  templateUrl: './add-deal-modal.component.html',
  styleUrls: ['./add-deal-modal.component.scss']
})
export class AddDealModalComponent implements OnInit {

  @Input() deal: Deals;
  @Input() firebaseNode: string;
  @Output() modalClosed = new EventEmitter<boolean>();
  allDeals: Array<Deals> = [];
  dealItem: any = '';
  activeIndex: any;

  constructor() { }

  ngOnInit() {

  }

  addItem() {
    if (this.dealItem != '') {
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
      self.deal.key = postKey;
    

    } else {
      postKey = self.deal.key;
    }
    updates[self.firebaseNode + postKey] = self.deal;
    firebase.database().ref().update(updates).then(() => {
      alert(Constant.DEAL_SUCCESS);
      if (!self.deal.key) {
        self.deal = new Deals();
      } else {
        self.allDeals[self.activeIndex] = self.deal;
      }
    });
  }
}
