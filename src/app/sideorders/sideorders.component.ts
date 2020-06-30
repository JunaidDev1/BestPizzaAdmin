import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Sideorders } from './../models/sideorders';
import { Constant } from '../models/constant.enum';

@Component({
  selector: 'app-sideorders',
  templateUrl: './sideorders.component.html',
  styleUrls: ['./sideorders.component.scss']
})
export class SideordersComponent implements OnInit {

  allMeals: Array<Sideorders> = [];
  meal: Sideorders = new Sideorders();
  activeIndex: any;

  constructor() {
    this.getAllDeals();
  }

  ngOnInit() {
  }


  getAllDeals() {
    var self = this;
    firebase.database().ref().child('sideorders')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allMeals.push(temp);
        }
      })
      .catch((e) => {
        console.log(e.message);
      })
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
      self.meal = new Sideorders();
    })
  }


  updateMeal(meal) {
    this.meal = meal;
  }


  deleteMeal(meal, i) {
    this.meal = meal;
    this.activeIndex = i;
  }


  removeFirebaseMeal() {
    var self = this;
    var updates = {};
    updates['/sideorders/' + this.meal.key] = null;
    firebase.database().ref().update(updates).then(() => {
      self.allMeals.splice(self.activeIndex, 1);
      alert(Constant.MEAL_REMOVED);
    })
  }


}
