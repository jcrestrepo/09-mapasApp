import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { ZoonRangeComponent } from './pages/zoon-range/zoon-range.component';
import { MarcardoresComponent } from './pages/marcardores/marcardores.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';

const routes: Routes = [
  {
    path:'',
    children:[
      { path: 'fullscreen', component: FullScreenComponent},
      { path: 'zoom-range', component: ZoonRangeComponent},
      { path: 'marcadores', component: MarcardoresComponent},
      { path: 'propiedades', component: PropiedadesComponent},
      { path: '**', redirectTo: 'fullscreen'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
