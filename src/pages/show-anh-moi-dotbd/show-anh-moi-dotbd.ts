import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { ShowAnhMoiNhanVienPage } from '../show-anh-moi-nhan-vien/show-anh-moi-nhan-vien';


/**
 * Generated class for the ShowAnhMoiDotbdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-anh-moi-dotbd',
  templateUrl: 'show-anh-moi-dotbd.html',
})
export class ShowAnhMoiDotbdPage {
  ds_nhanvien;
  ds_totruong;
  ds_image_nhanvien = null;
  ds_image_totruong = null;
  ip;
  token;
  title;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modul_chucnang: ModulChucnangProvider) {

    this.title = navParams.get('title')
    this.ip = navParams.get('ip').toString()
    var ds_image = navParams.get('data')
    var arr = this.modul_chucnang.get_key_name_array(ds_image)

    if (arr.length == 1) {
      if (arr[0] == 'nhanvien') {
        this.ds_image_nhanvien = ds_image['nhanvien']
        this.ds_nhanvien = this.modul_chucnang.get_key_name_array(this.ds_image_nhanvien)
      }
      else {
        this.ds_image_totruong = ds_image['totruong']
        this.ds_totruong = this.modul_chucnang.get_key_name_array(this.ds_image_totruong)
      }
    }
    else {
      this.ds_image_nhanvien = ds_image['nhanvien']
      this.ds_image_totruong = ds_image['totruong']
      this.ds_nhanvien = this.modul_chucnang.get_key_name_array(this.ds_image_nhanvien)
      this.ds_totruong = this.modul_chucnang.get_key_name_array(this.ds_image_totruong)
    }
  }

  get_length(ds) {
    return ds.length;
  }

  get_link(name) {
    return this.modul_chucnang.get_link_image(this.ip) + name;
  }

  check_ds(ds) {
    return ds != null;
  }

  show_anh_moi_nhan_vien(title, item) {
    this.navCtrl.push(ShowAnhMoiNhanVienPage, {
      title: title,
      ip: this.ip,
      ds_image: item
    });
  }
}
