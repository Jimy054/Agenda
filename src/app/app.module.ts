import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { CategoryComponent } from "./category/category.component";
import { RouterModule, Routes } from "@angular/router";
import { RegistroComponent } from "./registro/registro.component";
import { ContactComponent } from "./contact/contact.component";
import { PrincipalComponent } from "./principal/principal.component";
import { LoginComponent } from "./login/login.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CategoriaserviceService } from "./service/categoriaservice.service";
import { ContacteditComponent } from "./contactedit/contactedit.component";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContactDeleteComponent } from "./contact-delete/contact-delete.component";
import { MenuComponent } from "./menu/menu.component";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Headers, Http } from "@angular/http";
import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "./service/auth.service";
import { ContactoService } from "./service/contactos.service";
import { TareaService } from "./service/tarea.service";
import { TareaComponent } from "./tarea/tarea.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MatNativeDateModule } from "@angular/material";
import { TareaEditarComponent } from "./tarea-editar/tarea-editar.component";
import { TareaEliminarComponent } from "./tarea-eliminar/tarea-eliminar.component";
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    RegistroComponent,
    ContactComponent,
    PrincipalComponent,
    LoginComponent,
    NavbarComponent,
    ContacteditComponent,
    ContactDeleteComponent,
    MenuComponent,
    TareaComponent,
    TareaEditarComponent,
    TareaEliminarComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    MatDatepickerModule,
    NgbModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: "category",
        component: CategoryComponent
      },
      {
        path: "registrer",
        component: RegistroComponent
      },
      {
        path: "",
        component: PrincipalComponent
      },
      {
        path: "contacts",
        component: ContactComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "menu",
        component: MenuComponent
      },
      {
        path: "tarea",
        component: TareaComponent
      }
    ])
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "eu-EU" },
    CategoriaserviceService,
    AuthService,
    ContactoService,
    TareaService
  ],

  bootstrap: [AppComponent],
  entryComponents: [
    ContacteditComponent,
    ContactDeleteComponent,
    TareaEditarComponent,
    TareaEliminarComponent
  ]
})
export class AppModule {}
