import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions, Modal, MenuController, ToastController, AlertController } from 'ionic-angular';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { RestProvider } from '../../providers/rest/rest';
import { CheckTokenProvider } from '../../providers/check-token/check-token';
import { ShowAnhMoiNhanVienPage } from '../show-anh-moi-nhan-vien/show-anh-moi-nhan-vien';
import { ChitietCongviecKehoachPage } from '../chitiet-congviec-kehoach/chitiet-congviec-kehoach';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';

/**
 * Generated class for the PageCongViecToTruongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page-cong-viec-to-truong',
  templateUrl: 'page-cong-viec-to-truong.html',
})
export class PageCongViecToTruongPage {
  title;
  appType = '';

  token;
  ip;
  pageIndex;
  ttvt_select;
  tram_select;
  id_dai;
  id_tram

  ds_congviec_kehoach;
  ds_congviec_dangthuchien;
  hidden_bd_kehoach;
  hidden_bd_dangthuchien;
  hide_diachi;

  shownGroup_kehoach = null;
  shownGroup_dangthuchien = null;

  kehoach_null_data = false;
  thuchien_null_data = false;


  activeMenu: string;
  ipContent = new Array<string>();


  constructor(public navCtrl: NavController, private navParams: NavParams, private restProvider: RestProvider,
    private modul_chucnang: ModulChucnangProvider, private toastCtrl: ToastControlProvider,
    private modalCtrl: ModalController, public menu: MenuController,
    private check_token: CheckTokenProvider, public alertCtrl: AlertController) {

    //this.menu1Active()
    this.title = navParams.get('title')
    this.appType = navParams.get('appType')
    this.pageIndex = navParams.get('pageIndex') //=1:công việc cá nhân;  =2: xác nhận tổ trưởng
    this.token = this.navParams.get('access_token')
    this.ip = navParams.get('ip')
    this.ttvt_select = navParams.get('ttvt_select')
    this.tram_select = navParams.get('tram_select')
    this.hide_diachi = navParams.get('hide_diachi')
    
        
    if(this.hide_diachi){
      this.title = navParams.get('title')
    }
    else{
      this.title = navParams.get('title')+'-'+this.tram_select.ten_tram
    }

    this.id_dai = this.ttvt_select.id_dai
    this.id_tram = this.tram_select.id_tram

    this.get_ds_dot_bao_duong(this.token, 'kehoach', this.id_dai, this.id_tram, this.hide_diachi)
    this.get_ds_dot_bao_duong(this.token, 'dangthuchien', this.id_dai, this.id_tram, this.hide_diachi)
  }

  ionViewDidLoad() {
    this.check_token.check_token(this.ip, this.token, this.navCtrl)
  }

  // menu1Active() {
  //   this.activeMenu = 'sub-menu';
  //   this.menu.enable(true, 'sub-menu');
  //   this.menu.enable(false, 'main-menu');
  // }

  isGroupShown(group, trangthai) {
    var ket_qua;
    if (trangthai == 'kehoach') {
      this.shownGroup_dangthuchien = null;
      ket_qua = (this.shownGroup_kehoach === group) ? true : false;
    }
    else if (trangthai == 'dangthuchien') {
      this.shownGroup_kehoach = null;
      ket_qua = (this.shownGroup_dangthuchien === group) ? true : false;
    }

    return ket_qua;
  };


  toggleSection(group, trangthai) {
    switch (trangthai) {
      case 'kehoach':
        if (this.isGroupShown(group, trangthai)) {
          this.shownGroup_kehoach = null;
        } else {
          this.shownGroup_kehoach = group;
        }
      case 'dangthuchien':
        if (this.isGroupShown(group, trangthai)) {
          this.shownGroup_dangthuchien = null;
        } else {
          this.shownGroup_dangthuchien = group;
        }
    }
  }

  // dosomething(ev) {
  //   this.hidden_bd_kehoach = ev.hidden_bd_kehoach
  //   this.hidden_bd_dangthuchien = ev.hidden_bd_dangthuchien
  //   this.hide_diachi = ev.hide_diachi

  //   this.id_dai = ev.ttvt_select.ID_DAI.toString()
  //   this.id_tram = ev.tram_select.id_tram
  //   this.get_ds_dot_bao_duong(this.token, 'kehoach', ev.ttvt_select.ID_DAI.toString(), ev.tram_select.id_tram, this.hide_diachi)
  //   this.get_ds_dot_bao_duong(this.token, 'dangthuchien', ev.ttvt_select.ID_DAI.toString(), ev.tram_select.id_tram, this.hide_diachi)
  // }

  get_ds_dot_bao_duong(token, trang_thai, id_dai, id_tram, hide_diachi) {
    this.ds_congviec_kehoach = null;
    this.ds_congviec_dangthuchien = null;

    var ds_cv;
    this.restProvider.do_get(this.ip + 'dotbaoduong/danhsach', this.modul_chucnang.create_json_get_dot_bao_duong1(token, trang_thai, id_dai, id_tram),1).then((data) => {
      ds_cv = data['data'][0]['DS_DotBaoDuong']
      if (trang_thai == 'kehoach') {
        if (!ds_cv) {
          this.kehoach_null_data = true
        }
      } else {
        if (!ds_cv) {
          this.thuchien_null_data = true
        }
      }
      
      if (ds_cv) {
        this.hidden_bd_kehoach = true
        this.hidden_bd_dangthuchien = true

        if (hide_diachi) {
          if (trang_thai == 'kehoach') {
            this.ds_congviec_kehoach = data['data']
          }
          else {
            this.ds_congviec_dangthuchien = data['data']
            console.log(this.ds_congviec_dangthuchien)
          }
        }
        else {
          if (trang_thai == 'kehoach') {
            this.ds_congviec_kehoach = ds_cv
          }
          else if (trang_thai == 'dangthuchien') {
            this.ds_congviec_dangthuchien = ds_cv
            console.log(this.ds_congviec_dangthuchien)
          }
        }
      }
    }, (error) => {
      console.log(error)
      //this.toastCtrl.showToast('middle', 'Không có Đợt bảo dưỡng ' + ((trang_thai == 'kehoach') ? 'trong kế hoạch' : 'đang thực hiện') + ' nào!')
    });
  }

  do_show_alert_thuchien_congviec(item) {
    // if (item.truong_nhom !== this.id_nhanvien) {
    //   this.toastCtrl.showToast('middle', 'Bạn không có quyền thực hiện thao tác này!')
    // }
    // else {
    let alert = this.alertCtrl.create({
      title: 'Thông báo!',
      message: 'Bạn có muốn bắt đầu thực hiện công việc không?',
      buttons: [
        {
          text: 'Không',
          handler: () => {
          }
        },
        {
          text: 'Có',
          handler: () => {
            this.do_thuchien_congviec(item);
          }
        }
      ]
    });
    alert.present();
  }



  do_thuchien_congviec(id_dbd) {
    this.restProvider.do_get(this.ip + 'dotbaoduong/thuchien', this.modul_chucnang.create_json_get_thuchien_congviec(this.token, id_dbd.toString()),0).then((data) => {
      if (data['status'] === 1) {
        this.toastCtrl.showToast('middle', 'Thành công!')
        this.do_refresh()
      }
    }, (error) => {
      console.log(error);
      this.toastCtrl.showErrorToast('middle', 'Không thành công!')
    });
  }
  chitiet_congviec(dbd) {
    const myModalOptione: ModalOptions = {
      enableBackdropDismiss: true
    };
    const data = {
      dbd: dbd,
      access_token: this.token,
      ip: this.ip,
      //id_nhanvien: this.id_nhanvien,
      pageIndex: this.pageIndex,
      appType: this.appType
    }

    const myModal: Modal = this.modalCtrl.create(ChitietCongviecKehoachPage, { data: data }, myModalOptione);
    myModal.present();

    myModal.onDidDismiss((data) => {
      if (data.trang_thai == 'hoanthanh_ok') {
        this.do_refresh()
      }
    })
  }
  check_button_hoanthanh(trang_thai): boolean {
    return this.modul_chucnang.change_alias(trang_thai) != 'chua hoan thanh';
  }

  // do_show_modals_hoan_thanh(item, page_name) {
  //   const myModalOptione: ModalOptions = {
  //     enableBackdropDismiss: false
  //   };
  //   const data = {
  //     item: item,
  //     token: this.token,
  //     ip: this.ip
  //   }

  //   const myModal: Modal = this.modalCtrl.create(page_name, { data: data }, myModalOptione);
  //   myModal.present();

  //   myModal.onDidDismiss((data) => {
  //     item.TRANGTHAI = data['trang_thai']
  //     if (data['trang_thai'] !== 'post_close') {
  //        this.do_button()

  //     }

  //   })
  // }

  do_show_image_hoanthanh(ma_dotbd, id_dotbd) {
    this.restProvider.do_get(this.ip + 'dotbaoduong/get-images', this.modul_chucnang.create_json_check_post_anh(this.token,
      id_dotbd.toString(), 'true'),0).then((data) => {

        var key = this.modul_chucnang.get_key_name_array(data['data'])
        var arr1 = data['data'][key[0].toString()]

        this.navCtrl.push(ShowAnhMoiNhanVienPage, {
          title: ma_dotbd,
          ip: this.ip,
          ds_image: arr1
        })
      }, (error) => {
        console.log(error)
      });
  }

  do_refresh() {
    this.get_ds_dot_bao_duong(this.token, 'kehoach', this.id_dai, this.id_tram, this.hide_diachi)
    this.shownGroup_kehoach = null
    this.get_ds_dot_bao_duong(this.token, 'dangthuchien', this.id_dai, this.id_tram, this.hide_diachi)
    this.shownGroup_dangthuchien = null
  }

}
