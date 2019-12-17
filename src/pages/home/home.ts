import { Component } from '@angular/core';
import { NavController, AlertController, MenuController, Events, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { Network } from '@ionic-native/network';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';
import { AppVersion } from '@ionic-native/app-version';
import { CheckTokenProvider } from '../../providers/check-token/check-token';
import { PageThongTinPage } from '../../pages/page-thong-tin/page-thong-tin';
import { Storage } from '@ionic/storage';
import { e } from '@angular/core/src/render3';

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
  access_token;

  constructor(platform: Platform, public navCtrl: NavController, private check_token: CheckTokenProvider, private restPro: RestProvider, private modul_chucnang: ModulChucnangProvider,
    private network: Network, private alertCtrl: AlertController, private openNativeSettings: OpenNativeSettings,
    private toastCtrl: ToastControlProvider, public menuCtrl: MenuController,
    private appVersion: AppVersion, private events: Events, private storage: Storage) {

    this.do_get_version()
    // setTimeout(() => {
    //   this.sqlite = new SqliteProvider()
    // }, 1300);
    setTimeout(() => {
      this.do_get_user()
    }, 1500);

    
  }

  do_get_user() {
    this.storage.get('ip').then((val) => {
      this.ip = val
      this.storage.get('user').then((value) => {
        this.username = value;
        this.storage.get('access_token').then((value_token) => {
          this.access_token = value_token;
          console.log(this.access_token)
        }, (error) => {
          console.log(error)
        });
      }, (error) => {
        console.log(error)
      });
    }, (error) => {
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


  do_inser_update(user, pass, access_token) {
    //table ko có giá trị thì insert
    // if (this.acc1.length == 0) {
    //   this.sqlite.do_insert_account("1", user, pass, "0", access_token)
    // }
    // else {      
    //     //có row và khác giá trị thì update
    //     this.sqlite.do_update_account("1", user, pass, "0", access_token)     
    // }

    this.storage.set('user', user);
    this.storage.set('pass', pass);
    this.storage.set('access_token', access_token);
  }

  //hàm kiểm tra internet
  do_check_network() {
    //this.sqlite.createDatabase()
    if (this.network.type != 'none' || navigator.onLine) {  //trường hợp ko có internet
      
      this.do_login();
    }
    else {
      this.do_open_internet_setting();
    }

    // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   this.do_open_internet_setting();
    // });
    // disconnectSubscription.unsubscribe();
    // let connectSubscription = this.network.onConnect().subscribe(() => {
      
    //   // We just got a connection but we need to wait briefly
    //    // before we determine the connection type. Might need to wait.
    //   // prior to doing any api requests as well.
    //   this.do_login();
    // });
    
    // // stop connect watch
    // connectSubscription.unsubscribe();
  }
  //ham kiểm tra network, ko có thì mở setting wifi hoặc 3g
  do_open_internet_setting() {
    let alert = this.alertCtrl.create({
      cssClass: 'custom-alert',
      title: 'Thông báo',
      message: 'Bạn có muốn cài đặt network không?',
      buttons: [
        {
          text: '3G/4G',
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
        },
        {
          text: 'Hủy',
          role: 'cancel',
          handler: () => {
          }
        }
        
      ]
    });
    alert.present();
  }

  do_login() {
    
    var auth = '', token = '', arr


    if (this.username && this.password) {
      
      this.storage.get('ip').then((val) => {
        //this.sqlite.do_get_setting_from_id('1').then((data) => {
        //rỗng
        if (val != '') {
          //gán giá trị ip, ip có thể rỗng
          this.ip = val;
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
                  this.do_inser_update(this.username, this.password, token)
                  
                  //vào trang pagethongtin
                  
                  this.navCtrl.push(PageThongTinPage, params);
                  // this.events.publish('loginsuccess', this.ip, token);
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
        console.log("lỗi ip"+ this.ip);
        this.toastCtrl.showErrorToast('middle', 'Có lỗi!');
      });
    }
    //tài khoản hoặc mật khẩu rỗng
    else {
      this.toastCtrl.showErrorToast('middle', 'Hãy nhập tài khoản hoặc mật khẩu!');
    }


    //nếu tài khoản hoặc mật khẩu ko rỗng thì thực hiện tiếp theo 
    // if (this.username && this.password) {
    //   this.sqlite.get_setting().then((data) => {
    //     //this.sqlite.do_get_setting_from_id('1').then((data) => {
    //     arr = data;
    //     //rỗng
    //     if (arr.length != 0) {
    //       //gán giá trị ip, ip có thể rỗng
    //       this.ip = arr[0].gia_tri;
    //       //kiểm tra nếu ip ko rỗng
    //       if (this.ip) {
    //         this.restPro.do_post(this.ip + this.restPro.auth, this.modul_chucnang.create_json_login(this.username, this.password), 1).then(data => {
    //           auth = data['data']['authorization_code']
    //           this.restPro.do_post(this.ip + this.restPro.token, this.modul_chucnang.create_json_authorization_code(auth), 1).then(data => {
    //             token = data['data']['access_token']

    //             let params = {};
    //             params = {
    //               access_token: token,
    //               ip: this.ip
    //             };
    //             //nếu đăng nhập thành công thì insert hoặc update tài khoản vào sqlite 
    //             this.do_inser_update(this.username, this.password, token)

    //             //vào trang pagethongtin
    //             this.navCtrl.setRoot('PageThongTinPage', params);
    //             this.events.publish('loginsuccess', this.ip, token);
    //             //this.navCtrl.push(MenuPage,params);

    //           }, error => {
    //             console.log(error)
    //           })
    //         }, error => {
    //           console.log(error)
    //           if (error['status'] == 1) {
    //             this.toastCtrl.showErrorToast('middle', 'The request timed out!')
    //           }
    //           else {
    //             this.toastCtrl.showErrorToast('middle', 'Tài khoản hoặc mật khẩu không đúng!')
    //           }
    //         })
    //       }
    //       //ip rỗng thì mở lại menu
    //       else {
    //         this.toastCtrl.showErrorToast('middle', 'Hãy nhập Địa chỉ Host!');
    //         this.menuCtrl.toggle();
    //       }
    //     }
    //     //chưa insert ip thì mở lại menu
    //     else {
    //       this.toastCtrl.showErrorToast('middle', 'Hãy nhập Địa chỉ Host!');
    //       this.menuCtrl.toggle();
    //     }
    //   }, (error) => {
    //     //data trả về error là sai tài khoản hoặc mật khẩu, show toast
    //     console.log(error);
    //     console.log("lỗi ip"+ this.ip);
    //     this.toastCtrl.showErrorToast('middle', 'Có lỗi!');
    //   });
    // }
    // //tài khoản hoặc mật khẩu rỗng
    // else {
    //   this.toastCtrl.showErrorToast('middle', 'Hãy nhập tài khoản hoặc mật khẩu!');
    // }
  
  }

  do_get_version() {
    this.appVersion.getVersionNumber().then((data) => {
      this.version = data
    }, error => {
      console.log(error)
    })
  }


}
