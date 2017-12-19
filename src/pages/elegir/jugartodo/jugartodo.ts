import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
 } from '@ionic-native/google-maps';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ResultadosPage } from './resultados/resultados';

 declare var google: any;

@IonicPage()
@Component({
  selector: 'page-jugartodo',
  templateUrl: 'jugartodo.html'
})
export class JugartodoPage {
  public buenapartida: boolean = false;
  public malapartida: boolean = false;
  public siguiente: boolean = false;
  public marcador;
  public longitudmarcador: number;
  public latitudmarcador: number;
  public posicionLugar;
  public lugares;
  public latlugar;
  public lonlugar;
  public puntostotales: Array<number> = [];
  public puntospartida;
  public turno: number = 0;
  public marker: Marker;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public auth: AngularFireAuth,
    public alertCtrl:AlertController) {
  }

  ionViewDidLoad(){
    this.afDB.list('continentes/Europa').valueChanges().subscribe(
      result => {
        this.lugares = result;
        var posicionlugares = Math.floor(Math.random() * 29);
        var lugarelegido = this.lugares[posicionlugares];
        this.latlugar = lugarelegido.lat;
        this.lonlugar = lugarelegido.lon;
        this.posicionLugar = new google.maps.LatLng(this.latlugar,this.lonlugar);
        console.log(this.posicionLugar);
      },
      error => {
        console.log("ERROR")
      });
      this.empezar();
    }

    empezar(){
        const alert = this.alertCtrl.create({
          title: '¿Empezamos?',
          buttons: [
            {
              text: "¡VAMOS!",
              handler : () => {
              this.initStreetView();    
              this.initMap();
              }
            },
            {
              text: "ATRÁS",
              handler : () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
    }

  atras(){
    const alert = this.alertCtrl.create({
      title: '¿Estás seguro?',
      subTitle: 'Perderás todo el progreso',
      buttons: [
        {
          text: "SI",
          handler : () => {
            this.navCtrl.pop();      
          }
        },
        {
          text: "NO",
        }
      ]
    });
    alert.present();
  }
  
  initStreetView(){
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('streetview'), {
          position: this.posicionLugar,
          pov: {
            heading: 100,
            pitch: 0
          }
        });
  }

  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 54, lng: 25},
      zoom: 3,
      mapTypeId: 'hybrid'
    });

    map.addListener('rightclick', (e) => {
      var latitudlongitudmarcador = this.placeMarker(e.latLng, map);
      this.latitudmarcador = latitudlongitudmarcador[0];
      this.longitudmarcador = latitudlongitudmarcador[1];
      console.log("latitud: " + this.latitudmarcador);
      console.log("longitud: " + this.longitudmarcador);
    });

    }
    
    placeMarker(latLng, map) {
      if (this.marker) {
        this.marker.setPosition(latLng);
      } else {
        this.marker = new google.maps.Marker({
          position: latLng,
          map: map,
        });
      }
      var latitudlongitud = JSON.stringify(latLng);
      var latlong = JSON.parse(latitudlongitud);
      
      var latitud = latlong.lat;
      var longitud = latlong.lng;
      return [latitud, longitud];
    }

    ponermarcador(){
      var map = new google.maps.Map(document.getElementById('map'), {
        center: this.posicionLugar,
        zoom: 4,
        mapTypeId: 'hybrid'
      });

      var marker1 = new google.maps.Marker({
        position: this.posicionLugar, //Posicion street view
        map: map,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });
      var marker2 = new google.maps.Marker({
        position: {lat: this.latitudmarcador, lng: this.longitudmarcador}, //Posicion marcador
        map: map,
      });
      this.puntospartida = this.getDistanceFromLatLonInKm(this.latlugar,this.lonlugar,this.latitudmarcador,this.longitudmarcador);
      this.puntospartida = Math.round(this.puntospartida);
      if(this.puntospartida > 200){
        this.malapartida = true;
      }
      else{
        this.buenapartida = true;
      }
      this.puntostotales.push(this.puntospartida);
      console.log(this.puntostotales);
      
    }

   aceptar(){
      console.log(this.latitudmarcador);
      console.log(this.longitudmarcador);

      this.ponermarcador();
      this.siguiente = true;
   }


   siguienteturno(){
    this.turno = this.turno + 1;
    console.log(this.turno);
    if(this.turno < 5){
      var posicionlugares = Math.floor(Math.random() * 29);
      var lugarelegido = this.lugares[posicionlugares];
      console.log(lugarelegido);
      this.latlugar = lugarelegido.lat;
      this.lonlugar = lugarelegido.lon; 
      this.posicionLugar = new google.maps.LatLng(this.latlugar,this.lonlugar);
  

      this.siguiente = false;
      this.buenapartida = false;
      this.malapartida = false;
      this.initStreetView();
      this.marker = null;
      this.initMap();
    }
    else{
      this.navCtrl.push(ResultadosPage, {'puntos': this.puntostotales});
      console.log("FIN");
    }
    
  }

  //Funciones para calcular la distancia entre puntos
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
   }

   deg2rad(deg) {
    return deg * (Math.PI/180)
   }
}
