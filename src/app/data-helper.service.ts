import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Deals } from './models/deals';
import { Constant } from './models/constant.enum';



@Injectable({
  providedIn: 'root'
})
export class DataHelperService {
  deal: Deals = new Deals();
  comboDeals: Array<Deals> = [];
  allDeals: Array<Deals> = [];
  allMeals: Array<Deals> = [];
  meal: Deals = new Deals();
  loading: boolean = false;
  dealItem: any = '';
  activeIndex: any;
  dealNode: string;
  comboDealNode: string;
  sideorderNode: string;

  constructor() { 
    this.getAllDeals();
    this.getComboAllDeals();
    this.getAllMeals();

  }

    getAllDeals() {
      var self = this;
      self.loading = true;
      firebase.database().ref().child(Constant.DEAL_NODE)
        .once('value', (snapshot) => {
          var data = snapshot.val();
          for (var key in data) {
            var temp:Deals = data[key];
            temp.key = key;
            temp.message="Hot Deal";
            temp.node="/deals/";
            self.allDeals.push(temp);
          }
          self.loading = false;
        })
        .catch((e) => {
          console.log(e.message);
          self.loading = false;
        })
        console.log(this.allDeals);
    }
    
    
    getComboAllDeals() {
      var self = this;
      firebase.database().ref().child(Constant.COMBO_DEAL_NODE)
        .once('value', (snapshot) => {
          var data = snapshot.val();
          for (var key in data) {
            var temp:Deals = data[key];
            temp.key = key;
            temp.message="Combo Deal";
            temp.node="/comboDeals/";
            self.comboDeals.push(temp);
          }
          self.comboDeals.reverse();
        })
        .catch((e) => {
          console.log(e.message);
        })
        console.log(this.comboDeals);
    }

    getAllMeals() {
      var self = this;
      firebase.database().ref().child(Constant.SIDE_ORDER_Node)
        .once('value', (snapshot) => {
          var data = snapshot.val();
          for (var key in data) {
            var temp:Deals = data[key];
            temp.key = key;
            self.allMeals.push(temp);
          }
        })
        .catch((e) => {
          console.log(e.message);
        })
    }
}
