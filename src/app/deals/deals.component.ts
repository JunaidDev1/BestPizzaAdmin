import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  allDeals: any = [];
  loading: boolean = false;

  constructor() {
    this.getAllDeals();
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


}
