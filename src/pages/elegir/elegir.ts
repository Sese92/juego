import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContinentesPage } from '../continentes/continentes';

@IonicPage()
@Component({
  selector: 'page-elegir',
  templateUrl: 'elegir.html',
})
export class ElegirPage {
  public continentes= ContinentesPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElegirPage');
  }
  atras(){
    this.navCtrl.pop();
  }

}
