import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChitietCongviecKehoachPage } from './chitiet-congviec-kehoach';
import { IonicImageViewerModule } from 'ionic-img-viewer';


@NgModule({
  declarations: [
    ChitietCongviecKehoachPage,
  ],
  imports: [
    IonicPageModule.forChild(ChitietCongviecKehoachPage),
    IonicImageViewerModule,
  ],
})
export class ChitietCongviecKehoachPageModule {}
