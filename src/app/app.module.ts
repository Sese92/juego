import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ContinentesPage } from '../pages/continentes/continentes';
import { InicioPage } from '../pages/inicio/inicio';
import { ElegirPage } from '../pages/elegir/elegir';
import { RankingPage } from '../pages/ranking/ranking';
import { AmigosPage } from '../pages/amigos/amigos';
import { PerfilPage } from '../pages/perfil/perfil';
import { ForoPage } from '../pages/foro/foro';



@NgModule({
  declarations: [
    MyApp,
    ContinentesPage,
    InicioPage,
    ElegirPage,
    RankingPage,
    AmigosPage,
    PerfilPage,
    ForoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContinentesPage,
    InicioPage,
    ElegirPage,
    RankingPage,
    AmigosPage,
    PerfilPage,
    ForoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
