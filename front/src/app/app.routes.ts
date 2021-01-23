import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { HomeComponent } from './components/home/home.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { NotisComponent } from './components/notis/notis.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { OtroPerfilComponent } from './components/otroPerfil/otroPerfil.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'notis', component: NotisComponent },
  { path: 'buscar/:id', component: BuscarComponent },
  { path: 'otroPerfil/:id', component: OtroPerfilComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true } );
