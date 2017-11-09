import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, Loading, AlertController } from 'ionic-angular';
//import { Usuarios } from '../../database';
import { RegistroPage } from '../registro/registro';
import { InicioPage } from '../inicio/inicio';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public usuarios;
  public password:string;
  public email:string;
  public loading:Loading;
  public registro = RegistroPage;
  constructor(public navCtrl: NavController,
              private autenticar: AngularFireAuth,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
             ){
  }

  ionViewDidLoad() {
    //var estado = firebase.auth().currentUser.email;
    //console.log(estado);    
  }

  public iniciar(){
    if(this.email==null || this.password==null){
      let alert = this.alertCtrl.create({
        message: "Los campos no pueden estar vacios",
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    }else{
    this.autenticar.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      console.log("User logging");
      this.navCtrl.push(InicioPage);
      this.email=null;
      this.password=null;
    }, (err) => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: err.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
