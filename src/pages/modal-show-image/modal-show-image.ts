import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { CheckTokenProvider } from '../../providers/check-token/check-token';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ModalShowImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-show-image',
  templateUrl: 'modal-show-image.html',
})
export class ModalShowImagePage {

  token;
  ip;
  image;
  photo = '';
  photos = [''];
  post_anh = false;
  base64Image1 = '';
  constructor(public navCtrl: NavController, private camera: Camera, private restProvider: RestProvider, private toastCtrl: ToastControlProvider, public viewCtrl:ViewController,public navParams: NavParams, private modul_chucnang: ModulChucnangProvider, private check_token: CheckTokenProvider) {
    this.token = this.navParams.get('data').token;
    this.ip = this.navParams.get('data').ip;
    this.image = this.ip.replace('apiv2', 'vnpt_mds/uploads') +this.navParams.get('data').image;
  }

  ionViewDidLoad() {
    this.check_token.check_token(this.ip, this.token, this.navCtrl)
  }
  closeModal(){
    const data = {
      image: ""
    };
    this.viewCtrl.dismiss(data);
  }

}
