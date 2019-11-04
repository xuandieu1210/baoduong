import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions, Modal, MenuController } from 'ionic-angular';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';
import { RestProvider } from '../../providers/rest/rest';
import { CheckTokenProvider } from '../../providers/check-token/check-token';
import { ShowAnhMoiNhanVienPage } from '../show-anh-moi-nhan-vien/show-anh-moi-nhan-vien';
import { ChitietCongviecKehoachPage } from '../chitiet-congviec-kehoach/chitiet-congviec-kehoach';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';

/**
 * Generated class for the PageCongViecCaNhanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page-cong-viec-ca-nhan',
  templateUrl: 'page-cong-viec-ca-nhan.html',
})
export class PageCongViecCaNhanPage {
  title;
  appType = '';

  token;
  ip;
  pageIndex;
  ttvt_select;
  tram_select;
  id_nhanvien;

  ds_congviec_kehoach;
  ds_congviec_dangthuchien;  
  ds_congviec_canhan;
  hidden_bd_kehoach;
  hidden_bd_dangthuchien;
  hide_diachi;
    
  shownGroup_kehoach = null;
  shownGroup_dangthuchien = null;
  
  shownGroup_sub_kehoach = null;
  shownGroup_sub_dangthuchien = null;
  
  //activeMenu: string;
  //ipContent = new Array<string>();


  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: RestProvider,
    private modul_chucnang: ModulChucnangProvider, private toastCtrl: ToastControlProvider,
    private modalCtrl: ModalController, public menu: MenuController,
    private check_token: CheckTokenProvider) {   
    
    this.appType = navParams.get('appType')
    this.pageIndex = navParams.get('pageIndex') //=1:công việc cá nhân;  =2: đợt bảo dưỡng
    this.token = navParams.get('access_token')
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
    
    
    this.get_ds_dot_bao_duong(this.token, 'kehoach', this.ttvt_select.id_dai, this.tram_select.id_tram, this.hide_diachi)
    this.get_ds_dot_bao_duong(this.token, 'dangthuchien',this.ttvt_select.id_dai,this.tram_select.id_tram,this.hide_diachi)
  }

  ionViewDidLoad() {
    this.check_token.check_token(this.ip, this.token, this.navCtrl)
  }

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

  // toggleSection(group) {
  //   if (this.isGroupShown(group)) {
  //     this.shownGroup = null;
  //   } else {
  //     this.shownGroup = group;
  //   }
  // }

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
  //   this.get_ds_dot_bao_duong(this.token, 'kehoach', ev.ttvt_select.ID_DAI.toString(), ev.tram_select.id_tram, this.hide_diachi)
  //   this.get_ds_dot_bao_duong(this.token, 'dangthuchien',ev.ttvt_select.ID_DAI.toString(),ev.tram_select.id_tram,this.hide_diachi)
  // }

  get_ds_dot_bao_duong(token, trang_thai, id_dai, id_tram, hide_diachi) {
    this.ds_congviec_kehoach = null;
    this.ds_congviec_dangthuchien = null;

    var ds_cv;
    this.restProvider.do_get(this.ip + 'dotbaoduong/danhsachcanhan', this.modul_chucnang.create_json_get_dot_bao_duong1(token, trang_thai, id_dai, id_tram),1).then((data) => {
      ds_cv = data['data'][0]['DS_DotBaoDuong']
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

  chitiet_congviec(dbd) {
    const myModalOptione: ModalOptions = {
      enableBackdropDismiss: true
    };
    const data = {
      dbd: dbd,
      access_token: this.token,
      ip: this.ip,
      id_nhanvien: this.id_nhanvien,
      pageIndex: this.pageIndex,
      appType: this.appType
    }

    const myModal: Modal = this.modalCtrl.create(ChitietCongviecKehoachPage, { data: data }, myModalOptione);
    myModal.present();

    myModal.onDidDismiss((data) => {
      if (data.trang_thai == 'hoanthanh_ok') {
        //this.get_ds_dot_bao_duong(this.token, this.pageIndex.toString(), this.ttvt_select.ID_DAI.toString(), this.tram_select.id_tram, 2)
      }
    })
  }
  check_button_hoanthanh(trang_thai): boolean {
    return this.modul_chucnang.change_alias(trang_thai) != 'chua hoan thanh';
  }

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

}
