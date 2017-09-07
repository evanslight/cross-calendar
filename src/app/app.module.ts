import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { DetailPage } from '../pages/detail/detail';
import { SignupPage } from '../pages/signup/signup';
import { Calendar } from '@ionic-native/calendar';
import { StaffProvider } from '../providers/staff/staff';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyCVpAFXwbvElEjiC9iw3S9RtLaoVgIkloM",
    authDomain: "calendar-auth-ee4d8.firebaseapp.com",
    databaseURL: "https://calendar-auth-ee4d8.firebaseio.com",
    projectId: "calendar-auth-ee4d8",
    storageBucket: "calendar-auth-ee4d8.appspot.com",
    messagingSenderId: "59076430653"
};

export const deepLinkConfig: DeepLinkConfig = {
  links: [
    { component: LoginPage, name: "login", segment: ""},
    { component: SignupPage, name: "signup", segment: "event/:id", defaultHistory: [LoginPage] }
  ]
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CalendarPage,
    DetailPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, deepLinkConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CalendarPage,
    DetailPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    Calendar,
    SplashScreen,
    AngularFireModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StaffProvider
  ]
})
export class AppModule {}