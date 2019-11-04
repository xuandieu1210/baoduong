import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';

/**
 * Generated class for the ModalsThongTinCaNhanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modals-thong-tin-ca-nhan',
  templateUrl: 'modals-thong-tin-ca-nhan.html', 
})
export class ModalsThongTinCaNhanPage {
  title;
  token;
  ip;
  username;
  dien_thoai;
  ten;
  chuc_vu;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: RestProvider,
    private modul_chucnang: ModulChucnangProvider) {

    this.title = navParams.get('title')
    this.token = this.navParams.get('access_token')
    this.ip = navParams.get('ip')

    this.get_thongtin_canhan()
  }

  get_thongtin_canhan() {
    var thongtin_canhan
    this.restProvider.do_get(this.ip + 'me', this.modul_chucnang.create_json_access_token(this.token),0).then((data) => {
      thongtin_canhan = data['data']
      this.username = thongtin_canhan.username;
      this.dien_thoai = thongtin_canhan.info.DIEN_THOAI;
      this.ten = thongtin_canhan.info.TEN_NHANVIEN;
      this.chuc_vu = thongtin_canhan.info.CHUC_VU.ten_chucvu;
    }, (error) => {
      console.log(error);
    });
  }

}
