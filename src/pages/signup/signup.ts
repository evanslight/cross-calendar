import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { StaffProvider } from '../../providers/staff/staff';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {
  name1: any;
  password1: any;

  constructor(public navCtrl: NavController, private sp: StaffProvider ) {
  }

   goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }  

  signup(username, password, name) {
    this.sp.emailSignUp(username, password,name)
    .then(aaa => {this.sp.authenticated; 
    console.log(this.sp.authenticated);
    if ( this.sp.authenticated == true ) {
    	this.goToLoginPage();
    } else {
    	this.goToLoginPage();
    }
    })
    .catch(error => console.log(error));
    
  }

}
