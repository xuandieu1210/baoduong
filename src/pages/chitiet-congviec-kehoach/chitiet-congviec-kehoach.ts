import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, ModalOptions, Modal, ModalController, ViewController, Refresher, normalizeURL } from 'ionic-angular';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { RestProvider } from '../../providers/rest/rest';
import { Toa_do } from '../../model/Toa_do';
import { CheckTokenProvider } from '../../providers/check-token/check-token';
import { ModalShowImagePage } from '../modal-show-image/modal-show-image';
import { ShowAnhMoiDotbdPage } from '../show-anh-moi-dotbd/show-anh-moi-dotbd';
import { ModalsPostAnhCongViecCanhanPage } from '../modals-post-anh-cong-viec-canhan/modals-post-anh-cong-viec-canhan';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageViewerController } from 'ionic-img-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
/**
 * Generated class for the ChitietCongviecKehoachPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chitiet-congviec-kehoach',
  templateUrl: 'chitiet-congviec-kehoach.html',
})
export class ChitietCongviecKehoachPage {
  title;
  id_dotbd;
  token;
  dot_bd;
  ds_cv;
  ip;
  toa_do;
  id_nhanvien;
  truong_nhom;
  shownGroup = null;
  ds_congviec;
  ds_nhanvien;
  keys;
  trangthai_dotbd;
  nhanvien_select;
  pageIndex;
  appType;
  photo = '';
  photos = [''];
  post_anh = false;
  base64Image1 = '';
  imageViewerCtrl;
  latitude ;
  longitude ;
  distance ;
  geolocation ;
  diagnostic;
  check_toa_do = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private toastCtrl: ToastControlProvider, private modul_chucnang: ModulChucnangProvider, private restProvider: RestProvider,
    private modalCtrl: ModalController, private view: ViewController, private check_token: CheckTokenProvider,
    private camera: Camera, imageViewerCtrl: ImageViewerController, private platform: Platform) {

    
    this.token = navParams.get('data').access_token
    this.dot_bd = navParams.get('data').dbd
    this.ip = navParams.get('data').ip
    //this.id_nhanvien = navParams.get('data').id_nhanvien
    this.pageIndex = navParams.get('data').pageIndex
    this.appType = navParams.get('data').appType

    this.title = this.dot_bd.MA_DOTBD
    this.id_dotbd = this.dot_bd.ID_DOTBD.toString()
    this.get_thongtin_canhan()
    
    this.do_get_chitiet_congviec()

  }

  ionViewDidLoad() {
    this.check_token.check_token(this.ip, this.token, this.navCtrl)
  }

  do_get_chitiet_congviec(){
    if (this.pageIndex == '3') {
      this.get_chitiet_congviec_lichsu(this.token, this.id_dotbd)
    } else {
      this.get_chitiet_congviec(this.token, this.id_dotbd)
    }
  }

  // doRefresh(refresher: Refresher) {    
  //   setTimeout(() => {
  //     this.do_get_chitiet_congviec()
  //     refresher.complete();
  //   }, 500);
  // }

  doPulling(refresher: Refresher) {
    //console.log('DOPULLING', refresher.progress);
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }

  toggleSection(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  check_hidden_trang_thai(trangthai) {
    //return ((this.trangthai_dotbd != 'dangthuchien') || ((this.modul_chucnang.change_alias(trangthai) == 'cho xac nhan') && (this.trangthai_dotbd == 'dangthuchien')));
    return ((this.modul_chucnang.change_alias(trangthai) == 'cho xac nhan') || (this.modul_chucnang.change_alias(trangthai) == 'hoan thanh'))
  }

  check_ketqua_dat(ket_qua) {
    return this.modul_chucnang.change_alias(ket_qua) == 'dat';
  }

  ham_bo_dau(ket_qua) {
    return this.modul_chucnang.change_alias(ket_qua)
  }

  get_thongtin_canhan() {
    var thongtin_canhan
    this.restProvider.do_get(this.ip + 'me', this.modul_chucnang.create_json_access_token(this.token), 0).then((data) => {
      thongtin_canhan = data['data']
      this.id_nhanvien = thongtin_canhan.info.ID_NHANVIEN;      
    }, (error) => {
      console.log(error);
    });
  }

  get_chitiet_congviec(token, id_dotbd) {
    this.restProvider.do_get(this.ip + 'dotbaoduong/xem', this.modul_chucnang.create_json_get_congviec_canhan(token, id_dotbd, this.pageIndex), 1).then((data) => {
      this.ds_congviec = data['data']['DS_CONGVIEC']
      this.keys = this.modul_chucnang.get_key_name_array(this.ds_congviec)

      this.trangthai_dotbd = data['data']['THONGTIN_DBD']['TRANGTHAI']
      this.truong_nhom = data['data']['THONGTIN_DBD']['ID_NHANVIEN']
      
      // this.ds_cv = this.modul_chucnang.list_ds_cong_viec_chi_tiet(data['data']['DS_CONGVIEC'], this.dot_bd.trang_thai)
      this.toa_do = new Toa_do(data['data']['THONGTIN_DBD']['TRAMVT']['VI_DO'], data['data']['THONGTIN_DBD']['TRAMVT']['KINH_DO'])
      // this.truong_nhom = data['data']['THONGTIN_DBD']['ID_NHANVIEN']
    }, (error) => {
      console.log(error);
      this.toastCtrl.showErrorToast('middle', 'Đợt bảo dưỡng chưa có nội dung!')
    });
  }

  get_chitiet_congviec_lichsu(token, id_dotbd) {
    this.restProvider.do_get(this.ip + 'dotbaoduong/xemlichsu', this.modul_chucnang.create_json_get_thuchien_congviec(token, id_dotbd), 1).then((data) => {
      this.ds_congviec = data['data']['DS_CONGVIEC']
      this.keys = this.modul_chucnang.get_key_name_array(this.ds_congviec)

      this.trangthai_dotbd = data['data']['THONGTIN_DBD']['TRANGTHAI']
      this.truong_nhom = data['data']['THONGTIN_DBD']['ID_NHANVIEN']
      
      // this.ds_cv = this.modul_chucnang.list_ds_cong_viec_chi_tiet(data['data']['DS_CONGVIEC'], this.dot_bd.trang_thai)
      this.toa_do = new Toa_do(data['data']['THONGTIN_DBD']['TRAMVT']['VI_DO'], data['data']['THONGTIN_DBD']['TRAMVT']['KINH_DO'])
      // this.truong_nhom = data['data']['THONGTIN_DBD']['ID_NHANVIEN']
    }, (error) => {
      console.log(error);
      this.toastCtrl.showErrorToast('middle', 'Đợt bảo dưỡng chưa có nội dung!')
    });
  }

  do_show_modals_luu_ghi_chu(item, page_name) {
    const myModalOptione: ModalOptions = {
      enableBackdropDismiss: false,
      cssClass: "transactionForm-modal"
    };
    const data = {
      item: item,
      token: this.token,
      ip: this.ip
    }

    const myModal: Modal = this.modalCtrl.create(page_name, { data: data }, myModalOptione);
    myModal.present();
    myModal.onDidDismiss((data) => {
      if (data['trang_thai'] == 'ok') {
        item.GHICHU = data['ghichu']
      }
    })
  }

  do_show_modals_luu_kien_nghi(item, page_name) {
    const myModalOptione: ModalOptions = {
      enableBackdropDismiss: false,
      cssClass: "transactionForm-modal"
    };
    const data = {
      item: item,
      token: this.token,
      ip: this.ip
    }

    const myModal: Modal = this.modalCtrl.create(page_name, { data: data }, myModalOptione);
    myModal.present();
    myModal.onDidDismiss((data) => {
      if (data['trang_thai'] == 'ok') {
        item.KIENNGHI = data['kiennghi']
      }
    })
  }

  check_hoanthanh_congviec_canhan(item) {
    if (item.ANH == null && item.NOIDUNG.IMAGES == 1) {
      this.toastCtrl.showErrorToast('middle', 'Vui lòng post ảnh công việc trước khi hoàn thành!')
    } else {
    // else {
      let alert = this.alertCtrl.create({
        title: 'Thông báo!',
        message: 'Bạn muốn hoàn thành công việc?',
        buttons: [
          {
            text: 'Không',
            handler: () => {
            }
          },
          {
            text: 'Có',
            handler: () => {
              this.hoanthanh_congviec_canhan(item)
            }
          }
        ]
      });
      alert.present();
    }
  }

  hoanthanh_congviec_canhan(item) {
    if ((item.NOIDUNG.YEUCAUNHAP != '0') && (item.GHICHU == null)) {
      this.toastCtrl.showErrorToast('middle', "Phải nhập ghi chú trước!");
    }
    else {
      this.restProvider.do_post_log_out(this.ip + 'congviec/hoanthanh', this.modul_chucnang.create_json_hoanthanh_congviec_canhan(item.ID_DOTBD.toString(),
        item.ID_THIETBI.toString(), item.NOIDUNG.MA_NOIDUNG, item.ID_NHANVIEN), this.token, 1).then((data) => {
          if (data['status'] === 1) {
            this.toastCtrl.showToast('middle', 'Thành công!')
            item.TRANGTHAI = "Chờ xác nhận"
          }
        }, (error) => {
          console.log(error)
          this.toastCtrl.showErrorToast('middle', 'Không thành công!')
        });
    }
  }

  do_take_photo_dotbd() {
    var page_next;
    page_next=(this.pageIndex == '1') ? 'ModalsPostAnhCongViecCanhanPage' : 'ModalsPostAnhCongViecToTruongPage';
    const myModalOptione: ModalOptions = {
      enableBackdropDismiss: false
    };
    const data = {
      id_dotbd: this.id_dotbd,
      title: this.title,
      toado: this.toa_do,
      pageIndex: this.pageIndex,
      token: this.token,
      ip: this.ip
    }

    const myModal: Modal = this.modalCtrl.create(page_next, { data: data }, myModalOptione);
    myModal.present();
    myModal.onDidDismiss((data) => {
      if ((data.trang_thai == 'ok') && (data.pageIndex == '2')) {
        const data1 = {
          trang_thai: "hoanthanh_ok"
        };
        this.view.dismiss(data1)
      }
    })
  }

  doAlert_xacnhan_congviec_chua_hoanthanh() {
    let alert = this.alertCtrl.create({
      title: 'Thông báo!',
      subTitle: 'Nhân viên bảo dưỡng chưa hoàn thành công việc, bạn phải yêu cầu hoàn thành trước!',
      buttons: ['Ok']
    });
    alert.present();
  }

  doAlert_xacnhan_congviec(item) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Bạn muốn đánh giá và xác nhận hoàn thành công việc này?');

    alert.addInput({
      type: 'radio',
      label: 'Đạt',
      value: '1',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Không đạt',
      value: '0'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.xacnhan_congviec(item, data)
      }
    });

    alert.present();
  }

  check_xacnhan_congviec_to_truong(item) {
    if (this.ham_bo_dau(item.TRANGTHAI) == 'cho xac nhan') {
      this.doAlert_xacnhan_congviec(item)
    }
    else {
      this.doAlert_xacnhan_congviec_chua_hoanthanh()
    }
  }

  xacnhan_congviec(item, ketqua) {
    this.restProvider.do_post_log_out(this.ip + 'congviec/xacnhan', this.modul_chucnang.create_json_xacnhan_congviec(item.ID_DOTBD.toString(),
      item.ID_THIETBI.toString(), item.NOIDUNG.MA_NOIDUNG, item.ID_NHANVIEN, ketqua), this.token, 1).
      then((data) => {
        this.toastCtrl.showToast('middle', 'Xác nhận thành công!')
        item.TRANGTHAI = "Hoàn thành"
        if (ketqua == '1') {
          item.KETQUA = 'Đạt'
        }
        else {
          item.KETQUA = 'Không đạt'
        }
      }, (error) => {
        console.log(error);
        this.toastCtrl.showErrorToast('middle', 'Xác nhận không thành công!')
      });
  }

  doAlert_xacnhan_tatca_congviec() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Bạn muốn đánh giá và xác nhận tất cả công việc có trong đợt bảo dưỡng?');

    alert.addInput({
      type: 'radio',
      label: 'Đạt',
      value: '1',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Không đạt',
      value: '0'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.xacnhan_tatca_congviec(data)
      }
    });
    alert.present();
  }

  xacnhan_tatca_congviec(ketqua) {
    this.restProvider.do_post_log_out(this.ip + 'congviec/xacnhantatca', this.modul_chucnang.create_json_xacnhan_tatca_congviec(this.id_dotbd,
      ketqua), this.token, 1).
      then((data) => {
        this.do_get_chitiet_congviec()        
         this.toastCtrl.showToast('middle', data['data']['message'])        
      }, (error) => {
        console.log(error);
        this.toastCtrl.showErrorToast('middle', 'Xác nhận không thành công!')
      });
  }


  check_huy_xac_nhan_congviec(item) {    
    let alert = this.alertCtrl.create({
      title: 'Thông báo!',
      message: 'Bạn muốn hủy xác nhận công việc?',
      buttons: [
        {
          text: 'Không',
          handler: () => {
          }
        },
        {
          text: 'Có',
          handler: () => {
            this.huy_xac_nhan_cong_viec(item)
          }
        }
      ]
    });
    alert.present();
  }

  huy_xac_nhan_cong_viec(item){
    this.restProvider.do_post_log_out(this.ip + 'congviec/hoanthanh', this.modul_chucnang.create_json_hoanthanh_congviec_canhan(item.ID_DOTBD.toString(),
        item.ID_THIETBI.toString(), item.NOIDUNG.MA_NOIDUNG, item.ID_NHANVIEN), this.token, 1).then((data) => {
          if (data['status'] === 1) {
            this.toastCtrl.showToast('middle', 'Thành công!')
            item.TRANGTHAI = "Chờ xác nhận";
            item.KETQUA = null
          }
        }, (error) => {
          console.log(error)
          this.toastCtrl.showErrorToast('middle', 'Không thành công!')
        });
  }

  do_show_anh_dotbd() {
    var ds_image_nhanvien;
    var type;
    if (this.id_nhanvien == this.truong_nhom) {
      type = ''
    }
    else {
      type = '2'
    }
    this.restProvider.do_get(this.ip + 'dotbaoduong/get-images', this.modul_chucnang.create_json_check_post_anh(this.token, this.id_dotbd, type), 1).then((data) => {
      ds_image_nhanvien = data['data']
      console.log(ds_image_nhanvien)      
      this.navCtrl.push(ShowAnhMoiDotbdPage, {
        title: this.title,
        ip: this.ip,
        data: ds_image_nhanvien
      })
    }, (error) => {
      console.log(error);
      this.toastCtrl.showErrorToast('middle', 'Đợt bảo dưỡng không có ảnh!')
    });
  }

  xem_anh(anh) {
    var page_next;
    page_next='ModalShowImagePage';
    const myModalOptione: ModalOptions = {
      enableBackdropDismiss: false,
      cssClass: "transactionConfirm-modal"
    };
    const data = {
      token: this.token,
      ip: this.ip,
      image : anh
    }

    const myModal: Modal = this.modalCtrl.create(page_next, { data: data }, myModalOptione);
    myModal.present();
  }


  closeModals() {
    const data = {
      trang_thai: "no_ok"
    };
    this.view.dismiss(data);
  }

  start_camera(item) {
    // this.diagnostic = new Diagnostic();
    // this.check_toa_do = true;
    // if (this.platform.is('android')) {
    //   this.diagnostic.getLocationMode()
    //     .then((state) => {
    //       if (state == this.diagnostic.locationMode.LOCATION_OFF) {
    //         this.modul_chucnang.show_setting_gps()
    //         setTimeout(() => {
    //           this.get_toa_do()
    //         }, 1500); //sau 1.5 giây
    //       } else {
    //         this.get_toa_do()
    //       }
    //     }).catch(e => {
    //       console.error(e)
    //     });
    // }
    // this.do_button_get_toa_do().then(){

    // }
    //this.toastCtrl.showErrorToast('middle', 'Bạn ở quá xa trạm' +  check)

    this.do_button_get_toa_do().then((data) => {
      if (data == false) {
        this.toastCtrl.showErrorToast('middle', 'Bạn ở quá xa trạm, vui lòng đến trạm để đăng hình!')
      } else {
        const options: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
        }
    
        this.camera.getPicture(options).then((imageData) => {
         
          this.base64Image1 = '';
          this.base64Image1 = normalizeURL(imageData);
          this.photo = normalizeURL(this.base64Image1);
          
          if (this.photo == '') {
            this.toastCtrl.showErrorToast('middle', 'Hãy chụp 1 ảnh mô tả công việc!')
          }
          else {
            
            this.upload_image(this.photo, item)
            this.post_anh = true;
             
          }
          
        }, (err) => {
          // Handle error
        });
      }
    });
     
  
    
   
  }


  upload_image(file, item) {
    this.restProvider.do_upload_file(this.ip + 'congviec/uploadv2', this.modul_chucnang.create_json_upload_1image(item.ID_DOTBD.toString(), item.ID_THIETBI.toString(), item.NOIDUNG.MA_NOIDUNG.toString()), this.token,
      file, 'file').then((data) => {
        console.log(data)
        if (data['status'] == 1) {
          item.ANH = data['data'].filename
          this.toastCtrl.showToast('middle', "Gửi ảnh thành công!")
        }
      }, (error) => {
        console.log(error)
        this.toastCtrl.showErrorToast('middle', "Gửi ảnh không thành công!")
      });
  }

  xem_them(text) {
    var page_next;
    page_next='ShowtextPage';
    const myModalOptione: ModalOptions = {
      enableBackdropDismiss: false,
      cssClass: "transactionText-modal"
    };
    const data = {
      token: this.token,
      ip: this.ip,
      text : text
    }

    const myModal: Modal = this.modalCtrl.create(page_next, { data: data }, myModalOptione);
    myModal.present();
  }


  post_so_lieu (child) 
  {

    var dulieu = child.SOLIEUTHUCTE
    var title = 'Nhập số liệu thực tế'

    let alert = this.alertCtrl.create({
      
      title: title,
      inputs: [
        {
          type: 'textarea',
          name: 'dulieumoi',
          value: dulieu
        }
      ],
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Nhập',
          handler: data => {
            if (data.dulieumoi != dulieu) {
              this.restProvider.do_post_log_out(this.ip + 'congviec/luu', this.modul_chucnang.create_json_luu_so_lieu(child.ID_DOTBD.toString(),
              child.ID_THIETBI.toString(), child.NOIDUNG.MA_NOIDUNG, child.ID_NHANVIEN, data.dulieumoi), this.token, 1).then((data1) => {
                console.log(data1)
                if (data1['status'] == 1) {
                  this.toastCtrl.showToast('middle', 'Lưu thành công!')
                  child.SOLIEUTHUCTE = data.dulieumoi
                      
                  
                }
              }, (error) => {
                this.toastCtrl.showErrorToast('middle', 'Lưu không thành công!')
                console.log(error)
              });
              // logged in!
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  do_button_get_toa_do() {
    this.diagnostic = new Diagnostic();
    var check ;
    if (this.platform.is('android')) {
      this.diagnostic.getLocationMode()
        .then((state) => {
          if (state == this.diagnostic.locationMode.LOCATION_OFF) {
            this.modul_chucnang.show_setting_gps()
            setTimeout(() => {
              check = this.get_toa_do()
            }, 1500); //sau 1.5 giây
          } else {
            check = this.get_toa_do()
          }
        }).catch(e => {
          check = false
          console.error(e)
        });
    }
    return check;
  }

  get_toa_do() {
    this.latitude = ''
    this.longitude = ''
    this.distance = ''
    this.geolocation = new Geolocation();
    

      let watch = this.geolocation.watchPosition({maximumAge:60000, timeout:5000, enableHighAccuracy:true});
      watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
        this.latitude = data.coords.latitude.toFixed(6)
        this.longitude = data.coords.longitude.toFixed(6)
        this.distance = this.modul_chucnang.cal_distance_two_point(parseFloat(this.toa_do.latitude), parseFloat(this.toa_do.longitude), data.coords.latitude, data.coords.longitude).toFixed(2);
        this.geolocation.clearWatch(watch)
       
        
        // this.check_toa_do = false
      });

      return (this.distance < 500) ?  false :  true;
  }



  do_button_get_toa_do1(item) {
    this.diagnostic = new Diagnostic();
    this.check_toa_do = true;
    if (this.platform.is('android')) {
      this.diagnostic.getLocationMode()
        .then((state) => {
          if (state == this.diagnostic.locationMode.LOCATION_OFF) {
            this.modul_chucnang.show_setting_gps()
            // setTimeout(() => {
            //   this.get_toa_do1(item)
            // }, 5000); //sau 1.5 giây
          } else {
            this.get_toa_do1(item)
          }
        }).catch(e => {
          console.error(e)
        });
    }
  }

  get_toa_do1(item) {
    this.latitude = ''
    this.longitude = ''
    this.distance = ''
    this.geolocation = new Geolocation();
    
      let watch = this.geolocation.watchPosition({maximumAge:60000, timeout:5000, enableHighAccuracy:true});
      watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
        this.latitude = data.coords.latitude.toFixed(6)
        this.longitude = data.coords.longitude.toFixed(6)
        this.distance = this.modul_chucnang.cal_distance_two_point(parseFloat(this.toa_do.latitude), parseFloat(this.toa_do.longitude), data.coords.latitude, data.coords.longitude).toFixed(2);
        // this.check_toa_do = false
      });

      if (this.distance < 500) {
        const options: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
        }
    
        this.camera.getPicture(options).then((imageData) => {
         
          this.base64Image1 = '';
          this.base64Image1 = normalizeURL(imageData);
          this.photo = normalizeURL(this.base64Image1);
          
          if (this.photo == '') {
            this.toastCtrl.showErrorToast('middle', 'Hãy chụp 1 ảnh mô tả công việc!')
          }
          else {
            
            this.upload_image(this.photo, item)
            this.post_anh = true;
             
          }
          
        }, (err) => {
          // Handle error
        });
      } else {
        this.toastCtrl.showErrorLocationToast('middle', 'Vị trí của bạn('+this.latitude+', '+this.longitude+') ở quá xa trạm, vui lòng đến trạm để đăng hình!')
      }
  }
}
