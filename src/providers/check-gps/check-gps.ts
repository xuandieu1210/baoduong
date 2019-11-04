import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Toa_do } from '../../model/Toa_do';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the CheckGpsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CheckGpsProvider {

  constructor(private alertCtrl: AlertController,
     private diagnostic: Diagnostic, private geolocation: Geolocation) {

  }

  check_gps(): Toa_do[] {
    var list = new Array<Toa_do>();
    //if (this.platform.is('android')) {

    // let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
    // let errorCallback = (e) => console.error(e);
    // this.diagnostic.isLocationAvailable().then(successCallback).catch(errorCallback);

    // this.diagnostic.isGpsLocationAvailable().then(successCallback, errorCallback);
    this.diagnostic.getLocationMode()
      .then((state) => {
        if (state == this.diagnostic.locationMode.LOCATION_OFF) {
          this.show_setting_gps()
        } else {
          list = this.get_location()
        }
      }).catch(e => {
        console.error(e)
      });
    return list;
  }

  show_setting_gps() {
    let confirm = this.alertCtrl.create({
      title: '<b>GPS</b>',
      message: 'Chưa bật GPS, bạn có muốn cài đặt không?',
      buttons: [
        {
          text: 'Cài đặt',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
          }
        }
      ]
    });
    confirm.present();
  }

  get_location(): Toa_do[] {
    var list = new Array<Toa_do>();
    this.geolocation.getCurrentPosition().then((resp) => {

      list.push(new Toa_do(resp.coords.latitude, resp.coords.longitude))

    }).catch((error) => {
      console.log('Error getting location', error);
    });
    return list;
  }

}
