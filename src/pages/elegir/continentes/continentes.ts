import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JugartodoPage } from '../jugartodo/jugartodo';

@Component({
  selector: 'page-continentes',
  templateUrl: 'continentes.html'
})
export class ContinentesPage {
  public europa = JugartodoPage;
  
  constructor(public navCtrl: NavController) {
    
  }
   public atras(){
    this.navCtrl.pop();
  }

}
