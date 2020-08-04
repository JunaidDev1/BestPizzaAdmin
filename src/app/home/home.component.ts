import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Deals } from '../models/deals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  deal: Deals = new Deals();
  comboDeals: Array<Deals> = [];
  allDeals: Array<Deals> = [];
  loading: boolean = false;
  dealItem: any = '';
  activeIndex: any;
  constructor() { 
    this.getAllDeals();
    this.getComboAllDeals();
  }

  ngOnInit() {
  }

  getAllDeals() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('deals')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allDeals.push(temp);
        }
        self.loading = false;
      })
      .catch((e) => {
        console.log(e.message);
        self.loading = false;
      })
  }


  getComboAllDeals() {
    var self = this;
    firebase.database().ref().child('comboDeals')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.comboDeals.push(temp);
        }
        self.comboDeals.reverse();
      })
      .catch((e) => {
        console.log(e.message);
      })
  }
}
