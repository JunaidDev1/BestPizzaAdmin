import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Deals } from './models/deals';
import { Constant } from './models/constant.enum';
import { Subject } from 'rxjs';
import { Gallery } from './models/gallery';
import { Pizzas } from './models/pizzas';
import { HttpClient } from '@angular/common/http';
import { apiUser } from './models/api-user';


@Injectable({
  providedIn: 'root'
})
export class DataHelperService {

  public fooSubject = new Subject<any>();

  baseUrl: string = 'https://jsonplaceholder.typicode.com/users';

  deal: Deals = new Deals();
  allImages: Array<Gallery> = [];
  comboDeals: Array<Deals> = [];
  allDeals: Array<Deals> = [];
  allMeals: Array<Deals> = [];
  meal: Deals = new Deals();
  pizza: Pizzas = new Pizzas();
  allPizzas: Array<Pizzas> = [];
  loading: boolean = false;
  dealItem: any = '';
  activeIndex: any;
  dealNode: string;
  comboDealNode: string;
  sideorderNode: string;

  constructor(
    public httpClient: HttpClient
  ) {
    this.getAllDeals();
    this.getComboAllDeals();
    this.getAllMeals();
    this.getAllImages();
    this.getAllPizza();
    this.getAPiUsers();
  }


  getAPiUsers() {
    return this.httpClient.get(this.baseUrl).toPromise();
  }


  getAllDeals() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child(Constant.DEAL_NODE)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp: Deals = data[key];
          temp.key = key;
          self.allDeals.push(temp);
        }
        self.loading = false;
        self.publishSomeData({ allDealsFetched: true });
      })
      .catch((e) => {
        console.log(e.message);
        self.loading = false;
      });
  }


  getComboAllDeals() {
    var self = this;
    firebase.database().ref().child(Constant.COMBO_DEAL_NODE)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp: Deals = data[key];
          temp.key = key;
          self.comboDeals.push(temp);
        }
        self.publishSomeData({ comboDealsFetched: true });
        self.comboDeals.reverse();
      })
      .catch((e) => {
        console.log(e.message);
      });
  }


  getAllMeals() {
    var self = this;
    firebase.database().ref().child(Constant.SIDE_ORDER_NODE)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp: Deals = data[key];
          temp.key = key;
          self.allMeals.push(temp);
        }
        self.publishSomeData({ allMealsFetched: true });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  getAllImages() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child(Constant._GALLERY_NODE)
      .orderByChild('uid').equalTo(localStorage.getItem('uid'))
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allImages.push(temp);
        }
        self.loading = false;
        self.publishSomeData({ allImagesFetched: true });
      })
      .catch((e) => {
        console.log(e.message);
        self.loading = false;
      })
  }

  getAllPizza() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child(Constant._PIZZA_NODE)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allPizzas.push(temp);
        }
        self.loading = false;
        self.publishSomeData({ allPizzaFetched: true });
      })
      .catch((e) => {
        console.log(e.message);
        self.loading = false;
      })
  }

  publishSomeData(temp: any) {
    this.fooSubject.next(temp);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
  }

}
