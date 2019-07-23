import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioModalPage } from './audio-modal';

@NgModule({
  declarations: [
    AudioModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioModalPage),
  ],
})
export class AudioModalPageModule {}
