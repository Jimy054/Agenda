import { Component, OnInit, Inject } from "@angular/core";
import {
  Http,
  Response,
  Request,
  RequestMethod,
  RequestOptions,
  Headers
} from "@angular/http";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { CategoriaserviceService } from "../service/categoriaservice.service";
import { Categoria } from "../models/category.model";
import { Contact } from "../models/contact.model";
import "rxjs/Rx";
import { Observable } from "rxjs/Rx";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ContacteditComponent } from "../contactedit/contactedit.component";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { ContactDeleteComponent } from "../contact-delete/contact-delete.component";
import { AuthService } from "../service/auth.service";
import { ContactoService } from "../service/contactos.service";
import "rxjs/add/operator/map"; //Libreria para mapear los resultados a JSON

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
  providers: [AuthService, CategoriaserviceService, ContactoService]
})
export class ContactComponent implements OnInit {
  _postArray: Categoria[];
  _postArrayContacto: Contact[];
  idContacto = 0;
  nombre = "";
  numero = "";
  idUsuario = 0;
  idCategoria = 0;
  descripcionCategoria = "";
  list: Array<Object>[];
  identity_id;

  closeResult: string;

  constructor(
    private httpCliente: HttpClient,
    private categoriaService: CategoriaserviceService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private userService: AuthService,
    private contactService: ContactoService
  ) {
    this.identity_id = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this.getCategoria();

    this.getContactos();
    /*
    this.contactService
      .listar()
      .map(response => response.json())
      .subscribe(data => (this.list = data), error => console.log(error));
    console.log(this.list);*/
  }

  openDialog(contactData): void {
    console.log(contactData);
    let dialogRef = this.dialog.open(ContacteditComponent, {
      width: "500px",
      height: "500px",
      data: {
        idContacto: contactData.idContacto,
        nombre: contactData.nombre,
        numero: contactData.numero,
        idCategoria: contactData.idCategoria
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContactos();
    });
  }

  deleteDialog(contactData) {
    console.log(contactData);
    let dialogRef = this.dialog.open(ContactDeleteComponent, {
      width: "350px",
      height: "350px",
      data: {
        idContacto: contactData.idContacto
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContactos();
    });
  }

  ingresarContacto() {
    let headers1 = new HttpHeaders({
      Authorization: localStorage.getItem("token")
    });

    this.httpCliente
      .post(
        "http://localhost:4030/contactos",
        {
          nombre: this.nombre,
          numero: this.numero,
          idUsuario: this.identity_id.idUsuario,
          idCategoria: this.idCategoria
        },
        { headers: headers1 }
      )
      .subscribe(response => {
        this.getContactos();
      });
  }

  ingresarCategoria() {
    let headers1 = new HttpHeaders({
      Authorization: "Bearner " + localStorage.getItem("token")
    });

    this.httpCliente
      .post(
        "http://localhost:4030/categorias",
        {
          descripcion: this.descripcionCategoria
        },
        { headers: headers1 }
      )
      .subscribe(response => {
        console.log(response);
        this.getCategoria();
      });
  }

  getCategoria(): void {
    this.categoriaService
      .getCategoria()
      .subscribe(
        resultArray => (this._postArray = resultArray),
        error => console.log("Error " + error)
      );
  }

  getContactos(): void {
    this.contactService
      .getContacto()
      .subscribe(
        resultArray => (this._postArrayContacto = resultArray),
        error => console.log("Error " + error)
      );
  }
}
