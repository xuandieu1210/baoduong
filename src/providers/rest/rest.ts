import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://10.51.138.20/apiv2/'
  auth = 'authorize'
  token = 'accesstoken'

  constructor(private http: HTTP, private loadingCtrl: LoadingController) {
  }

  do_get(urltype, param, toast_type) {
    
    let loading = this.loadingCtrl.create({ content: "Xin chờ giây lát..." });
    if (toast_type == 1) {
      loading.present();
    }
    return new Promise((resolve, reject) => {
      this.http.get(urltype, param, {})
        .then((data) => {
          resolve(JSON.parse(data.data));
          loading.dismissAll();
        }, (error) => {
          reject(error);
          loading.dismissAll();
        });
    });
  }

  do_get_(urltype, param) {
    return new Promise((resolve, reject) => {
      this.http.get(urltype, param, {})
        .then((data) => {
          resolve(JSON.parse(data.data));
        }, (error1) => {
          reject(JSON.parse(error1.error || '{}'));
        });
    });
  }

  do_post(urltype, body, toast_type) {
    //khoi tao loading
    let loading = this.loadingCtrl.create({ content: "Xin chờ giây lát..." });
    if (toast_type == 1) {
      loading.present();
    }

    //this.http.setRequestTimeout(90)

    this.http.setDataSerializer('urlencoded');
    return new Promise((resolve, reject) => {
      this.http.post(urltype, body, {})
        .then((data) => {
          resolve(JSON.parse(data.data));
          //thuc hien xong get thì tắt loading
          loading.dismissAll();
        }, (error) => {
          reject(error);
          loading.dismissAll();
        });
    });
  }

  do_post_log_out(urltype, body, token, toast_type) {
    //khoi tao loading
    let loading = this.loadingCtrl.create({ content: "Xin chờ giây lát..." });
    if (toast_type == 1) {
      loading.present();
    }
    this.http.setDataSerializer('urlencoded');
    return new Promise((resolve, reject) => {
      this.http.post(urltype, body, { "x-access-token": token })
        .then((data) => {
          resolve(JSON.parse(data.data));
          loading.dismissAll();
        }, (error) => {
          reject(error);
          loading.dismissAll();
        });
    });

  }

  do_upload_file(urltype, body, token, filePath, name) {
    let loading = this.loadingCtrl.create({ content: "Xin chờ giây lát..." });
    loading.present();

    this.http.setDataSerializer('urlencoded');
    return new Promise((resolve, reject) => {
      this.http.uploadFile(urltype, body, { 'x-access-token': token }, filePath, name)
        .then((data) => {
          resolve(JSON.parse(data.data));
          loading.dismissAll();
        }, (error) => {
          reject(error);
          loading.dismissAll();
        });
    });
  }
}
