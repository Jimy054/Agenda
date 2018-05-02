import { Component, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Users } from "../models/user.model";
import { AuthService } from "../service/auth.service";
import { error } from "util";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  public user: Users;
  public token;
  public status: string;
  public identity;
  public correo = "";
  public contrasena = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: AuthService
  ) {
    this.user = new Users("", "", "", "");
  }

  ngOnInit() {}

  onSubmit() {
    this.userService.login(this.user).subscribe(
      response => {
        this.identity = response.data[0];
        console.log(response.data[0]);
        if (!this.identity) {
          this.status = "error";
        } else {
          //PERSISTIR LOS DATOS DEL USUARIO
          localStorage.setItem("identity", JSON.stringify(this.identity));

          this.getToken();
          this.router.navigate(["/menu"]);
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }

  getToken() {
    this.userService.login(this.user, "true").subscribe(
      response => {
        this.token = response.token;
        console.log(this.token);
        if (this.token <= 0) {
          this.status = "error";
        } else {
          //PERSISTIR DATOS DEL USUARIO
          localStorage.setItem("token", this.token);
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }

  /*
  login() {
    this.userService.login(this.user).subscribe(
      response => {
        this.identity = response.user;
        console.log(this.identity);
        if (!this.identity) {
          this.status = "error";
        } else {
          console.log("Hola");
          //PERSISTIR LOS DATOS DEL USUARIO
          localStorage.setItem("identity", JSON.stringify(this.identity));
          this.getToken();
          this.router.navigate(["/menu"]);
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }

  getToken() {
    this.userService.login(this.user, "true").subscribe(
      response => {
        this.token = response.token;
        console.log(this.token);
        if (this.token <= 0) {
          this.status = "error";
        } else {
          //PERSISTIR DATOS DEL USUARIO
          localStorage.setItem("token: ", this.token);
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }*/
}
