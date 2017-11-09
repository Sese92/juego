import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  private currentUser: firebase.User;
  public infoUser:any;
  public usuarios:Array<any>;
  public posicion:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public afDB: AngularFireDatabase,
              public auth: AngularFireAuth,) {

  }

  ionViewDidLoad() {
    this.afDB.list('usuarios').valueChanges().subscribe(
      result => {
        this.usuarios = result;
        console.log( 'Usuarios '+this.usuarios);
      }, 
      error =>{
        console.log("ERROR")
      });
    this.auth.authState.subscribe((user: firebase.User) => this.currentUser = user);
    var correo = firebase.auth().currentUser.email;
    console.log( 'Correo ' + correo);  
    
    for (var i = 0; i < this.usuarios.length; i++) {
        if(this.usuarios[i].email===correo){
          this.posicion=i;
        }   
    }
    console.log("La posicion es " + this.posicion);
  }
  atras(){
    this.navCtrl.pop();
  }

}
