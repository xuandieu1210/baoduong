import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageCongViecToTruongPage } from './page-cong-viec-to-truong';
import { DaiTramComponentModule } from '../../components/dai-tram/dai-tram.module';

@NgModule({
  declarations: [
    PageCongViecToTruongPage,
    
  ],
  imports: [
    DaiTramComponentModule,
    IonicPageModule.forChild(PageCongViecToTruongPage),
  ],
})
export class PageCongViecToTruongPageModule {}
