import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  markerPositions: any[] = [
    {
      lat: 4.43,
      lng: 10.01,
      username: 'Alan'
    }, 
    {
      lat: 4.67,
      lng: 10.94,
      username: 'Mario'
    }, 
    {
      lat: 4.57,
      lng: 10.42,
      username: 'Elise'
    }, 
    {
      lat: 4.70,
      lng: 10.14,
      username: 'Audrey'
    }, 
    {
      lat: 4.47,
      lng: 10.44,
      username: 'Irene'
    }, 
    {
      lat: 7.70,
      lng: 14.01,
      username: 'Youssouf'
    }, 
    {
      lat: 3.41,
      lng: 11.34,
      username: 'Thierno'
    }, 
    {
      lat: 5.08,
      lng: 13.40,
      username: 'Steves'
    }, 
    
  ];

  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 24,
      lng: 12
  };
  zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  markerOptions: google.maps.MarkerOptions = {
      draggable: false
  };

  addMarker(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }

  openInfoWindow(marker: MapMarker) {
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }


}
