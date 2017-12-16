import { Component } from '@angular/core';
import { IonicPage , NavController, LoadingController, Loading, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase} from 'angularfire2/database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { User, Amigo } from '../../modelos/usuario';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage{

  public myForm: FormGroup;
  public loading: Loading;
  public usuario: User;
  public amigos:Array<Amigo>;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public autenticar: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public fireDatabase: AngularFireDatabase
  ) {
    this.myForm = this.createMyForm();
  }
  
  public registrar(){
    if(this.myForm.value.password != this.myForm.value.passwordConfirmation){
        let alert = this.alertCtrl.create({
          message: "Las contraseñas no coinciden",
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
    }else{
     
    this.autenticar.auth.createUserWithEmailAndPassword(this.myForm.value.email,this.myForm.value.password).then(
      res => {
        this.usuario = new User(this.myForm.value.userName,
                                this.myForm.value.email,
                                this.myForm.value.password,
                                this.myForm.value.pais,
                                [],
                                this.amigos = []);
        this.fireDatabase.database.ref('usuarios/' + this.myForm.value.userName).set(this.usuario);
        this.navCtrl.push(HomePage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  private createMyForm(){
    return this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      pais: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }
  atras(){
    this.navCtrl.pop();
  }

  public ionViewDidLoad() {
    /*let europa=[
      {"id": "0", "title": "Lisboa", "lat": "38.78354512980677", "lon": "-9.090760791546387"},
      {"id": "1", "title": "Oporto", "lat": "41.16887438928443", "lon": "-8.675806646660448"},
      {"id": "2", "title": "Madrid", "lat": "40.419305", "lon": "-3.693441"},
      {"id": "3", "title": "Barcelona", "lat": "41.403617", "lon": "2.175587"},
      {"id": "4", "title": "París", "lat": "48.85452565992526", "lon": "2.300043490180087"},
      {"id": "5", "title": "Niza", "lat": "43.69466299391767", "lon": "7.263049605376139"},
      {"id": "6", "title": "Roma", "lat": "41.891406", "lon": "12.490444"},
      {"id": "7", "title": "Milán", "lat": "45.480454", "lon": "9.122560"},
      {"id": "8", "title": "Bruselas", "lat": "50.844974", "lon": "4.349850"},
      {"id": "9", "title": "Gante", "lat": "51.05389", "lon": "3.722028"},
      {"id": "10", "title": "Londres", "lat": "51.500874", "lon": "-0.122644"},
      {"id": "11", "title": "Manchester", "lat": "53.485203", "lon": "-2.245234"},  
      {"id": "12", "title": "Acantilados de Moher (Irlanda del Sur)", "lat": "52.97286314297126", "lon": "-9.43061264739805"},  
      {"id": "13", "title": "Calzada de los Gigantes (Irlanda del Norte)", "lat": "55.240940", "lon": "-6.511706"},  
      {"id": "14", "title": "Amsterdam", "lat": "52.358929", "lon": "4.884010"},
      {"id": "15", "title": "Munich", "lat": "48.137153", "lon": "11.575331"},
      {"id": "16", "title": "Berlín", "lat": "52.516148", "lon": "13.376577"},
      {"id": "17", "title": "Zurich", "lat": "47.369942", "lon": "8.542527"},
      {"id": "18", "title": "Zagreb", "lat": "45.808090", "lon": "15.968230"},
      {"id": "19", "title": "Viena", "lat": "48.202386", "lon": "16.368582"},
      {"id": "20", "title": "Praga", "lat": "50.09121625884094", "lon": "14.401638"},
      {"id": "21", "title": "Varsovia", "lat": "52.249827", "lon": "21.011841"},
      {"id": "22", "title": "Kiev", "lat": "50.435168", "lon": "30.556834"},
      {"id": "23", "title": "Moscú", "lat": "55.752111", "lon": "37.612432"},
      {"id": "24", "title": "Praga", "lat": "50.09015132553051", "lon": "14.40080572234805"},
      {"id": "25", "title": "Copenhague", "lat": "55.692907", "lon": "12.599196"},
      {"id": "26", "title": "Estocolmo", "lat": "59.326938", "lon": "18.055334"},
      {"id": "27", "title": "Oslo", "lat": "59.916966", "lon": "10.728305"},
      {"id": "28", "title": "Helsinki", "lat": "60.169817", "lon": "24.952223"},
      {"id": "29", "title": "Atenas", "lat": "37.971476", "lon": "23.726176"}
    ];
    this.fireDatabase.database.ref('continentes/'+ "Europa").set(europa);
    */
  }
}