import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { AuthService } from "../service/auth.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { TareaService } from "../service/tarea.service";
import { Tarea } from "../models/tarea.model";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { TareaEditarComponent } from "../tarea-editar/tarea-editar.component";
import { TareaEliminarComponent } from "../tarea-eliminar/tarea-eliminar.component";
@Component({
  selector: "app-tarea",
  templateUrl: "./tarea.component.html",
  styleUrls: ["./tarea.component.css"]
})
export class TareaComponent implements OnInit {
  descripcion = "";
  fechaInicio;
  fechaEntrega;
  identity_id;
  _postArray: Tarea[];

  constructor(
    private http: HttpClient,
    private userService: AuthService,
    private tareaService: TareaService,
    public dialog: MatDialog
  ) {
    this.identity_id = this.userService.getIdentity();
  }

  ngOnInit() {
    this.getTareas();
  }

  ingresarTarea() {
    let headers1 = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
    );

    this.http
      .post(
        "http://localhost:4030/tareas",
        {
          descripcion: this.descripcion,
          fechaInicio: this.fechaInicio,
          fechaEntrega: this.fechaEntrega,
          idUsuario: this.identity_id.idUsuario
        },
        { headers: headers1 }
      )
      .subscribe(response => {
        console.log(this.fechaInicio);
        this.getTareas();
      });
  }

  getTareas(): void {
    this.tareaService
      .getTarea()
      .subscribe(
        resultArray => (this._postArray = resultArray),
        error => console.log("Error " + error)
      );
  }

  openDialog(tareaData): void {
    console.log(tareaData);
    let dialogRef = this.dialog.open(TareaEditarComponent, {
      width: "500px",
      height: "500px",
      data: {
        idTarea: tareaData.idTarea,
        descripcion: tareaData.descripcion,
        fechaInicio: tareaData.fechaInicio,
        fechaEntrega: tareaData.fechaEntrega,
        idUsuario: this.identity_id.idUsuario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTareas();
    });
  }

  deleteDialog(tareaData) {
    console.log(tareaData);
    let dialogRef = this.dialog.open(TareaEliminarComponent, {
      width: "350px",
      height: "350px",
      data: {
        idTarea: tareaData.idTarea
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTareas();
    });
  }
}
