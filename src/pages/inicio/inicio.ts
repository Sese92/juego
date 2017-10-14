import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ElegirPage } from '../elegir/elegir';
import { RankingPage } from '../ranking/ranking';
import { AmigosPage } from '../amigos/amigos';
import { PerfilPage } from '../perfil/perfil';
import { ForoPage } from '../foro/foro';



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
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }
  logout(){
    const alert = this.alertCtrl.create({
      title: 'Cerrar Sesión',
      subTitle: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: ['SI', 'NO']
    });
    alert.present();
  }
}
