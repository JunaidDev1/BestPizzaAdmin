import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {

  pizza: any = {};
  allPizzas: any = [];
  loading: boolean = false;
  activeIndex: any;

  constructor() {
    this.getAllDeals();
  }

  ngOnInit() {
  }


  getAllDeals() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('pizzas')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allPizzas.push(temp);
        }
        self.loading = false;
      })
      .catch((e) => {
        console.log(e.message);
        self.loading = false;
      })
  }


  addNewDeal() {
    this.pizza = {};
  }


  editDeal(pizza, index) {
    this.activeIndex = index;
    this.pizza = Object.assign({}, pizza);
  }


  deleteDeal(index) {
    this.activeIndex = index;
  }


  saveDeal() {
    var self = this;
    var postKey;
    var updates = {};
    if (!self.pizza.key) {
      self.pizza.timestamp = Number(new Date());
      self.pizza.uid = 'xqI3oZ7q3AYFyYZA8NRPrjqvGGE2';
      postKey = firebase.database().ref().child('pizzas').push().key;
      self.pizza.key = postKey;
      self.allPizzas.push(self.pizza);
    } else {
      postKey = self.pizza.key;
    }
    updates['/pizzas/' + postKey] = self.pizza;
    firebase.database().ref().update(updates).then(() => {
      alert('Deal saved successfully!!!');
      if (!self.pizza.key) {
        self.pizza = {};
      } else {
        self.allPizzas[self.activeIndex] = self.pizza;
      }
    })
  }


  removeFirebaseDeal() {
    var self = this;
    var updates = {};
    updates['/pizzas/' + self.allPizzas[self.activeIndex].key] = null;
    firebase.database().ref().update(updates).then(() => {
      alert('Pizza removed permanently!!');
      self.allPizzas.splice(self.activeIndex, 1);
    })
  }



}
