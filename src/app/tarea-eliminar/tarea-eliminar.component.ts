import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Http, Response } from "@angular/http";
import { Component, OnInit, Inject } from "@angular/core";
import { TareaComponent } from "../tarea/tarea.component";
import { Tarea } from "../models/tarea.model";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-tarea-eliminar",
  templateUrl: "./tarea-eliminar.component.html",
  styleUrls: ["./tarea-eliminar.component.css"]
})
export class TareaEliminarComponent implements OnInit {
  constructor(
    private http: Http,
    private dialogRef: MatDialogRef<TareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpCliente: HttpClient
  ) {}

  ngOnInit() {}

  eliminarTarea(idTarea) {
    let headers1 = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
    );

    this.httpCliente
      .delete("http://localhost:4030/tareas/" + idTarea + "", {
        headers: headers1
      })

      .subscribe(response => {});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
