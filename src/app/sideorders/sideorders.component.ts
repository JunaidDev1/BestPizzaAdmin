import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { Constant } from '../models/constant.enum';
import { Deals } from '../models/deals';
import { DataHelperService } from '../data-helper.service';

@Component({
  selector: 'app-sideorders',
  templateUrl: './sideorders.component.html',
  styleUrls: ['./sideorders.component.scss']
})
export class SideordersComponent implements OnInit {

  modalClickDel: boolean;
  allMeals: Array<Deals> = [];
  meal: Deals = new Deals();
  activeIndex: any;
  message: string;

  @Input() firebaseNode: string;
  @Input() deletionMsg: string;

  constructor(
    public service: DataHelperService) {
    this.allMeals = service.allMeals;
    service.getObservable().subscribe(data => {
      if (data.allMealsFetched) {
        this.allMeals = service.allMeals;
      }
    });
  }

  ngOnInit() {
  }


  addMeal() {
    var self = this;
    var postKey;
    if (!self.meal.key) {
      postKey = firebase.database().ref().child(Constant.SIDE_ORDER_NODE).push().key;
    } else {
      postKey = self.meal.key;
    }
    var updates = {};
    updates[Constant.SIDEORDER_NODE + postKey] = self.meal;
    firebase.database().ref().update(updates).then(() => {
      this.service.publishSomeData({alertMessage: Constant.SIDE_ORDER, type:Constant.SUCCESS_MSG});
      if (!self.meal.key) {
        self.meal.key = postKey;
        self.allMeals.unshift(self.meal);
      }
      self.meal = new Deals();
    });
  }


  emptyPreviousDeal() {
    this.meal = new Deals();
  }

  updateMeal(meal) {
    this.meal = meal;
  }


  deleteMeal(meal, i) {
    this.meal = meal;
    this.activeIndex = i;
    this.modalClickDel = true;
    this.message = meal.message;
  }


  closeModalDel(e: boolean) {
    this.modalClickDel = e;
  }

}
