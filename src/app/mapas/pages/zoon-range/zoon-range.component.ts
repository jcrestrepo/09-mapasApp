import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


@Component({
  selector: 'app-zoon-range',
  templateUrl: './zoon-range.component.html',
  styles: [
    `
    .mapa-container{
        width:100%;
        height:100%;
    }
    .row {
      background-color:white;
      position:fixed;
      bottom:50px;
      left:50px;
      padding:10px;
      border-radius:5px;
      z-index: 999;
    }
  `
  ]
})
export class ZoonRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef
  mapa!:mapboxgl.Map;
  zoomLevel:number=11;
  center:[number, number]= [-75.567, 6.160975 ]
  constructor() { }


  ngOnDestroy(): void {
    this.mapa.off('zoom', () =>{});
    this.mapa.off('zoomend', () =>{})
    this.mapa.off('move', () =>{})
  }

  ngAfterViewInit(): void {


    this.mapa= new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center:this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });
    this.mapa.on('zoom',() => {
      this.zoomLevel=this.mapa.getZoom();

    });

    this.mapa.on('zoomend', (en) => {
      if(this.mapa.getZoom()>18){
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (event) => {
      const target= event.target;
      this.center[0]=target.getCenter().lat;
      this.center[1]=target.getCenter().lng;

    });

  }
  zoomIn(){
    this.mapa.zoomIn();

  }
  zoomOut(){
    this.mapa.zoomOut();
  }
  zoomCambio(valor:string){
    this.mapa.zoomTo(Number( valor));
  }
}
