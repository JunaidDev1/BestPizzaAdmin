import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from '../models/constant.enum';
import { DataHelperService } from '../data-helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public service: DataHelperService
  ) {
    if (localStorage.getItem('userLoggedIn') !== 'true') {
      this.logout();
    }
  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.service.publishSomeData({ alertMessage: Constant.lOGGED_OUT, type: Constant.SUCCESS_MSG });
  }

}
