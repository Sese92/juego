import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-amigos',
  templateUrl: 'amigos.html',
})
export class AmigosPage {
  public usuarios;
  private currentUser: firebase.User;
  public nombreUser;
  public puntuaciones;
  public amigos: Array<any>;
  public soyyo;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public auth: AngularFireAuth
  ) {
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad AmigosPage');
    this.auth.authState.subscribe((user: firebase.User) => this.currentUser = user);
    var correo = firebase.auth().currentUser.email;
    this.afDB.list('usuarios').valueChanges().subscribe(
      result => {
        this.usuarios = result;
        this.usuarios.forEach(usuario => {
          if (usuario.email === correo) {
            this.nombreUser = usuario.userName;
            this.puntuaciones = usuario.puntuaciones;
            this.amigos = usuario.amigos;
            console.log(this.amigos);
          }
        });
  
  },
  error => {
    console.log("ERROR")    
  });

    this.afDB.list('usuarios').valueChanges().subscribe(
      result => {
        this.usuarios = result;
        console.log(this.usuarios);
        this.usuarios = this.usuarios.sort();
        this.usuarios.forEach(usuario => {
            if(this.amigos.indexOf(usuario.userName) >= 0){
              usuario.esamigo = true;
            }
            else{
              usuario.esamigo = false;
            }

        });          
      },
      error => {
        console.log("ERROR")        
      });
    }
  
    agregar(i){
      this.amigos.push(this.usuarios[i].userName);
      var datos = {
        "amigos": this.amigos
      }
      console.log(this.amigos);
      this.afDB.database.refFromURL('https://juegois2-dima.firebaseio.com/usuarios/' + this.nombreUser).update(datos);

    }

    atras(){
      this.navCtrl.pop();
  }

}
