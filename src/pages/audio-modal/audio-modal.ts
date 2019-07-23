import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File,FileEntry, IFile } from '@ionic-native/file';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-audio-modal',
  templateUrl: 'audio-modal.html',
})
export class AudioModalPage {

  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  sec:number = 0;
  time:any ="00:00:00";
  interval:any;
  zero:any;
  show:any;
  isenabled:boolean=true;
  audioTrack:boolean = false;
  recordStart:boolean= false;
  Stop:boolean = false;
  Pause:boolean =false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private media: Media,private file: File,public platform: Platform){
      this.show=3;
      platform.registerBackButtonAction(() => {       
       this.viewCtrl.dismiss();
      }, 0);      
   }

    ionViewDidLoad() {
      console.log('ionViewDidLoad AudioModalPage');
    }
    
    public closeModal(){
      this.viewCtrl.dismiss();
    }

    getAudioList() {
      if(localStorage.getItem("audiolist")) {
        this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      }
    }

    ionViewWillEnter() {
      this.getAudioList();
    }

    playAudio(file,idx) {
      if (this.platform.is('ios')) {
        this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
        this.audio = this.media.create(this.filePath);
      } else if (this.platform.is('android')) {
        this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
        this.audio = this.media.create(this.filePath);
      }
      this.audio.play();
      this.audio.setVolume(1.0);
      //this.audio.setRate(2.0)
    }

    secondsToTime(secs)
    {
        var hours = Math.floor(secs / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        if(seconds < 10){
          this.zero = "0" + seconds;
          seconds = this.zero ;
        }
        if(minutes < 10){
          this.zero = "0" + minutes;
          minutes = this.zero ;
        }
        if(hours < 10){
          this.zero = "0" + hours;
          hours = this.zero ;
        }
        var obj = hours + ":" + minutes + ":" + seconds;
        return obj;
    }

    start(){  
      

       /* if (this.platform.is('ios')) {
            this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
              this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
              this.audio = this.media.create(this.filePath);
        } else if (this.platform.is('android')) {
            this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
              this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
              this.audio = this.media.create(this.filePath);
        }*/
            if(this.audioTrack==false && this.recordStart==false){
              this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';
              
             this.file.createFile(this.file.externalDataDirectory,this.fileName, true).then(() => {
                this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
                this.audio = this.media.create(this.filePath);
                this.audioTrack=true;
                this.Stop=true;
                this.Pause=true;
                this.audio.startRecord();

                this.audio.onSuccess.subscribe(() => console.log('Action is successful'));

                this.audio.onError.subscribe(error => console.log('Error!', error));
                this.recording = true;
                this.show = 1;      
                //this.isenabled=false; 
                this.time ="00:00:00";
                this.sec=0;   
                this.interval =setInterval(() => {
                this.sec +=1 ;
                this.time= this.secondsToTime(this.sec)
                }, 1000);
                this.recording = true; 
             }).catch(e => console.log(e));
            }else{
              if(this.recordStart==false){
                 this.audioTrack=false;
                 this.Pause=false;
                 this.recordStart=true;
                 this.audio.pauseRecord();
                 clearInterval(this.interval);
                 
               }else{
                 this.audioTrack=true;
                 this.recordStart=false;
                 this.Pause=true;
                 this.audio.resumeRecord();
                 this.interval =setInterval(() => {
                  this.sec +=1 ;
                  this.time= this.secondsToTime(this.sec)
                 }, 1000);
                 
               }
            }       
    }

    stop(){ 
        this.isenabled=false; 
        this.Stop=false;  
        this.show = 2;     
        clearInterval(this.interval);
        this.audio.stopRecord();
        this.audio.release();
        /*let data = { filename: this.fileName };
        this.audioList.push(data);
        localStorage.setItem("audiolist", JSON.stringify(this.audioList));
        this.recording = false;
        this.getAudioList();      */  
    }

    confirm(){
        /*let data = { filename: this.fileName };
        this.audioList.push(data);
        localStorage.setItem("audiolist", JSON.stringify(this.audioList));
        this.recording = false;
        this.getAudioList();  */
        localStorage.setItem("audiolist",JSON.stringify(this.filePath));
        localStorage.setItem("fileNameaudio",JSON.stringify(this.fileName));
        this.viewCtrl.dismiss();

    }

    startRecord() {
        if (this.platform.is('ios')) {
          this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
          this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
          this.audio = this.media.create(this.filePath);
        } else if (this.platform.is('android')) {
          this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
          this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
          this.audio = this.media.create(this.filePath);
        }
        this.audio.startRecord();
        this.recording = true;
    }



    stopRecord() {
     this.audio.stopRecord();
     let data = { filename: this.fileName };
     this.audioList.push(data);
     localStorage.setItem("audiolist", JSON.stringify(this.audioList));
     this.recording = false;
     this.getAudioList();
    }



//     getAudioList() {
//       if(localStorage.getItem("audiolist")) {
//         this.audioList = JSON.parse(localStorage.getItem("audiolist"));
//         console.log(this.audioList);
//       }
//     }


//     ionViewWillEnter() {
//      this.getAudioList();
//     }

//     startRecord() {
//       if (this.platform.is('ios')) {
//         this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';
//         this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
//         this.audio = this.media.create(this.filePath);
//       } else if (this.platform.is('android')) {
//         this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';
//         this.file.createFile(this.file.externalDataDirectory,this.fileName, true).then(() => {
//           this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
//           console.log(this.filePath)
//           this.audio = this.media.create(this.filePath);
//           console.log(this.audio)
//           this.audio.startRecord();
//           console.log(this.audio.startRecord())
//           this.recording = true;
//         })
        
//       }
//     }



//     stopRecord() {
//       this.audio.stopRecord();
//       this.audio.release();
//       console.log(this.audio.stopRecord())
//       let data = { filename: this.fileName };
//       this.audioList.push(data);
//       localStorage.setItem("audiolist", JSON.stringify(this.audioList));
//       this.recording = false;
//       this.getAudioList();
//     }


//     playAudio(file,idx) {
//       if (this.platform.is('ios')) {
//         this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
//         this.audio = this.media.create(this.filePath);
//       } else if (this.platform.is('android')) {
//         this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
//         console.log(this.filePath)
//         this.audio = this.media.create(this.filePath);
//         console.log(this.audio)
//       }
//       this.audio.play();
//       console.log(this.audio.play())
//       this.audio.setVolume(0.8);
//     }


// //sec:number = 0;
// //time:any ="00:00:00";
// //interval:any;
// //ngOnInit () {
// //}


// ss:any;
// secondsToTime(secs)
// {
// var hours = Math.floor(secs / (60 * 60));

// var divisor_for_minutes = secs % (60 * 60);
// var minutes = Math.floor(divisor_for_minutes / 60);

// var divisor_for_seconds = divisor_for_minutes % 60;
// var seconds = Math.ceil(divisor_for_seconds);

// if(seconds < 10){
//   this.ss = "0" + seconds;
//   seconds = this.ss ;
// }
// if(minutes < 10){
//   this.ss = "0" + minutes;
//   minutes = this.ss ;
// }
// if(hours < 10){
//   this.ss = "0" + hours;
//   hours = this.ss ;
// }

// var obj = hours + ":" + minutes + ":" + seconds;
// return obj;
// }

// start(){
// this.interval =setInterval(() => {
// this.sec +=1 ;
// this.time= this.secondsToTime(this.sec)
// }, 500);


//  if (this.platform.is('ios')) {
//         this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';
//         this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
//         this.audio = this.media.create(this.filePath);
//       } else if (this.platform.is('android')) {
//         this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';
//         this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
//         this.audio = this.media.create(this.filePath);
//       }
//       this.audio.startRecord();
//       console.log(this.audio.startRecord())
//       this.recording = true;



// }

// stop(){
//    clearInterval(this.interval);
//     this.audio.stopRecord();
//     console.log(this.audio.stopRecord())
//     let data = { filename: this.fileName };
//     this.audioList.push(data);
//     localStorage.setItem("audiolist", JSON.stringify(this.audioList));
//     this.recording = false;
//     this.getAudioList();
//     this.time="00:00:00";

// }

}
