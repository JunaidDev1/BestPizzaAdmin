import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as firebase from 'firebase';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

var firebaseConfig = {
  apiKey: "AIzaSyAXCOrAkv40o6thOiiw8PgCnmDmSg9FTYk",
  authDomain: "bestpizza-a0377.firebaseapp.com",
  databaseURL: "https://bestpizza-a0377.firebaseio.com",
  projectId: "bestpizza-a0377",
  storageBucket: "bestpizza-a0377.appspot.com",
  messagingSenderId: "860412427380",
  appId: "1:860412427380:web:1e054a430cd328f657e521",
  measurementId: "G-M8RPVGLBZK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
