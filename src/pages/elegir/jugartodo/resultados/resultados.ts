import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InicioPage } from '../../../inicio/inicio';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
})
export class ResultadosPage {
  public puntostotales;
  public sumapuntos;
  private currentUser: firebase.User;
  public usuarios: Array<any>;
  public nombreUser: string;
  public puntuaciones;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public auth: AngularFireAuth,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadosPage');
    this.puntostotales = this.navParams.get('puntos');
    this.sumapuntos = this.puntostotales[0] + this.puntostotales[1] + this.puntostotales[2] + this.puntostotales[3] + this.puntostotales[4];
  
    this.auth.authState.subscribe((user: firebase.User) => this.currentUser = user);
    var correo = firebase.auth().currentUser.email;
    this.afDB.list('usuarios').valueChanges().subscribe(
      result => {
        this.usuarios = result;
        this.usuarios.forEach(usuario => {
          if (usuario.email === correo) {
            this.nombreUser = usuario.userName;
            this.puntuaciones = usuario.puntuaciones;
            this.puntuaciones.push(this.sumapuntos);
            console.log(this.puntuaciones);
          }
        });
  
  },
  error => {
    console.log("ERROR")    
  });
}


  aceptar(){
     var datos = {
      "puntuaciones": this.puntuaciones 
    }
    this.afDB.database.refFromURL('https://juegois2-dima.firebaseio.com/usuarios/' + this.nombreUser).update(datos);
    
    this.navCtrl.setRoot(InicioPage);
  }
}
