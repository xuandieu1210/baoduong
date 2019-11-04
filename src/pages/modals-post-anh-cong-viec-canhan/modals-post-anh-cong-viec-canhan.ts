import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController, normalizeURL } from 'ionic-angular';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { Toa_do } from '../../model/Toa_do';
import { CheckTokenProvider } from '../../providers/check-token/check-token';

/**
 * Generated class for the ModalsPostAnhCongViecCanhanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modals-post-anh-cong-viec-canhan',
  templateUrl: 'modals-post-anh-cong-viec-canhan.html',
})
export class ModalsPostAnhCongViecCanhanPage {

  id_dbd;
  token;
  ip;
  title;
  pageIndex;

  base64Image1 = '';
  base64Image2 = '';
  base64Image3 = '';
  name_image1 = '';
  name_image2 = '';
  name_image3 = '';
  colorImage1 = 'dark'
  colorImage2 = 'dark'
  colorImage3 = 'dark'
  photos = ['', '', ''];
  photos1 = ['', '', ''];
  photo_da_luu;
  toa_do;
  latitude;

  longitude;
  distance;
  // lat_tram = 15.577800;
  // long_tram = 108.475190;
  check_toa_do = true;
  diagnostic;
  geolocation;
  post_anh = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private modul_chucnang: ModulChucnangProvider, private toastCtrl: ToastControlProvider,
    private camera: Camera, private restProvider1: RestProvider, private restProvider: RestProvider,
    private platform: Platform, private check_token: CheckTokenProvider, private alertCtrl: AlertController) {

    this.id_dbd = this.navParams.get('data').id_dotbd;
    this.token = this.navParams.get('data').token;
    this.ip = this.navParams.get('data').ip;
    this.title = this.navParams.get('data').title;
    this.pageIndex = this.navParams.get('data').pageIndex;
    this.toa_do = this.navParams.get('data').toado;
    // this.toa_do = new Toa_do(15.577800, 108.475190);

    this.do_check_up_image((parseInt(this.pageIndex) - 1).toString());
  }

  ionViewDidLoad() {
    this.check_token.check_token(this.ip, this.token, this.navCtrl)
  }

  //type = 0: Ca nhan
  //type = 1: To truong
  do_check_up_image(type) {
    var ten_key;
    if (type == 0) ten_key = 'nhanvien'
    else ten_key = 'totruong'
    this.restProvider1.do_get(this.ip + 'dotbaoduong/get-images', this.modul_chucnang.create_json_check_post_anh(this.token, this.id_dbd, type), 1).then((data) => {

      console.log(data)
      var key = this.modul_chucnang.get_key_name_array(data['data'][ten_key])
      var arr1 = data['data'][ten_key][key[0].toString()]
      this.photo_da_luu = this.modul_chucnang.array_stt_image(arr1, this.ip)
      if (this.photo_da_luu.length > 0) {
        this.post_anh = true
      }
      for (var i = 0; i < this.photo_da_luu.length; i++) {
        if (this.photo_da_luu[i].stt == 1) {
          this.colorImage1 = 'danger'
          this.photos1[0] = this.photo_da_luu[i].path
        }

        else if (this.photo_da_luu[i].stt == 2) {
          this.colorImage2 = 'danger'
          this.photos1[1] = this.photo_da_luu[i].path
        }

        else {
          this.colorImage3 = 'danger'
          this.photos1[2] = this.photo_da_luu[i].path
        }
      }
      console.log(this.photo_da_luu)
      // console.log(this.photos1)
    }, (error) => {
      console.log(error)
    });
  }

  show_image(stt) {
    switch (stt) {
      case 1:
        this.base64Image1 = this.photos1[0];
        break;
      case 2:
        this.base64Image2 = this.photos1[1];
        break;
      default:
        this.base64Image3 = this.photos1[2];
        break;
    }
  }

  do_button_get_toa_do() {
    this.diagnostic = new Diagnostic();
    this.check_toa_do = true;
    if (this.platform.is('android')) {
      this.diagnostic.getLocationMode()
        .then((state) => {
          if (state == this.diagnostic.locationMode.LOCATION_OFF) {
            this.modul_chucnang.show_setting_gps()
            setTimeout(() => {
              this.get_toa_do()
            }, 1500); //sau 1.5 giây
          } else {
            this.get_toa_do()
          }
        }).catch(e => {
          console.error(e)
        });
    }
  }

  get_toa_do() {
    this.latitude = ''
    this.longitude = ''
    this.distance = ''
    this.geolocation = new Geolocation();
    
    do {
      let watch = this.geolocation.watchPosition({maximumAge:60000, timeout:5000, enableHighAccuracy:true});
      watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
        this.latitude = data.coords.latitude.toFixed(6)
        this.longitude = data.coords.longitude.toFixed(6)
        this.distance = this.modul_chucnang.cal_distance_two_point(parseFloat(this.toa_do.latitude), parseFloat(this.toa_do.longitude), data.coords.latitude, data.coords.longitude).toFixed(2);
        // (this.distance < 500) ? this.check_toa_do = false : this.check_toa_do = true;
        this.check_toa_do = false
      });
      this.geolocation.clearWatch(watch)
    } while (this.distance > 500);
  }

  start_camera(i) {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      switch (i) {
        case 1:
          this.base64Image1 = ''
          this.base64Image1 = normalizeURL(imageData);
          this.photos[0] = this.base64Image1
          break;
        case 2:
          this.base64Image2 = ''
          this.base64Image2 = normalizeURL(imageData);
          this.photos[1] = this.base64Image2
          break;
        default:
          this.base64Image3 = ''
          this.base64Image3 = normalizeURL(imageData);
          this.photos[2] = this.base64Image3
          break;
      }
    }, (err) => {
      // Handle error
    });
  }

  delete_camera(i) {
    switch (i) {
      case 1:
        this.base64Image1 = "assets/imgs/empty.png";
        this.photos[0] = ''
        break;
      case 2:
        this.base64Image2 = "assets/imgs/empty.png";
        this.photos[1] = ''
        break;
      default:
        this.base64Image3 = "assets/imgs/empty.png";
        this.photos[2] = ''
        break;
    }
  }

  do_upload_image1() {
    if ((this.photos[0] == '') && (this.photos[1] == '') && (this.photos[2] == '')) {
      this.toastCtrl.showErrorToast('middle', 'Hãy chụp ít nhất 1 ảnh mô tả công việc!')
    }
    else {
      for (var i = 0; i < this.photos.length; i++) {
        if (this.photos[i] != '') {
          this.do_upload_image((i + 1), this.photos[i])
          this.post_anh = true;
        }
      }
    }
  }

  do_upload_image(stt, file) {
    var type;
    if (this.pageIndex == '1') {
      type = '0'
    }
    else {
      type = '1'
    }
    this.restProvider1.do_upload_file(this.ip + 'congviec/upload', this.modul_chucnang.create_json_upload_image(this.id_dbd, type, stt.toString()), this.token,
      file, 'file').then((data) => {
        console.log(data)
        if (data['status'] == 1) {
          this.toastCtrl.showToast('middle', "Gửi ảnh " + stt + " thành công!")
          switch (stt) {
            case 1:
              this.colorImage1 = 'danger';
              console.log(this.colorImage1)
              break;
            case 2:
              this.colorImage2 = 'danger';
              console.log(this.colorImage2)
              break;
            case 3:
              this.colorImage3 = 'danger';
              console.log(this.colorImage3)
              break;
          }
        }
      }, (error) => {
        console.log(error)
        this.toastCtrl.showErrorToast('middle', "Gửi ảnh " + stt + " không thành công!")
      });
  }

  check_do_hoan_thanh_dot_bao_duong() {
    let alert = this.alertCtrl.create({
      title: 'Thông báo!',
      message: 'Bạn có muốn hoàn thành đợt bảo dưỡng không?',
      buttons: [
        {
          text: 'Không',
          handler: () => {
          }
        },
        {
          text: 'Có',
          handler: () => {
            this.do_hoan_thanh_dot_bao_duong();
          }
        }
      ]
    });
    alert.present();
  }

  do_hoan_thanh_dot_bao_duong() {
    if (!this.post_anh) {
      this.toastCtrl.showToast('middle', 'Bạn chưa post ảnh!')
    }
    else {
      this.restProvider.do_get(this.ip + 'dotbaoduong/hoanthanh', this.modul_chucnang.create_json_get_thuchien_congviec(this.token, this.id_dbd), 1).then((data) => {
        if (data['status'] == 1) {
          this.toastCtrl.showToast('middle', 'Thành công!')
          const data1 = {
            trang_thai: "ok",
            pageIndex: this.pageIndex
          };
          this.view.dismiss(data1)
        }
      }, (error) => {
        console.log(error);
        this.toastCtrl.showErrorToast('middle', 'Không thành công!')
      });
    }
  }

  closeModals() {
    const data = {
      trang_thai: "post_close"
    };
    this.view.dismiss(data);

  }
}
