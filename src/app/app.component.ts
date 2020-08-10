import { Component } from '@angular/core';
import { DataHelperService } from './data-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showAlert: boolean;
  message: string;
  type: string;
  title = 'BestPizzaAdmin';
  constructor(public service: DataHelperService) {
    this.service.getObservable().subscribe(data => {
      if (data.alertMessage) {
        this.showAlert = true;
        this.message = data.alertMessage;
        this.type = data.type;
        setTimeout(() => {
          this.showAlert=false;
        }, 3000);
      }
    })
  }

  onActivate(event) {
    window.scroll(0, 0);
  }




}
