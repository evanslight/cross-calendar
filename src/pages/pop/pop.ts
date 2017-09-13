import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop',
  templateUrl: 'pop.html',
})
export class PopPage {
	item: any;
	taskList: any[] = [];
	today = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	console.log('UserId', navParams.get('item'));
  	this.item=navParams.get('item');
	this.getTasks()
  	// console.log(this.taskList);
   //  this.item.tasks.forEach(task => {
   //       console.log(task.val());
   //       this.taskList.push(task.val());
   //    });
  	// console.log('task list is -> ', this.taskList);
  }

  getTasks() {
  	for (let task in this.item.tasks) {
  		var tempDate = new Date(this.item.tasks[task].toDate);
  		if (this.today <= tempDate) {
  			this.taskList.push(this.item.tasks[task]);
  		}
  		
  	}
  }

  goToBack() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.pop();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopPage');
  }

}
