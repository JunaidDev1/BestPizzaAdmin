import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { Deals } from '../models/deals';
import { Constant } from '../models/constant.enum';
import { DataHelperService} from '../data-helper.service'


@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  @Input() allDeals: Array<Deals> = [];
  @Input() firebaseNode: string;
  @Input() deletionMsg: string;

  message: string;
  modalClick: boolean;
  modalClickDel: boolean;
  deal: Deals = new Deals();
  loading: boolean = false;
  dealItem: any = '';
  activeIndex: any;


  constructor(public service: DataHelperService) {

  }

  ngOnInit() {
  }


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
    this.message = deal.message;
    this.modalClickDel = true;
    this.deal = deal;
    this.activeIndex = index;
  }


}
