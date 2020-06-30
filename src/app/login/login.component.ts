import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Constant } from './../models/constant.enum';

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
    public _fb: FormBuilder
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
    })
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
      })
  }


  getUserData() {
    firebase.database().ref().child('users/' + this.uid)
      .once('value', (snapshot) => {
        var user = snapshot.val();
        alert(Constant.lOGGED_IN);
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
        alert(e.message);
      })
  }


  resetPassword() {
    firebase.auth().sendPasswordResetEmail(this.email)
      .then(() => {
        alert(Constant.RESET_LOGIN);
        this.email = '';
      })
      .catch((e) => {
        this.email = '';
        alert(e);
      })
  }

}
