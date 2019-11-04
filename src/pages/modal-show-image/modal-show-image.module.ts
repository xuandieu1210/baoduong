import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalShowImagePage } from './modal-show-image';

@NgModule({
  declarations: [
    ModalShowImagePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalShowImagePage),
  ],
})
export class ModalShowImagePageModule {}
