import { Component, OnInit, Inject } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Http, Response } from "@angular/http";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ContactComponent } from "../contact/contact.component";
import { CategoriaserviceService } from "../service/categoriaservice.service";
import { Categoria } from "../models/category.model";
import { ContactoService } from "../service/contactos.service";
import { AuthService } from "../service/auth.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-contactedit",
  templateUrl: "./contactedit.component.html",
  styleUrls: ["./contactedit.component.css"],
  providers: [AuthService]
})
export class ContacteditComponent implements OnInit {
  idContacto = 0;
  nombre = "";
  numero = "";
  idCategoria = 0;
  idUsuario = 1;
  list: Object;
  temp_var: Object = false;
  _postArray: Categoria[];
  closeResult: string;
  identity_id;

  constructor(
    private modalService: NgbModal,
    private dialogRef: MatDialogRef<ContactComponent>,
    private categoriaService: CategoriaserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http,
    private httpCliente: HttpClient,
    private userService: AuthService
  ) {
    console.log(data);
    this.identity_id = this.userService.getIdentity();
  }

  actualizarContacto(idContacto) {
    let headers1 = new HttpHeaders({
      Authorization: localStorage.getItem("token")
    });

    this.httpCliente
      .put(
        "http://localhost:4030/contactos/" + idContacto + "",
        {
          nombre: this.data.nombre,
          numero: this.data.numero,
          idCategoria: this.data.idCategoria,
          idUsuario: this.identity_id.idUsuario
        },
        { headers: headers1 }
      )
      .subscribe(response => {});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCategoria(): void {
    this.categoriaService
      .getCategoria()
      .subscribe(
        resultArray => (this._postArray = resultArray),
        error => console.log("Error " + error)
      );
  }

  ngOnInit(): void {
    this.getCategoria();
  }
}
