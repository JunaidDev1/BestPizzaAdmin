import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-combodeals',
  templateUrl: './combodeals.component.html',
  styleUrls: ['./combodeals.component.scss']
})
export class CombodealsComponent implements OnInit {

  comboDeals: any = [];
  loading: boolean = false;

  constructor() {
    this.getAllDeals();
  }

  ngOnInit() {
  }


  getAllDeals() {
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
