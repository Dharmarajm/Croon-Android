import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPage } from './upload';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    UploadPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadPage),
    PipesModule
  ],
})
export class UploadPageModule {}
