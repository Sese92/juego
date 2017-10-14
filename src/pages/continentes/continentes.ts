import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-continentes',
  templateUrl: 'continentes.html'
})
export class ContinentesPage {

  constructor(public navCtrl: NavController) {

  }
  atras(){
    this.navCtrl.pop();
  }

}
