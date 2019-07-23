import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from '../../providers/global';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = 'HomePage';
  tab2Root: any = 'UploadPage';
  tab3Root: any = 'MyvotesPage';
  tab4Root: any = 'HistoryPage';
  myIndex: number;


  constructor(public navCtrl: NavController, public navParams: NavParams,public global:Globals) {
  		this.global.current_page="TabsPage"
      this.myIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
  }

  upload(){
    localStorage.setItem("uploadpage","new")
  }

}

