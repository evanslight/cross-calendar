import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

today = new Date();
dd = this.today.getDate();
mm = this.today.getMonth()+1; //January is 0!
yyyy = this.today.getFullYear();

  constructor(public navCtrl: NavController, private calendar: Calendar) {
  	  this.calendar.createCalendar('MyCalendar').then(
  	(msg) => { console.log(msg); },
  	(err) => { console.log(err); }
	);
  }

  public event = {
    month: '2017-09-06',
    timeStarts: '08:00',
    timeEnds: '2017-09-06',
    timeEnd: '08:00',
  }

  ionViewDidLoad(today) {
  	today=this.today
	console.log(today);

  }

}
