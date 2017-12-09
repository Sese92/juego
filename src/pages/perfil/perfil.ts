import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { config } from 'localforage';
import { updateDate } from 'ionic-angular/util/datetime-util';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  user: any;
  passText: boolean;
  public puntuacion: any;
  private currentUser: firebase.User;
  public nombreUser: string;
  public email: string;
  public pais: string;
  public password: string;
  public usuarios: Array<any>;
  public posicion: number;
  public modificar: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public auth: AngularFireAuth,
    public loadingCtrl: LoadingController) {
    this.modificar = false;
    this.passText = false;
  }

  public ionViewDidLoad() {
    this.modificar = false;
    this.passText = false;
    this.auth.authState.subscribe((user: firebase.User) => this.currentUser = user);
    var correo = firebase.auth().currentUser.email;
    this.afDB.list('usuarios').valueChanges().subscribe(
      result => {
        this.usuarios = result;
        console.log('Usuarios ' + this.usuarios);
        this.usuarios.forEach(usuario => {
          if (usuario.email === correo) {
            this.pais = usuario.pais;
            this.puntuacion = usuario.puntuacion;
            this.nombreUser = usuario.userName;
            this.user = usuario.userName;
            this.email = usuario.email
            this.password = usuario.password;
          }
        });
      },
      error => {
        console.log("ERROR")
      });

  }

  public atras() {
    this.navCtrl.pop();
  }

  public modificarInfo() {
    this.modificar = true;
  }

  public cancelar() {
    this.modificar = false;
  }

  public actualizar() {
    var datos = {
      "pais": this.pais,
      "userName": this.nombreUser,
      "email": this.email,
      "password": this.password
    }
    this.afDB.database.refFromURL('https://juegois2-dima.firebaseio.com/usuarios/' + this.user).remove();
    this.afDB.database.refFromURL('https://juegois2-dima.firebaseio.com/usuarios/' + this.nombreUser).update(datos);
    var auth = firebase.auth();
    this.presentLoading();
    this.ionViewDidLoad();

  }

  public mostratPass() {
    this.passText = true;
  }

  public ocultarPass() {
    this.passText = false;
  }

  public presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 300
    });
    loader.present();
  }
}
