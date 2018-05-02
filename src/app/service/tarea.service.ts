import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Tarea } from "../models/tarea.model";
import { AuthService } from "../service/auth.service";
import { CategoriaserviceService } from "../service/categoriaservice.service";
import { Http } from "@angular/http";
import { HttpHeaders } from "@angular/common/http";
@Injectable()
export class TareaService {
  identity_id;
  url;
  token;
  providers: [AuthService];

  constructor(private http: HttpClient, private userService: AuthService) {
    this.identity_id = this.userService.getIdentity();
    this.url = "http://localhost:4030/tareas/" + this.identity_id.idUsuario;
  }

  getTarea(): Observable<Tarea[]> {
    let headers1 = new HttpHeaders({
      Authorization: localStorage.getItem("token")
    });
    console.log(this.identity_id);
    console.log(headers1);
    return this.http.get<Tarea[]>(this.url, { headers: headers1 });
  }
}
