import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageCongViecCaNhanPage } from './page-cong-viec-ca-nhan';
import { DaiTramComponentModule } from '../../components/dai-tram/dai-tram.module';

@NgModule({
  declarations: [
    PageCongViecCaNhanPage,
    
    
  ],
  imports: [
    DaiTramComponentModule,
    IonicPageModule.forChild(PageCongViecCaNhanPage),
  ],
})
export class PageCongViecCaNhanPageModule {}
