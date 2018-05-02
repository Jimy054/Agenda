import { Component, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Router, ActivatedRoute, Params } from "@angular/router";
import { Users } from "../models/user.model";
import { AuthService } from "../service/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  public user: Users;
  public token;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: AuthService
  ) {
    this.user = new Users("", "", "", "");
  }

  ngOnInit() {}
  /*
  ingresarUsuario() {
    this.http
      .post("http://localhost:4030/usuarios", {
        nombre: this.nombre,
        correo: this.correo,
        contrasena: this.contrasena
      })
      .subscribe(function Success(response) {
        console.log("Usuario Registrado");
      });
  }*/

  onSubmit() {
    this._userService.registrar(this.user).subscribe(
      response => {
        if (response) {
          console.log(response.user);
          this.status = "success";
        }
      },
      error => {
        console.log(<any>error);
        this.status = "error";
      }
    );
  }
}
