import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from "../models/user.model";

export const TOKEN_NAME: string = "jwt_token";

@Injectable()
export class AuthService {
  public url = "http://localhost:4030";
  public token;
  public identity;
  constructor(public _http: HttpClient) {}

  registrar(user: Users): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this._http.post(this.url + "/usuarios", params, {
      headers: headers
    });
  }

  login(usuarioData, gettoken = null): Observable<any> {
    if (gettoken != null) {
      usuarioData.gettoken = gettoken;
    }

    let params = JSON.stringify(usuarioData);
    let headers1 = new HttpHeaders()
      .set("Content-Type", "application/json")

    console.log(usuarioData);
    return this._http.post(this.url + "/login", params, {
      headers: headers1
    });
  }

  getToken() {
    let token = localStorage.getItem("token");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getIdentity() {
    var identity = JSON.parse(localStorage.getItem("identity"));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  /*
  constructor(public http: Http) {}
  private headers = new Headers({ 'Content-Type': 'application/json' });


  getToke():string{
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  login(user): Promise<string> {
    return this.http
      .post(`${this.url}/login`, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.text());
  }*/

  /*
  registrar(user: Users): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url + "usuarios", params, { headers: headers });
  }

  login(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.getToken = getToken;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = new HttpHeaders().set("Authorization", "Bearner " + this.token);
    return this.http.post(this.url + "/login", params, { headers: headers });
  }

  getIdentity() {
    var identity = JSON.parse(localStorage.getItem("identity"));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem("token");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
*/
}
