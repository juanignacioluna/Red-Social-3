import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { FondoComponent } from './components/fondo/fondo.component';
import { AscensorComponent } from './components/ascensor/ascensor.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TxtAreaTuitearComponent } from './components/txtAreaTuitear/txtAreaTuitear.component';
import { PosteoComponent } from './components/posteo/posteo.component';
import { NotisComponent } from './components/notis/notis.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { OtroPerfilComponent } from './components/otroPerfil/otroPerfil.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimelineComponent,
    FondoComponent,
    AscensorComponent,
    NavbarComponent,
    TxtAreaTuitearComponent,
    PosteoComponent,
    NotisComponent,
    PerfilComponent,
    BuscarComponent,
    OtroPerfilComponent,
    NotificacionComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
