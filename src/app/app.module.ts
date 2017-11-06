import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase-config';

import { MyApp } from './app.component';
import { ContinentesPage } from '../pages/continentes/continentes';
import { InicioPage } from '../pages/inicio/inicio';
import { ElegirPage } from '../pages/elegir/elegir';
import { RankingPage } from '../pages/ranking/ranking';
import { AmigosPage } from '../pages/amigos/amigos';
import { PerfilPage } from '../pages/perfil/perfil';
import { ForoPage } from '../pages/foro/foro';
import { HomePage } from '../pages/home/home';



@NgModule({
  declarations: [
    MyApp,
    ContinentesPage,
    InicioPage,
    ElegirPage,
    RankingPage,
    AmigosPage,
    PerfilPage,
    ForoPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
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
    ForoPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
