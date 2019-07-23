import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyvotesPage } from './myvotes';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MyvotesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyvotesPage),
    PipesModule
  ],
})
export class MyvotesPageModule {}
