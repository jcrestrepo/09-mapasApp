import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef,  ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color:string;
  marker?:mapboxgl.Marker;
  centro?:[number, number]
}
@Component({
  selector: 'app-marcardores',
  templateUrl: './marcardores.component.html',
  styles: [
    `
    .mapa-container{
        width:100%;
        height:100%;
    }
    .list-group{
      position:fixed;
      top:20px;
      right:20px;
      z-index:999;
    }
    li{
      cursor: pointer;
    }
    `
  ]
})
export class MarcardoresComponent implements  AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef
  mapa!:mapboxgl.Map;
  zoomLevel:number=15;
  center:[number, number]= [-75.567, 6.160975 ]
  constructor() { }
  marcadores:MarcadorColor[]=[];


  ngAfterViewInit(): void {

    this.mapa= new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center:this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    this.leerMarcador();
    const marker = new mapboxgl.Marker({draggable:true})


    this.mapa.on('move', (event) => {
      const target= event.target;
      this.center[1]=target.getCenter().lat;
      this.center[0]=target.getCenter().lng;
      this.guardarMarcadoresLocalStorage();
    });


  }
  irMarcador( i:number){
    //this.mapa.zoomTo()
    console.log(i);
    this.mapa.flyTo({
      center: this.marcadores[i].marker?.getLngLat(),
      zoom: 16
    })

  }
  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({draggable:true, color:color})
    .setLngLat(this.center)
    .addTo(this.mapa);
    this.marcadores.push({color:color, marker:nuevoMarcador});

    this.guardarMarcadoresLocalStorage();
    nuevoMarcador.on('dragend', (event) => {
      this.guardarMarcadoresLocalStorage();
    })

  }
  guardarMarcadoresLocalStorage(){
    const lnglatArr: MarcadorColor[]=[]
    console.log(this.marcadores);
    this.marcadores.forEach( m => {
      const color=m.color;
      const {lng ,lat} =m.marker!.getLngLat()
      lnglatArr.push({
        color:color,
        centro:[lng, lat]
      })
    });
    localStorage.setItem("marcadores", JSON.stringify(  lnglatArr));

  }
  leerMarcador(){;

    if(!localStorage.getItem('marcadores')){
      console.log("Entre111")
      return;
    }


    console.log("Entre")
      const lnglatArr: MarcadorColor[]=JSON.parse( localStorage.getItem('marcadores')!);
    lnglatArr.forEach(m =>{
      const newMarker= new mapboxgl.Marker({
        color:m.color,
        draggable:true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);
      this.marcadores.push({
        color:m.color,
        marker: newMarker,
        centro: m.centro
      })
      newMarker.on('move', (event) => {
        this.guardarMarcadoresLocalStorage();
      });

      });

  }
  borrarMarcador(i:number){
    this.marcadores.splice(i,1);
    this.marcadores[i].marker?.remove();
    this.guardarMarcadoresLocalStorage();
  }
}
  