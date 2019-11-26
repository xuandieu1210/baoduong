import { Injectable } from '@angular/core';
import { Tram_Item } from '../../model/Tram_Item';
import { Dot_bao_duong } from '../../model/Dot_bao_duong';
import { Chitiet_congviec } from '../../model/Chitiet_congviec';
import { AlertController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Image } from '../../model/Imge';
import { Ttvt_Item } from '../../model/Ttvt_Item';

/*
  Generated class for the ModulChucnangProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ModulChucnangProvider {

  constructor(private alertCtrl: AlertController, private diagnostic: Diagnostic) {

  }

  create_json_login(user, pass): Object {
    var myJson = {};
    myJson['username'] = user;
    myJson['password'] = pass;
    return myJson;
  }

  create_json_authorization_code(auth): Object {
    var myJson = {};
    myJson['authorization_code'] = auth;
    return myJson;
  }

  create_json_access_token(token): Object {
    var myJson = {};
    myJson["access_token"] = token;
    return myJson;
  }

  create_json_get_tram_vt(token, id_dai): Object {
    var myJson = {};
    myJson["access_token"] = token;
    myJson["daivt"] = id_dai;
    return myJson;
  }

  create_json_get_dot_bao_duong1(token, trangthai, id_dai, id_tram): Object {
    //Neu trangthai=kehoach, dangthuchien
    var myJson = {};
    myJson["access_token"] = token;
    myJson["trangthai"] = trangthai;
    myJson["daivt"] = id_dai;
    myJson["tramvt"] = id_tram;
    return myJson;
  }

  create_json_get_congviec_canhan(token, id_dbd, canhan): Object {
    var myJson = {};
    myJson["access_token"] = token;
    myJson["id"] = id_dbd;
    myJson["canhan"] = canhan;
    return myJson;
  }

  create_json_get_dot_bao_duong(token, type, id_dai, id_tram): Object {
    //Neu type == 1, tra ve nhung dot bao duong ma user tham gia
    //Neu type == 2, tra ve nhung dot bao duong ma user co the xem dc.
    var myJson = {};
    myJson["access_token"] = token;
    myJson["type"] = type;
    myJson["daivt"] = id_dai;
    myJson["tramvt"] = id_tram;
    return myJson;
  }
  create_json_get_chitiet_congviec(token, id_dotbd): Object {
    var myJson = {};
    myJson["access_token"] = token;
    myJson["dotbd"] = id_dotbd;
    return myJson;
  }
  create_json_luu_ghi_chu_canhan(ID_DOTBD, ID_THIETBI, MA_NOIDUNG, ID_NHANVIEN, GHICHU): Object {
    var myJson = {};
    myJson["ID_DOTBD"] = ID_DOTBD;
    myJson["ID_THIETBI"] = ID_THIETBI;
    myJson["MA_NOIDUNG"] = MA_NOIDUNG;
    myJson["ID_NHANVIEN"] = ID_NHANVIEN;
    myJson["GHICHU"] = GHICHU;
    return myJson;
  }

  create_json_luu_so_lieu_canhan(ID_DOTBD, ID_THIETBI, MA_NOIDUNG, ID_NHANVIEN, SOLIEUTHUCTE): Object {
    var myJson = {};
    myJson["ID_DOTBD"] = ID_DOTBD;
    myJson["ID_THIETBI"] = ID_THIETBI;
    myJson["MA_NOIDUNG"] = MA_NOIDUNG;
    myJson["ID_NHANVIEN"] = ID_NHANVIEN;
    myJson["SOLIEUTHUCTE"] = SOLIEUTHUCTE;
    return myJson;
  }

  create_json_luu_so_lieu(ID_DOTBD, ID_THIETBI, MA_NOIDUNG, ID_NHANVIEN, data): Object {
    var myJson = {};
    myJson["ID_DOTBD"] = ID_DOTBD;
    myJson["ID_THIETBI"] = ID_THIETBI;
    myJson["MA_NOIDUNG"] = MA_NOIDUNG;
    myJson["ID_NHANVIEN"] = ID_NHANVIEN;
    myJson["SOLIEUTHUCTE"] = data;
    return myJson;
  }

  create_json_luu_kien_nghi_canhan(ID_DOTBD, ID_THIETBI, MA_NOIDUNG, ID_NHANVIEN, KIENNGHI): Object {
    var myJson = {};
    myJson["ID_DOTBD"] = ID_DOTBD;
    myJson["ID_THIETBI"] = ID_THIETBI;
    myJson["MA_NOIDUNG"] = MA_NOIDUNG;
    myJson["ID_NHANVIEN"] = ID_NHANVIEN;
    myJson["KIENNGHI"] = KIENNGHI;
    return myJson;
  }

  create_json_hoanthanh_congviec_canhan(ID_DOTBD, ID_THIETBI, MA_NOIDUNG, ID_NHANVIEN): Object {
    var myJson = {};
    myJson["ID_DOTBD"] = ID_DOTBD;
    myJson["ID_THIETBI"] = ID_THIETBI;
    myJson["MA_NOIDUNG"] = MA_NOIDUNG;
    myJson["ID_NHANVIEN"] = ID_NHANVIEN;
    return myJson;
  }
  create_json_get_thuchien_congviec(token, id_dotbd): Object {
    var myJson = {};
    myJson["access_token"] = token;
    myJson["id"] = id_dotbd;
    return myJson;
  }
  create_json_xacnhan_congviec(ID_DOTBD, ID_THIETBI, MA_NOIDUNG, ID_NHANVIEN, KETQUA): Object {
    var myJson = {};
    myJson["ID_DOTBD"] = ID_DOTBD;
    myJson["ID_THIETBI"] = ID_THIETBI;
    myJson["MA_NOIDUNG"] = MA_NOIDUNG;
    myJson["ID_NHANVIEN"] = ID_NHANVIEN;
    myJson["KETQUA"] = KETQUA;
    return myJson;
  }
  create_json_xacnhan_tatca_congviec(ID_DOTBD, KETQUA): Object {
    var myJson = {};
    myJson["ID_DOTBD"] = ID_DOTBD;    
    myJson["KETQUA"] = KETQUA;
    return myJson;
  }

  create_json_upload_image(ID_DOTBD, type, STT): Object {
    var myJson = {};
    myJson["ID_DOTBD"] = ID_DOTBD;
    myJson["type"] = type;
    myJson["STT"] = STT;
    return myJson;
  }

  create_json_upload_1image(ID_DOTBD, ID_THIETBI, MA_NOIDUNG): Object {
    var myJson = {};
    myJson["ID_DOTBD"] = ID_DOTBD;
    myJson["ID_THIETBI"] = ID_THIETBI;
    myJson["MA_NOIDUNG"] = MA_NOIDUNG;
    return myJson;
  }


  create_json_lichsu_hoanthanh(access_token, daivt, tramvt, start, end): Object {
    var myJson = {};
    myJson["access_token"] = access_token;
    myJson["daivt"] = daivt;
    myJson["tramvt"] = tramvt;
    myJson["start"] = start;
    myJson["end"] = end;
    return myJson;
  }

  create_json_check_post_anh(token, ID_DOTBD, type): Object {
    var myJson = {};
    myJson["access_token"] = token;
    myJson["id"] = ID_DOTBD;
    myJson["type"] = type;
    return myJson;
  }

  //hàm chuyển tiếng việt thành ko dấu, ko in hoa
  change_alias(alias) {
    if (alias != null) {
      var str = alias;
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
      str = str.replace(/ + /g, " ");
      str = str.trim();
      return str;
    }
    else
      return ''

  }
  //add phần tử Tất cả vào vị trí đầu tiên của ds đài ttvt 
  add_phantu_all_vao_ds_dai(list): Ttvt_Item[] {
    var list_return = new Array<Ttvt_Item>();
    var all_item = new Ttvt_Item(0, '', '', '---Tất cả---', '', '')
    list_return.push(all_item)
    for (var i = 0; i < list.length; i++) {
      list_return.push(new Ttvt_Item(i + 1, list[i].ID_DAI.toString(), list[i].MA_DAIVT, list[i].TEN_DAIVT,
        list[i].DIA_CHI, list[i].ID_DONVI.toString()))
    }
    return list_return;
  }

  //add phần tử Tất cả vào vị trí đầu tiên của ds trạm 
  add_phantu_all_vao_ds_tram(list): Tram_Item[] {
    var list_return = new Array<Tram_Item>();
    var all_item = new Tram_Item(0, '', '---Tất cả---', '---Tất cả---', '', '', '', list[0].ID_DAI, list[0].ID_NHANVIEN)
    list_return.push(all_item)
    for (var i = 0; i < list.length; i++) {
      list_return.push(new Tram_Item(i + 1, list[i].ID_TRAM.toString(), list[i].MA_TRAM.toString(), list[i].TEN_TRAM, list[i].DIADIEM, list[i].KINH_DO,
        list[i].VI_DO, list[i].ID_DAI.toString(), list[i].ID_NHANVIEN.toString()))
    }
    return list_return;
  }

  //phân loại ds đợt bảo dưỡng theo 3 trạng thái: kehoach, dangthuchien, ketthuc
  list_dot_bao_duong(list, trangthai): Dot_bao_duong[] {
    var list_bd = new Array<Dot_bao_duong>();
    for (var i = 0; i < list.length; i++) {
      if (list[i].TRANGTHAI == trangthai) {
        list_bd.push(new Dot_bao_duong(list[i].ID_DOTBD, list[i].ID_TRAMVT, list[i].MA_DOTBD, list[i].NGAY_BD,
          list[i].NGAY_DUKIEN, list[i].NGAY_KT, list[i].NGAY_KT_DUKIEN, list[i].TRANGTHAI, list[i].TRUONG_NHOM,
          list[i].DIADIEM, false))
      }
    }
    return list_bd;
  }

  // list_dot_bd_after_check_to_truong(list, id_nhanvien): Dot_bao_duong[] {
  //   var list_return=new Array<Dot_bao_duong>();
  //   for(var i=0;i<list.length;i++){
  //     if(list[i].truong_nhom == id_nhanvien){
  //       list_return.push(new Dot_bao_duong(list[i].id_dotbd, list[i].id_tramvt, list[i].ma_dotbd, list[i].ngay_bd,
  //         list[i].ngay_dukien, list[i].ngay_kt, list[i].ngay_kt_dukien, list[i].trang_thai,list[i].truong_nhom,true))
  //     }
  //     else{

  //     }
  //   }
  // }


  list_dot_bd_after_check_to_truong(list, id_nhanvien) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].truong_nhom == id_nhanvien) {
        list[i].check_thuchien = true;
      }
    }
  }

  list_ds_cong_viec_chi_tiet(list, trang_thai): Chitiet_congviec[] {
    var list_return = new Array<Chitiet_congviec>();
    var hidden_xacnhan
    if (trang_thai == 'dangthuchien') {  //dùng cho tab dangthuchien của menu đợt bảo dưỡng
      for (var i = 0; i < list.length; i++) {
        if (this.change_alias(list[i].KETQUA) === 'dat') {
          hidden_xacnhan = true
        }
        else {
          hidden_xacnhan = false
        }
        list_return.push(new Chitiet_congviec(list[i].ID_DOTBD.toString(), list[i].ID_THIETBI.toString(), list[i].GHICHU, list[i].TRANGTHAI,
          list[i].ID_NHANVIEN, list[i].NHANVIEN, list[i].KETQUA, list[i].NOIDUNG.MA_NOIDUNG, list[i].NOIDUNG.NOIDUNG,
          list[i].NOIDUNG.TEN_THIETBI, hidden_xacnhan))
      }
    }
    else {
      for (var j = 0; j < list.length; j++) {
        list_return.push(new Chitiet_congviec(list[j].ID_DOTBD.toString(), list[j].ID_THIETBI.toString(), list[j].GHICHU, list[j].TRANGTHAI,
          list[j].ID_NHANVIEN, list[j].NHANVIEN, list[j].KETQUA, list[j].NOIDUNG.MA_NOIDUNG, list[j].NOIDUNG.NOIDUNG,
          list[j].NOIDUNG.TEN_THIETBI, true))
      }
    }
    return list_return;
  }

  toRadians = (val) => {
    return val * Math.PI / 180;
  }

  toDegrees = (val) => {
    return val * 180 / Math.PI;
  }

  cal_distance_two_point(lat1, lon1, lat2, lon2): number {
    var R = 6371e3;
    var phi1 = this.toRadians(lat1);
    var phi2 = this.toRadians(lat2);
    var denta_phi = this.toRadians(lat2 - lat1);
    var denta_anpha = this.toRadians(lon2 - lon1);

    var a = Math.sin(denta_phi / 2) * Math.sin(denta_phi / 2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(denta_anpha / 2) * Math.sin(denta_anpha / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  show_setting_gps() {
    let confirm = this.alertCtrl.create({
      title: '<b>GPS</b>',
      message: 'Chưa bật GPS, bạn có muốn cài đặt không?',
      buttons: [
        {
          text: 'Cài đặt',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
          }
        }
      ]
    });
    confirm.present();
  }

  array_stt_image(data, ip): Image[] {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push(new Image(data[i].STT, this.get_image_folder(ip) + data[i].ANH))
    }
    return arr;
  }

  get_key_name_array(object): Array<String> {
    return Object.keys(object)
  }

  get_length(ds) {
    return ds.length;
  }

  get_link_image(ip) {//  apidemo/
    return ip.substring(0, ip.length - 8) + 'vnpt_mds/uploads/';
  }

  get_image_folder(ip) {
    return ip.replace('apiv2', 'vnpt_mds/uploads')
  }
  
}
