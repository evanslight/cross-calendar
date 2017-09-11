import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';

import { NavController } from 'ionic-angular';



/*
  Generated class for the StaffProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
// Must export the config


@Injectable()
export class StaffProvider {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  booklists: FirebaseListObservable<any[]>;
  msgVal: string = '';
  adaRef: any;
  displayName: string = '';

  authState: any = null;

  constructor( private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
   
  }

  // goToCalendarPage() {
  //   this.navCtrl.push(CalendarPage);
  // }
  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest'
    } else if (this.currentUserAnonymous) {
      return 'Anonymous'
    } else {
      return this.authState['displayName'] || 'User without a Name'
    }
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string, name: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.displayName = name
        this.updateUserData()
        console.log("->"+this.displayName)
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
          const path = `users/${this.currentUserId}`;
          this.adaRef = firebase.database().ref(path);
          this.adaRef.once('value').then((snapshot)=> {
            this.displayName=snapshot.val().name
            console.log(",", snapshot.val())
            console.log("->>>"+this.displayName)
        }) ;
        // this.updateUserData()
        // this.adaRef = this.adaRef.push();
        // this.adaRef.set({
        //   'name': 'ada'
        // });

        // console.log("->"+this.displayName)
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut();
    // this.router.navigate(['/'])
  }


  //// Helpers ////

  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
      email: this.authState.email,
      name: this.displayName,
      tasks: []
    }

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }

  public updateUserTask(fromDate: string, toDate: string, startTime: string, endTime: string, taskTitle: string, location: string): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    // const path = `users/${this.currentUserId}`; // Endpoint on firebase
    // const data = {
    //   email: this.authState.email,
    //   name: this.displayName,
    //   tasks: [{
    //     "title": taskTitle,
    //     "fromDate": fromDate,
    //     "toDate": toDate,
    //     "startTime": startTime,
    //     "endTime": endTime
    //   }]

    // }

    const path = `users/${this.currentUserId}/tasks`; // Endpoint on firebase
    this.adaRef = firebase.database().ref(path);

    const data = {
        "title": taskTitle,
        "location": location,
        "fromDate": fromDate,
        "toDate": toDate,
        "startTime": startTime,
        "endTime": endTime
    }

    this.adaRef.push(data)

    // this.db.object(path).update(data)
    //   .catch(error => console.log(error));

  }


}
