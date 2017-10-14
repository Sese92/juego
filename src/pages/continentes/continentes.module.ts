import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContinentesPage } from './continentes';

@NgModule({
  declarations: [
    ContinentesPage,
  ],
  imports: [
    IonicPageModule.forChild(ContinentesPage),
  ],
})
export class ContinentesPageModule {}
