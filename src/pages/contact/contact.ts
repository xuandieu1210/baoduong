import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastControlProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  alert() 
  {
    this.toastCtrl.showToast('middle', 'Hello, Go for beer tonight!');
  }

}
