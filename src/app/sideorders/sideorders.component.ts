import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sideorders',
  templateUrl: './sideorders.component.html',
  styleUrls: ['./sideorders.component.scss']
})
export class SideordersComponent implements OnInit {

  allMeals: any = [];
  meal: any = {};

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
    var postKey = firebase.database().ref().child('sideorders').push().key;
    var updates = {};
    updates['/sideorders/' + postKey] = self.meal;
    firebase.database().ref().update(updates).then(() => {
      alert('New meal added succefully!');
      self.meal.key = postKey;
      self.allMeals.push(self.meal);
      self.meal = {};
    })
  }

}
