import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ElegirPage } from '../elegir/elegir';
import { RankingPage } from '../ranking/ranking';
import { AmigosPage } from '../amigos/amigos';
import { PerfilPage } from '../perfil/perfil';
import { ForoPage } from '../foro/foro';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  public elegir = ElegirPage;
  public ranking = RankingPage;
  public amigos = AmigosPage;
  public perfil = PerfilPage;
  public foro = ForoPage;
  private currentUser: firebase.User;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public afDB: AngularFireDatabase,
    public auth: AngularFireAuth,) {
      afDB.list('usuarios').valueChanges().subscribe(console.log);
      auth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

  public ionViewDidLoad() {
    var estado = firebase.auth().currentUser.email;
    console.log(estado);
  }

   public logout(){
    const alert = this.alertCtrl.create({
      title: 'Cerrar Sesión',
      subTitle: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: "SI",
          role: 'SI',
          handler : () => {
            this.auth.auth.signOut();
            this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: "NO",
          role: 'NO',
        }
      ]
    });
    alert.present();
  }
}
