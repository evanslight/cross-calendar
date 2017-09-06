import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { CalendarPage } from '../calendar/calendar';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }

   goToSignupPage() {
    this.navCtrl.push(SignupPage);
  }
  
   goToCalendarPage() {
    this.navCtrl.push(CalendarPage);
  }  
}
