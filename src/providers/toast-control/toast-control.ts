import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastControlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastControlProvider {

  constructor(public toastCtrl: ToastController) {

  }
  showToast(position: string, message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: 3000,
      cssClass: 'dangerToastClass',
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  showErrorToast(position: string, message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: 3000,
      cssClass: 'dangerToastClass',
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}
