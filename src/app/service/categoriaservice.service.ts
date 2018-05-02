import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CategoryComponent } from "../category/category.component";
import { Categoria } from "../models/category.model";
import { AuthService } from "../service/auth.service";

@Injectable()
export class CategoriaserviceService {
  constructor(private http: HttpClient) {}

  url = "http://localhost:4030/categorias";

  getCategoria(): Observable<Categoria[]> {
    let headers1 = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
    );

    return this.http.get<Categoria[]>(this.url, { headers: headers1 });
  }
}
