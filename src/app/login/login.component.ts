import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Constant } from './../models/constant.enum';
import { DataHelperService } from '../data-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  onLoginForm: FormGroup;
  email: string = '';
  resetEmail: string;
  password: string = '';
  loading: boolean = false;
  uid: string = '';

  constructor(
    public router: Router,
    public _fb: FormBuilder,
    public service: DataHelperService
  ) {
    localStorage.setItem('userLoggedIn', 'false');
  }


  ngOnInit() {
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }


  userLogin() {
    this.loading = true;
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        if (user) {
          this.uid = firebase.auth().currentUser.uid;
          this.getUserData();
        }
      })
      .catch((e) => {
        this.loading = false;
        alert(e.message);
      });
  }


  getUserData() {
    firebase.database().ref().child('users/' + this.uid)
      .once('value', (snapshot) => {
        var user = snapshot.val();
        this.service.publishSomeData({alertMessage: Constant.lOGGED_IN, type:Constant.SUCCESS_MSG});
        localStorage.setItem('firstName', user.firstName);
        localStorage.setItem('lastName', user.lastName);
        localStorage.setItem('email', user.email);
        localStorage.setItem('uid', this.uid);
        localStorage.setItem('userLoggedIn', 'true');
        this.loading = false;
        this.router.navigate(['/home']);
      })
      .catch((e) => {
        this.loading = false;
        this.service.publishSomeData({alertMessage: e.message, type:Constant.ERROR_MSG});
      });
  }


  resetPassword() {
    firebase.auth().sendPasswordResetEmail(this.email)
      .then(() => {
        this.service.publishSomeData({alertMessage: Constant.RESET_LOGIN, type:Constant.SUCCESS_MSG});
        this.email = '';
      })
      .catch((e) => {
        this.email = '';
        this.service.publishSomeData({alertMessage: e.message, type:Constant.ERROR_MSG});
      })
  }


}
