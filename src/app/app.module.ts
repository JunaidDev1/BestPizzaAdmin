import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as firebase from 'firebase';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DealsComponent } from './deals/deals.component';
import { CombodealsComponent } from './combodeals/combodeals.component';
import { SideordersComponent } from './sideorders/sideorders.component';
import { PizzaComponent } from './pizza/pizza.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';

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
    FooterComponent,
    DealsComponent,
    CombodealsComponent,
    SideordersComponent,
    PizzaComponent,
    GalleryComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
