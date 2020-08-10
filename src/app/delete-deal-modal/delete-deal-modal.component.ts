import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Deals } from '../models/deals';
import * as firebase from 'firebase';
import { Constant } from '../models/constant.enum';


@Component({
  selector: 'app-delete-deal-modal',
  templateUrl: './delete-deal-modal.component.html',
  styleUrls: ['./delete-deal-modal.component.scss']
})
export class DeleteDealModalComponent implements OnInit {

  @Output() modalClosedDel = new EventEmitter<boolean>();
  @Input() deal: Deals = new Deals();
  @Input() allDeals: Array<Deals> = [];
  @Input() activeIndex: any;
  @Input() message: string;
  @Input() firebaseNode: string;

  constructor() { }

  ngOnInit() {
  }

  emitCloseModal() {
    this.modalClosedDel.emit(false);
  }

  removeFirebaseDeal() {
    var self = this;
    var updates = {};
    updates[`${this.firebaseNode}` + self.allDeals[self.activeIndex].key] = null;
    firebase.database().ref().update(updates).then(() => {
      alert(Constant.DEAL_REMOVE);
      self.emitCloseModal();
      self.allDeals.splice(self.activeIndex, 1);
    });
    this.emitCloseModal();
  }

}
