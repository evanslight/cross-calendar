import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PopPage } from '../pop/pop';
import { ModalController } from 'ionic-angular';
import { StaffProvider } from '../../providers/staff/staff';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
	myInput: any;
	searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,  private sp: StaffProvider) {
  	 this.initializeItems();
  }

  onInput (){

  }
  onCancel(){

  }

  presentModal() {
    let modal = this.modalCtrl.create(PopPage);
    modal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  initializeItems() {
  	this.sp.getAllUser();
  	console.log(this.sp.getAllUser());
    this.items = [
      'Amsterdam',
      'Bogota',
    ]
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
