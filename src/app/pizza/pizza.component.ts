import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Pizzas } from './../models/pizzas';
import { Constant } from '../models/constant.enum';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {

  pizza: Pizzas;
  allPizzas: Array<Pizzas>;
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
    this.pizza = new Pizzas();
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
      self.pizza.uid = localStorage.getItem('uid');
      postKey = firebase.database().ref().child('pizzas').push().key;
      self.pizza.key = postKey;
      self.allPizzas.push(self.pizza);
    } else {
      postKey = self.pizza.key;
    }
    updates['/pizzas/' + postKey] = self.pizza;
    firebase.database().ref().update(updates).then(() => {
      alert(Constant.DEAL_SUCCESS);
      if (!self.pizza.key) {
        self.pizza = new Pizzas();
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
      alert(Constant.PIZZA_REMOVE);
      self.allPizzas.splice(self.activeIndex, 1);
    })
  }



}
