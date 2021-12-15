import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MiniMapaComponent } from './components/mini-mapa/mini-mapa.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { ZoonRangeComponent } from './pages/zoon-range/zoon-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { MarcardoresComponent } from './pages/marcardores/marcardores.component';


@NgModule({
  declarations: [
    MiniMapaComponent,
    FullScreenComponent,
    ZoonRangeComponent,
    PropiedadesComponent,
    MarcardoresComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
