import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DaiTramComponentModule } from '../../components/dai-tram/dai-tram.module';
import { PageCongViecHoanThanhPage } from './page-cong-viec-hoan-thanh';

@NgModule({
  declarations: [
    PageCongViecHoanThanhPage,
        
  ],
  imports: [
    DaiTramComponentModule,
    IonicPageModule.forChild(PageCongViecHoanThanhPage),
  ],
})
export class PageCongViecHoanThanhPageModule {}

