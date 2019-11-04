import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageThongTinPage } from './page-thong-tin';

@NgModule({
  declarations: [
    PageThongTinPage,
  ],
  imports: [
    IonicPageModule.forChild(PageThongTinPage),
  ],
})
export class PageThongTinPageModule {}
