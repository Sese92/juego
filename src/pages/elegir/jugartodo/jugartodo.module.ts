import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JugartodoPage } from './jugartodo';

@NgModule({
  declarations: [
    JugartodoPage,
  ],
  imports: [
    IonicPageModule.forChild(JugartodoPage),
  ],
})
export class JugartodoPageModule {}
