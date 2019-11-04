import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { ToastControlProvider } from '../../providers/toast-control/toast-control';
import { ModulChucnangProvider } from '../../providers/modul-chucnang/modul-chucnang';

/**
 * Generated class for the DaiTramComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dai-tram',
  templateUrl: 'dai-tram.html'
})
export class DaiTramComponent {

  ttvts: any;
  ttvt_select: any;
  ds_tram: any;
  tram_select: any;
  token;
  ip;
  dia_chi = "";
  hidden_bd_kehoach = false;
  hidden_bd_dangthuchien = false;
  
  hide_diachi = true;
  tram_disable=false;

  @Output() data_output=new EventEmitter();

  constructor(private restProvider: RestProvider,private toastCtrl: ToastControlProvider,private modul_chucnang: ModulChucnangProvider) {
    
  }

  @Input()
  set ipContent(value) {
    this.ip = value[0];
    this.token=value[1]
    this.get_ttvt(this.token)
  }

  get_ttvt(token) {
    this.restProvider.do_get(this.ip + "daivt/index", this.modul_chucnang.create_json_access_token(token),1).then((data) => {
      this.ttvts = data['data'];
      //kiểm tra trả về mảng rỗng
      if (this.ttvts.length == 0) {
        this.toastCtrl.showToast('middle', 'Không có TTVT nào!');
      }
      else {
        this.ttvt_select = this.ttvts[1];
        this.ttvtChange(this.ttvt_select);
        //console.log(this.ttvt_select);
      }

    }, (error) => {
      console.log(error);
      this.toastCtrl.showToast('middle', 'Lỗi kết nối!');
    });
  }

  //hàm lấy danh sách các thiết bị mỗi TTVT  url:https://10.51.188.9/spsm/mapi/thietbi/1  (1:id_dai)
  get_thietbi(token, id_dai) { //{ "access_token": token, "daivt": id_dai } 
    var ds_tram1;
    this.restProvider.do_get(this.ip + "tramvt/index", this.modul_chucnang.create_json_get_tram_vt(token, id_dai),0).then((data) => {
      ds_tram1 = data['data'];
      if (ds_tram1.length == 0) {
        //this.toastCtrl.showToast('middle', 'TTVT không có thiết bị nào!');
        this.hide_diachi=false
        this.dia_chi = 'Trung tâm không có thiết bị nào.'
        this.tram_disable = true
      }

      else {
        this.ds_tram = this.modul_chucnang.add_phantu_all_vao_ds_tram(ds_tram1)
        this.tram_select = this.ds_tram[0];
        this.dia_chi = this.tram_select.dia_diem;
        this.tram_disable=false
      }
    }, (error) => {
      console.log(error);
      this.toastCtrl.showToast('middle', 'Lỗi kết nối!');
    });
  }

  //bắt sự kiện select TTVT, mỗi TT sẽ load danh sách thiết bị tương ứng
  ttvtChange(ttvt) {
    this.get_thietbi(this.token, ttvt.ID_DAI.toString());
    this.hidden_bd_dangthuchien = false;
    //this.hidden_bd_hoanthanh = false;
    this.hidden_bd_kehoach = false;
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

    this.hidden_bd_dangthuchien = false;
    //this.hidden_bd_hoanthanh = false;
    this.hidden_bd_kehoach = false;
  }

  do_click_button() {
    this.data_output.emit({"hidden_bd_kehoach":this.hidden_bd_kehoach,"hidden_bd_dangthuchien":this.hidden_bd_dangthuchien,
    "hide_diachi":this.hide_diachi,"ttvt_select":this.ttvt_select,"tram_select":this.tram_select})
  }

}
