import { Component, ViewChild } from '@angular/core';
import { Platform, Events, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SqliteProvider } from '../providers/sqlite/sqlite';
import { PageItem } from '../model/PageItem';
import { RestProvider } from '../providers/rest/rest';
import { ModulChucnangProvider } from '../providers/modul-chucnang/modul-chucnang';
import { ToastControlProvider } from '../providers/toast-control/toast-control';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage1: any = HomePage;
  ip = '';
  token;
  show_ip = true;
  @ViewChild(Nav) nav: Nav;
  pages
  thongtin_canhan;
  username = ''
  dien_thoai = ''

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SqliteProvider,
    private events: Events, private restProvider: RestProvider, private modul_chucnang: ModulChucnangProvider,
    private toastCtrl: ToastControlProvider, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //this.listenToLoginEvents()

    setTimeout(() => {
      this.do_get_();  //lấy giá trị ip,thoigian mặc định
    }, 1500); //sau 1 giây


  }

  do_get_() {
    var arr;
    //select từ tbl_setting where id
    this.sqlite.get_setting().then((data) => {
      arr = data;
      //có phần tử
      if (arr.length != 0) {
        this.ip = arr[0].gia_tri;
      }
      //ko có phần tử
      else {
        //tự insert host mặc định là https://113.161.7.83/spsm
        // this.sqlite.do_insert_setting('1', 'http://10.51.188.10/apidemo/', 'dia chi host');
        this.sqlite.do_insert_setting('1', 'http://113.161.7.86/apidemo/', 'dia chi host');
        this.ip = 'http://113.161.7.86/apidemo/';
      }
    }, (error) => {
      console.log(error);
    })
  }

  do_insert_() {
    var arr;
    this.sqlite.get_setting().then((data) => {
      arr = data;
      if (arr.length == 0) {
        //tbl_setting không có phần tử nào thì thực hiện insert
        this.sqlite.do_insert_setting('1', this.ip, 'dia chi host');

      }
      else {
        this.sqlite.do_update_setting('1', this.ip, 'dia chi host');

      }
    }, (error) => {
      console.log(error);
    })
  }

  get_link(ip) {

    this.ip = ip
  }

  // listenToLoginEvents() {
  //   this.events.subscribe('loginsuccess', (ip, token) => {
  //     this.ip = ip;
  //     this.token = token;
  //     this.show_ip = false;
  //     this.pages = this.set_giatri_token_in_pages(this.token)
  //     this.get_thongtin_canhan()
  //   });
  // }

  // set_giatri_token_in_pages(token): PageItem[] {
  //   var list = new Array<PageItem>();
  //   list.push(new PageItem('Công việc cá nhân', 'PageCongViecCaNhanPage', 'PageCongViecCaNhanPage', '1',
  //     'dangthuchien', 'construct', 'primary', token));
  //   list.push(new PageItem('Xác nhận tổ trưởng', 'PageCongViecToTruongPage', 'PageCongViecToTruongPage', '2',
  //     'kehoach', 'book', '', token));
  //   list.push(new PageItem('Lịch sử hoàn thành', 'PageCongViecHoanThanhPage', 'PageCongViecHoanThanhPage', '3',
  //     '', 'timer', '', token));
  //   return list;
  // }

  // change_color(i) {
  //   for (var k = 0; k < this.pages.length; k++) {
  //     this.pages[k].color = ''
  //   }
  //   this.pages[i].color = 'primary'
  // }
  // openPage(_: any, page, i) {    
  //   this.change_color(i)
  //   let params = {
  //     'title': page.title,
  //     'pageIndex': page.pageIndex,
  //     'appType': page.appType,
  //     'access_token': page.token,
  //     'ip': this.ip
  //   };
  //   this.nav.setRoot(page.pageName, params);
  // }

  // get_thongtin_canhan() {
  //   this.restProvider.do_get(this.ip + 'me', this.modul_chucnang.create_json_access_token(this.token),0).then((data) => {
  //     this.thongtin_canhan = data['data']
  //     this.username = this.thongtin_canhan.info.TEN_NHANVIEN
  //     this.dien_thoai = this.thongtin_canhan.info.DIEN_THOAI
  //   }, (error) => {
  //     console.log(error);
  //     this.toastCtrl.showToast('middle', 'Lỗi kết nối!');
  //   });
  // }

  // check_log_out() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Thông báo!',
  //     message: 'Bạn có muốn đăng xuất khỏi chương trình không?',
  //     buttons: [
  //       {
  //         text: 'Không',
  //         handler: () => {
  //         }
  //       },
  //       {
  //         text: 'Có',
  //         handler: () => {
  //           this.log_out();
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // log_out() {
  //   this.restProvider.do_post_log_out(this.ip + "logout", {}, this.token, 2).then((data) => {
  //     this.show_ip = true;
  //     this.nav.setRoot(HomePage)
  //   }, (error) => {
  //     console.log(error);

  //     this.toastCtrl.showToast('middle', 'Lỗi kết nối!');
  //   });

  // }

}

