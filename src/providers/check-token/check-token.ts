import { Injectable } from '@angular/core';
import { RestProvider } from '../rest/rest';
import { ModulChucnangProvider } from '../modul-chucnang/modul-chucnang';
import { HomePage } from '../../pages/home/home';
import { PageThongTinPage } from '../../pages/page-thong-tin/page-thong-tin';
import { ToastControlProvider } from '../toast-control/toast-control';

/*
  Generated class for the CheckTokenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CheckTokenProvider {

  constructor(private restProvider: RestProvider, private modul_chucnang: ModulChucnangProvider,
    private toastCtrl: ToastControlProvider) {
    
  }

  check_token(ip, token, nav) {
    this.restProvider.do_get_(ip + 'me', this.modul_chucnang.create_json_access_token(token)).then((data) => {
      // if (data['status'] ==  1) {
      //   nav.setRoot(PageThongTinPage)
      // }
    }, (error) => {
      if (error['errors'] == 'Access token expired') {
        nav.setRoot(HomePage)
        this.toastCtrl.showErrorToast('middle','Hết phiên làm việc, đăng nhập lại!')
      } 
    });
  }


}
