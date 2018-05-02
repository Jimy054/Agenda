import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Http, Response } from "@angular/http";
import { Component, OnInit, Inject } from "@angular/core";
import { ContactComponent } from "../contact/contact.component";
import { Categoria } from "../models/category.model";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-contact-delete",
  templateUrl: "./contact-delete.component.html",
  styleUrls: ["./contact-delete.component.css"]
})
export class ContactDeleteComponent implements OnInit {
  constructor(
    private http: Http,
    private dialogRef: MatDialogRef<ContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpCliente: HttpClient
  ) {}
  list: Object;
  temp_var: Object = false;

  ngOnInit() {}

  eliminarContacto(idContacto) {
    let headers1 = new HttpHeaders({
      Authorization: localStorage.getItem("token")
    });

    this.httpCliente
      .delete("http://localhost:4030/contactos/" + idContacto + "", {
        headers: headers1
      })

      .subscribe(response => {});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
