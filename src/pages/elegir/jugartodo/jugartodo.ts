import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

 declare var google: any;

@IonicPage()
@Component({
  selector: 'page-jugartodo',
  templateUrl: 'jugartodo.html'
})
export class JugartodoPage {
  public buenapartida: boolean = false;
  public malapartida: boolean = false;
  public siguiente: boolean = true;
  public marcador;
  public longitudmarcador;
  public latitudmarcador;
  public lugar = {lat: 37.971476, lng: 23.726176}

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {

  }

  ionViewDidLoad(){
    this.initMap();
    this.initStreetView();
  }

  atras(){
    this.navCtrl.pop();
  }
  
  initStreetView(){
    //Elegir posicion del array de lugares
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('streetview'), {
          position: this.lugar,
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

    map.addListener('rightclick', function(e){
      placeMarker(e.latLng, map);
    
    });
    var marker;

    function placeMarker(latLng, map) {
      if (marker) {
        marker.setPosition(latLng);
      } else {
        marker = new google.maps.Marker({
          position: latLng,
          map: map,
        });
      }

      var latitudlongitud = JSON.stringify(latLng);
      let latlong = JSON.parse(latitudlongitud);
      var latitud = latlong.lat;
      var longitud = latlong.lng;

      //this.latitudmarcador = latitud;
      //this.longitudmarcador = longitud;
           
      console.log("latlng: " + latLng);
      
    }
    }

    ponermarcador(){
      var map = new google.maps.Map(document.getElementById('map'), {
        center: this.lugar,
        zoom: 4,
        mapTypeId: 'hybrid'
      });

      var marker1 = new google.maps.Marker({
        position: this.lugar, //Posicion street view
        map: map,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });
      var marker2 = new google.maps.Marker({
        position: {lat: 40, lng: 30}, //Posicion marcador
        map: map,
      });      
    }


    siguienteturno(){
          this.initStreetView();
          this.initMap();
    }


   aceptar(){
      this.ponermarcador();
   }

/*
      poner marcador en lat1, lon1
      Trazar una linea
      this.getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2);
      if (km > x) {
        partidamala = true
        siguiente turno
      }
      else{
        partidabuena = true
        siguiente turno
      }
    }
    Parar el tiempo
    poner marcador en lat1, lon1
    Trazar una linea
    this.getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2);
    if (km > x) {
      partidamala = true
      Final
    }
    else{
      partidabuena = true
      Final

    }
  } 
  
  
      siguienteturno(){
        partidabuena = false
        partidamala = false
        initStreetView
        initmap
        siguienteturno = false
        reiniciar tiempo
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
   }*/
}
