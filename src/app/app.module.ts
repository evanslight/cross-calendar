import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { DetailPage } from '../pages/detail/detail';
import { SignupPage } from '../pages/signup/signup';
import { Calendar } from '@ionic-native/calendar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}