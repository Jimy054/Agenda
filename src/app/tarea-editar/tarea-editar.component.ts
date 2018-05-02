import { Component, OnInit, Inject } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { TareaComponent } from "../tarea/tarea.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Http } from "@angular/http";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-tarea-editar",
  templateUrl: "./tarea-editar.component.html",
  styleUrls: ["./tarea-editar.component.css"]
})
export class TareaEditarComponent implements OnInit {
  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TareaComponent>,
    private userService: AuthService
  ) {
    this.identity_id = this.userService.getIdentity();
  }

  ngOnInit() {}
  descripcion = "";
  fechaInicio;
  fechaEntrega;
  identity_id;
  idUsuario;

  actualizarTarea(idTarea) {
    let headers1 = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
    );

    this.http
      .put(
        "http://localhost:4030/tareas/" + idTarea + "",
        {
          descripcion: this.data.descripcion,
          fechaInicio: this.data.fechaInicio,
          fechaEntrega: this.data.fechaEntrega,
          idUsuario: this.identity_id.idUsuario
        },
        { headers: headers1 }
      )
      .subscribe(response => {});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
