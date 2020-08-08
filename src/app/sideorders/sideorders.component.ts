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
    this.allMeals = this.service.allMeals;
  }

  ngOnInit() {
  }


  addMeal() {
    var self = this;
    var postKey
    if (!self.meal.key) {
      postKey = firebase.database().ref().child('sideorders').push().key;
    } else {
      postKey = self.meal.key;
    }
    var updates = {};
    updates['/sideorders/' + postKey] = self.meal;
    firebase.database().ref().update(updates).then(() => {
      alert(Constant.DEAL_SUCCESS);
      if (!self.meal.key) {
        self.meal.key = postKey;
        self.allMeals.push(self.meal);
      }
      self.meal = new Deals();
    })
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
