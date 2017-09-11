import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { StaffProvider } from '../../providers/staff/staff';
import { DetailPage } from '../detail/detail';


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

today = new Date();
dd = this.today.getDate();
mm = this.today.getMonth()+1; //January is 0!
yyyy = this.today.getFullYear();
newmm = "";
thisday = "";
newdd = "";
startday = "";
endday = "";



  constructor(public navCtrl: NavController, private calendar: Calendar, private sp: StaffProvider) {
  	  this.calendar.createCalendar('MyCalendar').then(
  	(msg) => { console.log(msg); },
  	(err) => { console.log(err); }
	);
      if ( this.mm < 10) {
        this.newmm = ('0'+this.mm).toString();
      } else {
        this.newmm = this.mm.toString();
      }

      if ( this.dd < 10) {
        this.newdd = ('0'+this.dd).toString();
      } else {
        this.newdd = this.dd.toString();
      }
      this.thisday = (this.yyyy+'-'+this.newmm+'-'+this.newdd).toString();
      this.startday = this.thisday;
      this.endday = this.thisday;
  }

  public event = {
    month: this.thisday,
    timeEnds: '2017-09-06',
    timeStarts: '09:00',
    timeEnd: '17:00',
  }
  submitdata(start, end, timebegin, timeend, taskName, location){
    timebegin=this.event.timeStarts;
    timeend=this.event.timeEnd;
    console.log(start +" "+ end +" "+timebegin + " "+timeend);
    this.sp.updateUserTask(start, end, timebegin, timeend, taskName, location);
  }

  ionViewDidLoad(thisday) {
    thisday=this.startday;
	console.log(thisday);

  }

  goToDetailPage() {
    this.navCtrl.push(DetailPage);
  }
}
