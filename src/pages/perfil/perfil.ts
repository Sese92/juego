import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { config } from 'localforage';
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
  passText: boolean;
  public puntuacion: any;
  private currentUser: firebase.User;
  public nombreUser:string;
  public email:string;
  public pais:string;
  public password:string;
  public usuarios:Array<any>;
  public posicion:number;
  public modificar:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public afDB: AngularFireDatabase,
              public auth: AngularFireAuth,) {
      this.modificar=false;
      this.passText=false;
  }

  public ionViewDidLoad() {
    this.auth.authState.subscribe((user: firebase.User) => this.currentUser = user);
    var correo = firebase.auth().currentUser.email;
    this.afDB.list('usuarios').valueChanges().subscribe(
      result => {
        this.usuarios = result;
        console.log( 'Usuarios '+this.usuarios);
        this.usuarios.forEach(usuario => {
          if(usuario.email === correo){
            this.pais=usuario.pais;
            this.puntuacion=usuario.puntuacion;
            this.nombreUser=usuario.userName;
            this.email=usuario.email
            this.password=usuario.password;
          }
        });
      }, 
      error =>{
        console.log("ERROR")
      });
    //console.log("La posicion es " + this.posicion);
    //console.log( 'Usuarios 2 '+ this.afDB.list('usuarios'));
  }

  public atras(){
    this.navCtrl.pop();
  }

  public modificarInfo(){
    this.modificar=true;
  }

  public cancelar(){
    this.modificar=false;
  }

  public actualizar(){

  }

  public mostratPass(){
    this.passText=true;
  }

  public ocultarPass(){
    this.passText=false;
  }
}
