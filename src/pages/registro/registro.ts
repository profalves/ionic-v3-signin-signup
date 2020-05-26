import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
} from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { User } from "./user-model";

@IonicPage()
@Component({
  selector: "page-registro",
  templateUrl: "registro.html",
})
export class RegistroPage {
  userToRegister: User = {
    username: "",
    password: "",
    name: "",
    email: "",
  };

  checkPassword: string;
  url: string;
  headers: HttpHeaders;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      "X-Parse-REST-API-Key": "restAPIKey",
      "X-Parse-Master-Key": "masterKey",
      "X-Parse-Application-id": "Appteste",
      "Content-Type": "application/json",
    });

    this.headers.append("X-Parse-REST-API-Key", "restAPIKey");
    this.headers.append("X-Parse-Master-Key", "masterKey");
    this.headers.append("X-Parse-Application-id", "Appteste");
    this.headers.append("Content-Type", "application/json");
  }

  goLogin() {
    this.navCtrl.pop();
  }

  confirmRegister() {
    if (this.userToRegister.password != this.checkPassword) {
      this.alertCtrl
        .create({
          title: "Erro",
          message: "As senhas informadas não coincidem!",
          buttons: ["Ok"],
        })
        .present();
      return;
    }

    this.url = "http://localhost:5550/teste/classes/_User";
    this.http
      .post(this.url, this.userToRegister, { headers: this.headers })
      // .map(res => res.json())
      .subscribe(
        (res) => {
          console.log(res);
          // this.loadingCtrl.dismiss();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegistroPage");
  }
}
