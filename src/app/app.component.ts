import { Component, ViewChild } from '@angular/core';
import { Platform, Events, Nav, AlertController , NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { PageThongTinPage } from '../pages/page-thong-tin/page-thong-tin';
import { SqliteProvider } from '../providers/sqlite/sqlite';
import { PageItem } from '../model/PageItem';
import { RestProvider } from '../providers/rest/rest';
import { ModulChucnangProvider } from '../providers/modul-chucnang/modul-chucnang';
import { ToastControlProvider } from '../providers/toast-control/toast-control';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage1: any ;
  ip = '';
  token;
  show_ip = true;
  @ViewChild(Nav) nav: Nav;
  pages
  thongtin_canhan;
  username = ''
  dien_thoai = '';
  acc1=null;
  access_token = '';
  // public rootPage1;
  // public rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SqliteProvider,
     private events: Events, private restProvider: RestProvider, private modul_chucnang: ModulChucnangProvider,
    private toastCtrl: ToastControlProvider, private storage: Storage, public alertCtrl: AlertController,) {
    



    
      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.do_get_user() 


    });

    //this.listenToLoginEvents()

    // setTimeout(() => {
    //   this.do_get_();  //lấy giá trị ip,thoigian mặc định
    // }, 1000); //sau 1 giây


  }

  do_get_() {

    this.storage.get('ip').then((val) => {
      this.ip = val
    }, (error) => {
      this.storage.set('ip', 'http://113.161.7.86/apidemo/');
      this.ip = "http://113.161.7.86/apidemo/"
    });

    // var arr;
    // //select từ tbl_setting where id
    // this.sqlite.get_setting().then((data) => {
    //   arr = data;
    //   //có phần tử
    //   if (arr.length != 0) {
    //     this.ip = arr[0].gia_tri;
    //   }
    //   //ko có phần tử
    //   else {
    //     //tự insert host mặc định là https://113.161.7.83/spsm
    //     // this.sqlite.do_insert_setting('1', 'http://10.51.188.10/apidemo/', 'dia chi host');
    //     this.sqlite.do_insert_setting('1', 'http://113.161.7.86/apidemo/', 'dia chi host');
    //     this.ip = 'http://113.161.7.86/apidemo/';
    //   }
    //   // this.do_get_user()
    // }, (error) => {
    //   console.log(error);
    // })
  }


  do_insert_() {
    // var arr;
    // this.sqlite.get_setting().then((data) => {
    //   arr = data;
    //   if (arr.length == 0) {
    //     //tbl_setting không có phần tử nào thì thực hiện insert
    //     this.sqlite.do_insert_setting('1', this.ip, 'dia chi host');

    //   }
    //   else {
    //     this.sqlite.do_update_setting('1', this.ip, 'dia chi host');

    //   }
    // }, (error) => {
    //   console.log(error);
    // })

    this.storage.set('ip', this.ip);
    //this.ip = "http://113.161.7.86/apidemo/"
  }

  get_link(ip) {

    this.ip = ip
  }

  do_get_user() {
    this.storage.get('ip').then((val) => {
      this.ip = val
      this.storage.get('user').then((value) => {
        this.username = value;
        this.storage.get('access_token').then((value_token) => {
          this.access_token = value_token;
          console.log(this.access_token)
          this.restProvider.do_get_(this.ip + 'me', this.modul_chucnang.create_json_access_token(this.access_token)).then((data) => {
            if (data['status'] ==  1) {

              this.rootPage1 = PageThongTinPage;
            } else {
              this.rootPage1 = HomePage;
            }
          }, (error) => {
            this.rootPage1 = HomePage;
          });
        }, (error) => {
          this.rootPage1 = HomePage;
          console.log(error)
        });
      }, (error) => {
        this.rootPage1 = HomePage;
        console.log(error)
      });
    }, (error) => {
      this.rootPage1 = HomePage;
      console.log(error)
    });


    // var array;
    // this.sqlite.get_setting().then((data) => {
    //   //this.sqlite.do_get_setting_from_id('1').then((data) => {
    //     array = data;
    //   //rỗng
    //   if (array.length != 0) {
    //     //gán giá trị ip, ip có thể rỗng
    //     this.ip = array[0].gia_tri;
    //     //kiểm tra nếu ip ko rỗng
    //     if (this.ip) {
    //       this.sqlite.get_all_user().then((data) => {
    //         console.log(data)
    //         this.acc1 = data;
    //         if (this.acc1.length != 0) {
    //           this.username = this.acc1[0].user;
    //           this.access_token = this.acc1[0].access_token;
    //           this.restPro.do_get_(this.ip + 'me', this.modul_chucnang.create_json_access_token(this.access_token)).then((data) => {
    //             if (data['status'] ==  1) {
    //               let params = {};
    //               params = {
    //                 access_token: this.access_token,
    //                 ip: this.ip
    //               };
    //               this.navCtrl.setRoot('PageThongTinPage', params);
    //               this.events.publish('loginsuccess', this.ip, this.access_token);
    //             }
    //           }, (error) => {
                
    //           });
    //         }
    //       }, (error) => {
    //         console.log(error);
    //       })
    //     }
    //   }
    // })

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

