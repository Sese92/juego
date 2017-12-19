import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {
  public usuarios: Array<any>;
  public pais;
  public mediapuntos;
  public mejorpuntuacion;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPage');
    this.afDB.list('usuarios').valueChanges().subscribe(
      result => {
        this.usuarios = result;
        console.log(this.usuarios);
        this.usuarios = this.usuarios.sort();
        this.usuarios.forEach(usuario => {
          var puntuaciones = usuario.puntuaciones;

          puntuaciones = puntuaciones.filter(item => item !== 'null');
          console.log(puntuaciones);
          usuario.mejorpuntuacion = Math.min.apply(null,puntuaciones);
          if(usuario.mejorpuntuacion == "Infinity"){
          usuario.mejorpuntuacion = "-";
        }


        });
      },
      error => {
        console.log("ERROR")        
      });
    }

  atras(){
    this.navCtrl.pop();
  }
}
