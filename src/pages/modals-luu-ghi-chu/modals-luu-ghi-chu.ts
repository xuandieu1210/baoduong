import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CheckTokenProvider } from '../../providers/check-token/check-token';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';


/**
 * Generated class for the ModalsLuuGhiChuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modals-luu-ghi-chu',
  templateUrl: 'modals-luu-ghi-chu.html',
})
export class ModalsLuuGhiChuPage {
  ghi_chu_value = '';
  myData;
  hidden_comment = true
  place_holder = '';
  token;
  ip;
  dem = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private restProvider: RestProvider, private modul_chucnang: ModulChucnangProvider, private toastCtrl: ToastControlProvider,
    private keyboard: Keyboard, private check_token: CheckTokenProvider, ) {
    this.myData = this.navParams.get('data').item;
    this.token = this.navParams.get('data').token;
    this.ip = this.navParams.get('data').ip;
    this.ghi_chu_value = this.myData.GHICHU;


    if (this.myData.NOIDUNG.YEUCAUNHAP !== '0') {
      this.hidden_comment = false;
      this.place_holder = this.myData.NOIDUNG.YEUCAUNHAP + "(*)"
    }
    else {
      this.place_holder = 'ghi chú'
    }
  }

  ionViewDidLoad() {
    this.check_token.check_token(this.ip, this.token, this.navCtrl)
  }

  ionViewWillLeave() {
    if (this.dem == 1) {
      const data = {
        trang_thai: "not ok"
      };
      this.view.dismiss(data);
    }
  }
  luu_tam_cong_viec() {
    this.restProvider.do_post_log_out(this.ip + 'congviec/luu', this.modul_chucnang.create_json_luu_ghi_chu_canhan(this.myData.ID_DOTBD.toString(),
      this.myData.ID_THIETBI.toString(), this.myData.NOIDUNG.MA_NOIDUNG, this.myData.ID_NHANVIEN, this.ghi_chu_value), this.token, 1).then((data) => {
        console.log(data)
        if (data['status'] == 1) {
          this.toastCtrl.showToast('middle', 'Lưu thành công!')
          const data1 = {
            trang_thai: "ok",
            ghichu: this.ghi_chu_value
          };
          this.view.dismiss(data1)
          this.dem = 2;
        }
      }, (error) => {
        this.toastCtrl.showErrorToast('middle', 'Lưu không thành công!')
        console.log(error)
      });
  }
  closeModals() {
    const data = {
      trang_thai: "not ok",
    };
    this.view.dismiss(data);
    this.dem = 1;
  }

  delete_text() {
    this.ghi_chu_value = ''
  }

}
