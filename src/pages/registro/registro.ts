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
}