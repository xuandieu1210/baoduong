import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaiTramComponent } from '../../components/dai-tram/dai-tram';

@NgModule({
  declarations: [
    DaiTramComponent
  ],
  imports: [
   // DaiTramComponent,
    IonicPageModule.forChild(DaiTramComponent),
  ],
  exports: [
    DaiTramComponent,
 
   ],
})
export class DaiTramComponentModule {}