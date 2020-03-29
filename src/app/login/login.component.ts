import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {};

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }


  onLogin() {
    if (this.user.email == 'admin@bestpizza.com' && this.user.password == 112233) {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid email or password!');
    }
  }

}
