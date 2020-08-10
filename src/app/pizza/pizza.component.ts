import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Pizzas } from './../models/pizzas';
import { Constant } from '../models/constant.enum';
import { DataHelperService } from '../data-helper.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {

  pizza: Pizzas = new Pizzas();
  allPizzas: Array<Pizzas> = [];
  loading: boolean = false;
  activeIndex: any;

  constructor(public service: DataHelperService) {
    this.allPizzas = this.service.allPizzas;
    service.getObservable().subscribe(data => {
      if (data.allPizzaFetched) {
        this.allPizzas = service.allPizzas;
      }
    });
  }

  ngOnInit() {
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
      postKey = firebase.database().ref().child(Constant._PIZZA_NODE).push().key;
    } else {
      postKey = self.pizza.key;
    }
    updates[Constant.PIZZA_NODE + postKey] = self.pizza;
    firebase.database().ref().update(updates).then(() => {
      alert(Constant.DEAL_SUCCESS);
      if (!self.pizza.key) {
        self.pizza.key = postKey;
        self.allPizzas.unshift(self.pizza);
        self.pizza = new Pizzas();
      } else {
        self.allPizzas[self.activeIndex] = self.pizza;
      }
    });
  }

  removeFirebaseDeal() {
    var self = this;
    var updates = {};
    updates[Constant.PIZZA_NODE + self.allPizzas[self.activeIndex].key] = null;
    firebase.database().ref().update(updates).then(() => {
      alert(Constant.PIZZA_REMOVE);
      self.allPizzas.splice(self.activeIndex, 1);
    });
  }

}
