import { Component } from '@angular/core';
import { NavController, LoadingController,ModalController } from 'ionic-angular';
import { PopPage } from '../pop/pop';
import { StaffProvider } from '../../providers/staff/staff';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
	myInput: any;
	searchQuery: string = '';
  	items: any[];
  	originalItems: any[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,  private sp: StaffProvider, public loadingCtrl: LoadingController) {
  	 this.initializeItems();
  	 // this.items = this.sp.namelist;
  	 console.log("start!!"+this.items);
  }

  presentModal(item) {
    let modal = this.modalCtrl.create(PopPage, { item: item });
    modal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

 //  initializeItems() {
 //  	// this.sp.getAllUser().then((value) => {
 //  	// 	console.log("->"+value);
 //  	// })

	// // this.items = this.sp.getAllUser;

 //  	this.sp.Send().subscribe( usernames => {
 //        console.log("lalala");
 //        console.log(usernames);
 //        var temp = []
 //        var tempmail = []
 //        usernames.forEach(lalala => {
 //           console.log(lalala.val());
 //           temp.push(lalala.val().name,lalala.val().email)
 //        })
 //        console.log("the temp is "+temp);
 //        this.items = temp;
 //        this.originalItems=this.items;
	// });

 //    // this.items = [
 //    //   'Amsterdam',
 //    //   'Bogota',
 //    // ]
 //  }

  initializeItems() {
  	// this.sp.getAllUser().then((value) => {
  	// 	console.log("->"+value);
  	// })

	// this.items = this.sp.getAllUser;

  	this.sp.Send().subscribe( usernames => {
        console.log("lalala");
        console.log(usernames);

        var temp = []
        usernames.forEach(lalala => {
           console.log(lalala.val());
           temp.push(lalala.val())

        })
        // console.log("the temp is "+temp);
        this.items = temp;
        this.originalItems=this.items;
	});

    // this.items = [
    //   'Amsterdam',
    //   'Bogota',
    // ]
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  onLoad(){
  	this.items = this.sp.namelist;
  	this.sp.Send().subscribe(    usernames => {
        	console.log("lalala");
        	console.log(usernames);
        	usernames.forEach(lalala => {
        	   console.log(lalala.val().name);
        	})
		}
    );
  	console.log("load!!"+this.items);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
	// this.items = this.sp.namelist;
    this.items=this.originalItems;
  	// console.log("the item in getItem is->"+this.items);
    // set val to the value of the searchbar
    let val = ev.target.value;
    var temp = []
       

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.items = this.items.filter((item) => {
      //   return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })

    	this.items.forEach((item) => {
    	  // key will be "ada" the first time and "alan" the second time
    	  if (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ){
    	  	temp.push(item);
    	  	console.log("temp in getItems is: "+temp);
    	  }
	
    	  // childData will be the actual contents of the child
    	  // var childData = childSnapshot.val();
    	  // this.items.push(childSnapshot.val())
  		});
  		this.items=temp;

    }
  }

}
