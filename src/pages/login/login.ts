import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { CalendarPage } from '../calendar/calendar';

import { StaffProvider } from '../../providers/staff/staff';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  booklists: FirebaseListObservable<any[]>;
  msgVal: string = '';
  name1: any;
  password1: any;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase, private sp: StaffProvider) {
    this.booklists = af.list('/Books', {
      query: {
        limitToLast: 50
      }
    });
    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });

    this.user = this.afAuth.authState;
  }

  goToSignupPage() {
    this.navCtrl.push(SignupPage);
  }
  
  goToCalendarPage() {
    this.navCtrl.push(CalendarPage);
  }

  login(username, password) {
    this.sp.emailLogin(username, password)
    .then(aaa => {this.sp.authenticated; 
    console.log("???"+this.sp.authenticated);
    if ( this.sp.authenticated == true ) {
      this.goToCalendarPage();
    }
    });
    
  }
  
  logout() {
      this.afAuth.auth.signOut();
  }
  
  Send(desc: string) {
      this.items.push({ message: desc});
      this.msgVal = '';
  }  
}

