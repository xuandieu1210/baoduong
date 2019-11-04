import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { ModulChucnangProvider } from '../providers/modul-chucnang/modul-chucnang';
import { Network } from "@ionic-native/network";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { ToastControlProvider } from '../providers/toast-control/toast-control';
import { ChitietCongviecKehoachPage } from '../pages/chitiet-congviec-kehoach/chitiet-congviec-kehoach';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera } from '@ionic-native/camera';
import { SqliteProvider } from '../providers/sqlite/sqlite';
import { SQLite } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';
import { CheckGpsProvider } from '../providers/check-gps/check-gps';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CheckTokenProvider } from '../providers/check-token/check-token';
import { AppVersion } from '@ionic-native/app-version';
import { ShowAnhMoiNhanVienPage } from '../pages/show-anh-moi-nhan-vien/show-anh-moi-nhan-vien';
import { ShowAnhMoiDotbdPage } from '../pages/show-anh-moi-dotbd/show-anh-moi-dotbd';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ModalsPostAnhCongViecCanhanPage } from '../pages/modals-post-anh-cong-viec-canhan/modals-post-anh-cong-viec-canhan';
import { ModalsPostAnhCongViecToTruongPage } from '../pages/modals-post-anh-cong-viec-to-truong/modals-post-anh-cong-viec-to-truong';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChitietCongviecKehoachPage,
    // ModalsPostAnhCongViecCanhanPage,
    // ModalsPostAnhCongViecToTruongPage,
    ShowAnhMoiNhanVienPage,
    ShowAnhMoiDotbdPage,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChitietCongviecKehoachPage,
    // ModalsPostAnhCongViecCanhanPage,
    // ModalsPostAnhCongViecToTruongPage,
    ShowAnhMoiNhanVienPage,
    ShowAnhMoiDotbdPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider, HTTP,
    ModulChucnangProvider,
    Network,
    OpenNativeSettings,
    ToastControlProvider,
    Keyboard,
    Camera,
    AppVersion,
    SqliteProvider,
    SQLite,
    Geolocation,
    CheckGpsProvider,
    Diagnostic,
    CheckTokenProvider,

  ]
})
export class AppModule { }
