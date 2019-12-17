import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { CheckTokenProvider } from '../../providers/check-token/check-token';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';


/**
 * Generated class for the PageThongTinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface PageInterface {
  title: string;
  title_full: string;
  pageName: string;
  tabComponent?: any;
  pageIndex?: string;
  appType?: string;
  icon?: string,
  color?: string,
}

@IonicPage()
@Component({
  selector: 'page-page-thong-tin',
  templateUrl: 'page-thong-tin.html',
})
export class PageThongTinPage {

  ttvts: any;
  ttvt_select: any;
  ds_tram: any;
  tram_select: any;
  dia_chi = "";
  token;
  ip;
  hide_diachi = true;
  tram_disable = false;

  pages: PageInterface[] = [
    {
      title: 'Công việc cá nhân', title_full: 'Công việc cá nhân', pageName: 'PageCongViecCaNhanPage', tabComponent: 'PageCongViecCaNhanPage', pageIndex: '1',
      appType: 'dangthuchien', color: 'navbarColor', icon: 'construct'
    },
    {
      title: 'Xác nhận tổ trưởng', title_full: 'Xác nhận tổ trưởng', pageName: 'PageCongViecToTruongPage', tabComponent: 'PageCongViecToTruongPage', pageIndex: '2',
      appType: 'kehoach', color: 'navbarColor', icon: 'book'
    },
    {
      title: 'Lịch sử hoàn thành', title_full: 'Lịch sử hoàn thành', pageName: 'PageCongViecHoanThanhPage', tabComponent: 'PageCongViecHoanThanhPage', pageIndex: '3',
      appType: 'hoanthanh', color: 'navbarColor', icon: 'time'
    },
    {
      title: 'Thông tin cá nhân', title_full: 'Thông tin cá nhân', pageName: 'ModalsThongTinCaNhanPage', tabComponent: 'ModalsThongTinCaNhanPage', pageIndex: '4',
      appType: 'hoanthanh', color: 'navbarColor', icon: 'person'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: RestProvider,
    private toastCtrl: ToastControlProvider, private modul_chucnang: ModulChucnangProvider,
    private check_token: CheckTokenProvider,
    public alertCtrl: AlertController,  private storage: Storage,) {

    // this.token = navParams.get('access_token')
    // this.ip = navParams.get('ip')

    this.storage.get('ip').then((val) => {
      this.ip = val
    })
    this.storage.get('access_token').then((value_token) => {
      this.token = value_token;
    })

      

    // this.token = '97e4b91bc09644a72db9dc664c8f4804'    
    // this.ip = 'http://10.51.138.24/apidemo/'

    
    setTimeout(() => {
      this.get_ttvt()
    }, 1500);
    // this.check_token.check_token(this.ip, this.token, this.navCtrl)

  }

  ionViewDidLoad() {
    this.check_token.check_token(this.ip, this.token, this.navCtrl)
  }

  get_ttvt() {
    var arr;
    this.restProvider.do_get(this.ip + "daivt/index", this.modul_chucnang.create_json_access_token(this.token), 1).then((data) => {
      //kiểm tra trả về mảng rỗng
      arr = data['data'];
      if (arr.length == 0) {
        this.toastCtrl.showToast('middle', 'Không có TTVT nào!');
      }
      else {
        this.ttvts = this.modul_chucnang.add_phantu_all_vao_ds_dai(arr);
        this.ttvt_select = this.ttvts[1];
        this.ttvtChange(this.ttvt_select);
      }
    }, (error) => {
      console.log(error);
      this.toastCtrl.showToast('middle', 'Lỗi kết nối!');
    });
  }

  //hàm lấy danh sách các thiết bị mỗi TTVT  url:https://10.51.188.9/spsm/mapi/thietbi/1  (1:id_dai)
  get_thietbi(token, id_dai) { //{ "access_token": token, "daivt": id_dai } 
    var ds_tram1;
    this.restProvider.do_get(this.ip + "tramvt/index", this.modul_chucnang.create_json_get_tram_vt(token, id_dai), 0).then((data) => {
      ds_tram1 = data['data'];
      if (ds_tram1.length == 0) {
        //this.toastCtrl.showToast('middle', 'TTVT không có thiết bị nào!');
        this.hide_diachi = false
        this.dia_chi = 'Trung tâm không có thiết bị nào.'
        this.tram_disable = true
      }

      else {
        this.ds_tram = this.modul_chucnang.add_phantu_all_vao_ds_tram(ds_tram1)
        this.tram_select = this.ds_tram[0];
        this.dia_chi = this.tram_select.dia_diem;
        this.tram_disable = false
      }
    }, (error) => {
      console.log(error);
      this.toastCtrl.showToast('middle', 'Lỗi kết nối!');
    });
  }

  //bắt sự kiện select TTVT, mỗi TT sẽ load danh sách thiết bị tương ứng
  ttvtChange(ttvt) {
    this.get_thietbi(this.token, ttvt.id_dai);
  }

  //bắt sự kiện select thiết bị, mỗi thiết bị sẽ load cảnh báo và thông tin...
  tramChange(val: any) {
    this.tram_select = val;
    if (this.tram_select.stt == 0) {
      this.hide_diachi = true;
    }
    else {
      this.hide_diachi = false;
    }
    this.dia_chi = this.tram_select.dia_diem;
  }

  change_color(pages, i) {
    for (var k = 0; k < pages.length; k++) {
      pages[k].color = 'primary';
    }
    pages[i].color = 'danger';
  }

  open_page(pages, i) {
    this.change_color(pages, i);
    let params = {
      'title': pages[i].title,
      'pageIndex': pages[i].pageIndex,
      'appType': pages[i].appType,
      'access_token': this.token,
      'ip': this.ip,
      'ttvt_select': this.ttvt_select,
      'tram_select': this.tram_select,
      'hide_diachi': this.hide_diachi
    };
    this.navCtrl.push(pages[i].pageName, params);
  }

  check_log_out() {
    let alert = this.alertCtrl.create({
      title: 'Thông báo!',
      message: 'Bạn có chắc chắn muốn đăng xuất khỏi phần mềm không?',
      buttons: [
        {
          text: 'Không',
          handler: () => {
          }
        },
        {
          text: 'Có',
          handler: () => {
            this.log_out();
          }
        }
      ]
    });
    alert.present();
  }

  log_out() {
    this.restProvider.do_post_log_out(this.ip + "logout", {}, this.token, 2).then((data) => {
      this.storage.set('access_token', "");
      this.navCtrl.setRoot(HomePage)
    }, (error) => {
      console.log(error);
      this.toastCtrl.showErrorToast('middle', 'Lỗi kết nối!');
    });

  }

}
