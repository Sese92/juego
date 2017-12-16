import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase-config';

import { MyApp } from './app.component';
import { InicioPage } from '../pages/inicio/inicio';
import { ElegirPage } from '../pages/elegir/elegir';
import { JugartodoPage} from '../pages/elegir/jugartodo/jugartodo'
import { ContinentesPage } from '../pages/elegir/continentes/continentes';
import { RankingPage } from '../pages/ranking/ranking';
import { AmigosPage } from '../pages/amigos/amigos';
import { PerfilPage } from '../pages/perfil/perfil';
import { ForoPage } from '../pages/foro/foro';
import { HomePage } from '../pages/home/home';
import { RegistroPage } from '../pages/registro/registro'
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    InicioPage,
    ElegirPage,
    ContinentesPage,
    JugartodoPage,    
    RankingPage,
    AmigosPage,
    PerfilPage,
    ForoPage,
    HomePage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InicioPage,
    ElegirPage,
    ContinentesPage,
    JugartodoPage,    
    RankingPage,
    AmigosPage,
    PerfilPage,
    ForoPage,
    HomePage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
