import { Component } from '@angular/core';
import { NavController, AlertController, MenuController, Events } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { Network } from '@ionic-native/network';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';
import { AppVersion } from '@ionic-native/app-version';
import { SqliteProvider } from '../../providers/sqlite/sqlite';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = ''//'cuonglc.qnm@vnpt.vn'//;
  password = '';
  ip = '';
  //sqlite;
  version
  acc1=null;

  constructor(public navCtrl: NavController, private restPro: RestProvider, private modul_chucnang: ModulChucnangProvider,
    private network: Network, private alertCtrl: AlertController, private openNativeSettings: OpenNativeSettings,
    private toastCtrl: ToastControlProvider, public menuCtrl: MenuController,
    private appVersion: AppVersion, private events: Events,private sqlite: SqliteProvider) {

    this.do_get_version()
    // setTimeout(() => {
    //   this.sqlite = new SqliteProvider()
    // }, 1300);
    setTimeout(() => {
      this.do_get_user()
    }, 1200);
  }

  do_get_user() {
    this.sqlite.get_all_user().then((data) => {
      console.log(data)
      this.acc1 = data;
      if (this.acc1.length != 0) {
        this.username = this.acc1[0].user;
      }
    }, (error) => {
      console.log(error);
    })
  }


  do_inser_update(user) {
    //table ko có giá trị thì insert
    if (this.acc1.length == 0) {
      this.sqlite.do_insert("1", user, "11", "0")
    }
    else {      
        //có row và khác giá trị thì update
        this.sqlite.do_update("1", user, "22", "0")     
    }
  }

  //hàm kiểm tra internet
  do_check_network() {
    //this.sqlite.createDatabase()
    if (this.network.type == 'none') {  //trường hợp ko có internet
      this.do_open_internet_setting();
    }
    else {
      this.do_login();
    }
  }
  //ham kiểm tra network, ko có thì mở setting wifi hoặc 3g
  do_open_internet_setting() {
    let alert = this.alertCtrl.create({
      title: 'Thông báo',
      message: 'Bạn có muốn cài đặt network không?',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '3G',
          handler: () => {
            this.openNativeSettings.open('settings');
            //this.openNativeSettings.open('wireless');
          }
        },
        {
          text: 'Wifi',
          handler: () => {
            this.openNativeSettings.open('wifi');
          }
        }
      ]
    });
    alert.present();
  }

  do_login() {
    var auth = '', token = '', arr
    //nếu tài khoản hoặc mật khẩu ko rỗng thì thực hiện tiếp theo 
    if (this.username && this.password) {
      this.sqlite.get_setting().then((data) => {
        //this.sqlite.do_get_setting_from_id('1').then((data) => {
        arr = data;
        //rỗng
        if (arr.length != 0) {
          //gán giá trị ip, ip có thể rỗng
          this.ip = arr[0].gia_tri;
          //kiểm tra nếu ip ko rỗng
          if (this.ip) {
            this.restPro.do_post(this.ip + this.restPro.auth, this.modul_chucnang.create_json_login(this.username, this.password), 1).then(data => {
              auth = data['data']['authorization_code']
              this.restPro.do_post(this.ip + this.restPro.token, this.modul_chucnang.create_json_authorization_code(auth), 1).then(data => {
                token = data['data']['access_token']

                let params = {};
                params = {
                  access_token: token,
                  ip: this.ip
                };
                //nếu đăng nhập thành công thì insert hoặc update tài khoản vào sqlite 
                this.do_inser_update(this.username)

                //vào trang pagethongtin
                this.navCtrl.setRoot('PageThongTinPage', params);
                this.events.publish('loginsuccess', this.ip, token);
                //this.navCtrl.push(MenuPage,params);

              }, error => {
                console.log(error)
              })
            }, error => {
              console.log(error)
              if (error['status'] == 1) {
                this.toastCtrl.showErrorToast('middle', 'The request timed out!')
              }
              else {
                this.toastCtrl.showErrorToast('middle', 'Tài khoản hoặc mật khẩu không đúng!')
              }
            })
          }
          //ip rỗng thì mở lại menu
          else {
            this.toastCtrl.showErrorToast('middle', 'Hãy nhập Địa chỉ Host!');
            this.menuCtrl.toggle();
          }
        }
        //chưa insert ip thì mở lại menu
        else {
          this.toastCtrl.showErrorToast('middle', 'Hãy nhập Địa chỉ Host!');
          this.menuCtrl.toggle();
        }
      }, (error) => {
        //data trả về error là sai tài khoản hoặc mật khẩu, show toast
        console.log(error);
        this.toastCtrl.showErrorToast('middle', 'Tài khoản hoặc mật khẩu không đúng!');
      });
    }
    //tài khoản hoặc mật khẩu rỗng
    else {
      this.toastCtrl.showErrorToast('middle', 'Hãy nhập tài khoản hoặc mật khẩu!');
    }
  }

  do_get_version() {
    this.appVersion.getVersionNumber().then((data) => {
      this.version = data
    }, error => {
      console.log(error)
    })
  }


}
