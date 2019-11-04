import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, MenuController, Modal, ModalOptions } from 'ionic-angular';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { CheckTokenProvider } from '../../providers/check-token/check-token';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';
import { RestProvider } from '../../providers/rest/rest';
import { ChitietCongviecKehoachPage } from '../chitiet-congviec-kehoach/chitiet-congviec-kehoach';

/**
 * Generated class for the PageCongViecHoanThanhPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page-cong-viec-hoan-thanh',
  templateUrl: 'page-cong-viec-hoan-thanh.html',
})
export class PageCongViecHoanThanhPage {
  title;
  appType = '';

  token;
  ip;
  pageIndex;
  ipContent = new Array<string>();
  giatri_tu_ngay;
  giatri_den_ngay;

  ds_congviec_hoanthanh = null;
  hidden_bd_hoanthanh;
  hide_diachi;
  ttvt_select;
  tram_select;
  id_dai;
  id_tram;
  null_data = false;
 
  shownGroup = null;
  shownGroup_hoanthanh = null;


  constructor(public navCtrl: NavController, private navParams: NavParams, private restProvider: RestProvider,
    private modul_chucnang: ModulChucnangProvider, private toastCtrl: ToastControlProvider,
    private modalCtrl: ModalController, public menu: MenuController,
    private check_token: CheckTokenProvider, public alertCtrl: AlertController) {

    this.appType = navParams.get('appType')
    this.pageIndex = navParams.get('pageIndex') //=1:công việc cá nhân;  =2: xác nhận tổ trưởng; =3: hoan thanh
    this.token = this.navParams.get('access_token')
    this.ip = navParams.get('ip')
    this.ttvt_select = navParams.get('ttvt_select')
    this.tram_select = navParams.get('tram_select')
    this.hide_diachi = navParams.get('hide_diachi')

    if (this.hide_diachi) {
      this.title = navParams.get('title')
    }
    else {
      this.title = navParams.get('title') + '-' + this.tram_select.ten_tram
    }

    // this.token = '24b045df56da886bb05fb4f6e4e0da98'
    // this.ip = 'http://10.51.138.24/apidemo/'
    // this.hide_diachi=true

    this.get_current_day()
    //this.get_ds_dot_bao_duong(this.token, '2', '', this.giatri_tu_ngay, this.giatri_den_ngay, this.hide_diachi)
  }

  ionViewDidLoad() {
    this.check_token.check_token(this.ip, this.token, this.navCtrl)
  }

  get_current_day() {
    this.giatri_den_ngay = new Date().toISOString().slice(0, 10);
    var time = new Date(this.giatri_den_ngay).getTime()
    var time1 = time - 2592000000
    this.giatri_tu_ngay = new Date(time1).toISOString().slice(0, 10);
  }

  // select_tu_ngay() {
  //   var time = new Date(this.giatri_den_ngay).getTime()
  //   var time1 = new Date(this.giatri_tu_ngay).getTime()
  //   if (time < time1) {
  //     this.doAlert('Bạn không được chọn ngày bắt đầu lớn hơn ngày kết thúc!')
  //   }
  //   else if ((time - time1) > 2592000000) {
  //     this.doAlert('Bạn chỉ được chọn mốc thời gian trong vòng 1 tháng!')
  //   }
  // }

  doAlert(message, giatri_end) {
    let alert = this.alertCtrl.create({
      title: 'Thông báo!',
      subTitle: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          //this.get_current_day();
          var time1 = giatri_end - 2592000000
          this.giatri_tu_ngay = new Date(time1).toISOString().slice(0, 10);
        }
      },
      ]
    });

    alert.present();
  }


  isGroupShown(group) {
    var ket_qua;
    ket_qua = (this.shownGroup_hoanthanh === group) ? true : false;
    return ket_qua;
  };

  toggleSection(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup_hoanthanh = null;
    } else {
      this.shownGroup_hoanthanh = group;
    }
  }

  dosomething(ev) {
    this.ds_congviec_hoanthanh = ev.hidden_bd_kehoach
    this.hide_diachi = ev.hide_diachi


    this.id_tram = ev.tram_select.id_tram
    //this.get_ds_dot_bao_duong(this.token, 'kehoach', ev.ttvt_select.ID_DAI.toString(), ev.tram_select.id_tram, this.hide_diachi)
    //this.get_ds_dot_bao_duong(this.token, 'dangthuchien', ev.ttvt_select.ID_DAI.toString(), ev.tram_select.id_tram, this.hide_diachi)
  }

  get_ds_dot_bao_duong(token, id_dai, id_tram, tu_ngay, den_ngay, hide_diachi) {
    this.ds_congviec_hoanthanh = null;

    var ds_cv;
    this.restProvider.do_get(this.ip + 'dotbaoduong/lichsu', this.modul_chucnang.create_json_lichsu_hoanthanh(token, id_dai, id_tram, tu_ngay, den_ngay),1).then((data) => {
      ds_cv = data['data'][0]['DS_DotBaoDuong']
      if (ds_cv) {
        this.hidden_bd_hoanthanh = true

        if (hide_diachi) {
          this.ds_congviec_hoanthanh = data['data']
          console.log(this.ds_congviec_hoanthanh)
        }
        else {
          this.ds_congviec_hoanthanh = ds_cv
          console.log(this.ds_congviec_hoanthanh)
        }
      }
      else {
        this.null_data = true;
        //this.toastCtrl.showToast('middle', 'Không có Đợt bảo dưỡng hoàn thành nào!')
      }
    }, (error) => {
      this.null_data = true;
      console.log(error)
      //this.toastCtrl.showToast('middle', 'Không có Đợt bảo dưỡng hoàn thành nào!')
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

    // myModal.onDidDismiss((data) => {
    //   if (data.trang_thai == 'hoanthanh_ok') {
    //     this.do_click_button()
    //   }
    // })
  }

  do_click_button() {
    var time = new Date(this.giatri_den_ngay).getTime()
    var time1 = new Date(this.giatri_tu_ngay).getTime()
    if (time < time1) {
      this.doAlert('Bạn không được chọn ngày bắt đầu lớn hơn ngày kết thúc!',time)
    }
    else if ((time - time1) > 2592000000) {
      this.doAlert('Bạn chỉ được chọn mốc thời gian trong vòng 1 tháng!',time)
    }
    else{
      this.get_ds_dot_bao_duong(this.token, this.ttvt_select.id_dai, this.tram_select.id_tram, this.giatri_tu_ngay, this.giatri_den_ngay, this.hide_diachi)
    }    
  }
}
