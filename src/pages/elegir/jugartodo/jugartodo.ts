import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
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
  public siguienteturno: boolean = false;
  private database = "http://localhost:3000/europa";
  public lista;
  public datos;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {
  }

  ionViewDidLoad(){
    this.initMap();
    this.initStreetView();
  }

  getData(){
    return this.http.get(this.database).map ((res: Response) => res.json());
  }
  
  initStreetView(){
    //Consulta la base de datos creada
    this.getData().subscribe(data => {
      this.lista = data;
      this.datos = JSON.parse(JSON.stringify(this.lista));;
      console.log(this.datos);
    });

    
    var lugar = {lat: 37.971476, lng: 23.726176};
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('streetview'), {
          position: lugar,
          pov: {
            heading: 100,
            pitch: 0
          }
        });
  }

  initMap() {
    
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 1,
      mapTypeId: 'hybrid'
    });
    map.addListener('click', function(event) {
      this.addMarker(event.LatLng);
    });
  }
  
  
  addMarker(LatLng, map) {
    var marker = new google.maps.Marker({
      position: LatLng,
      map: map
    });
  }
  

/*   aceptar(){
    for (var i = 0; i < 4; i++) {
      Parar el tiempo
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
