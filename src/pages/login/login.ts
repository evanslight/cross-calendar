import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase, private sp: StaffProvider, public loadingCtrl: LoadingController) {
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
      this.name1="as@sina.com";
      this.password1="123456";
  }

  goToSignupPage() {
    this.navCtrl.push(SignupPage);
  }
  
  goToCalendarPage() {
    this.navCtrl.push(CalendarPage);
  }

  login(username, password) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.sp.emailLogin(username, password)
    .then(aaa => {this.sp.authenticated; 
    console.log("???"+this.sp.authenticated);
    if ( this.sp.authenticated == true ) {
      loading.dismiss();
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

  // presentLoadingDefault() {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  
  //   loading.present();
  
  //   setTimeout(() => {
  //     loading.dismiss();
  //   }, 1000);
  // }

}

