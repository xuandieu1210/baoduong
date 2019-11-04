import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { CheckTokenProvider } from '../../providers/check-token/check-token';

/**
 * Generated class for the ShowtextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showtext',
  templateUrl: 'showtext.html',
})
export class ShowtextPage {

  token;
  ip;
  text;
  constructor(public navCtrl: NavController, public viewCtrl:ViewController, public navParams: NavParams, private check_token: CheckTokenProvider) {
    this.token = this.navParams.get('data').token;
    this.ip = this.navParams.get('data').ip;
    this.text = this.navParams.get('data').text;
  }

  ionViewDidLoad() {
    this.check_token.check_token(this.ip, this.token, this.navCtrl)
  }

  closeModal(){
    const data = {
      text: ""
    };
    this.viewCtrl.dismiss(data);
  }
}
