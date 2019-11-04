import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';

/**
 * Generated class for the ShowAnhMoiNhanVienPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-anh-moi-nhan-vien',
  templateUrl: 'show-anh-moi-nhan-vien.html',
})
export class ShowAnhMoiNhanVienPage {

  ds_image_nhanvien;
  ip;
  token;
  title;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modulchucnang: ModulChucnangProvider) {
    this.title = navParams.get('title')
    this.ip = navParams.get('ip')
    this.ds_image_nhanvien = navParams.get('ds_image')
  }

  get_link(name) {
    return this.modulchucnang.get_link_image(this.ip) + name;
  }


}
