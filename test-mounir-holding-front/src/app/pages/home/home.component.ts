import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { map, throwError } from 'rxjs';
import { PositionRequest } from 'src/app/interfaces/position/position-request-payload';
import { PositionResponse } from 'src/app/interfaces/position/position-response-payload';
import { UserResponse } from 'src/app/interfaces/users/user-response-payload';
import { AppToastService } from 'src/app/services/app-toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  positions =[];

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  submitForm : FormGroup = new FormGroup({});
  positionRequestPayload: PositionRequest;

  markerPositions: any[] = [
    // {
    //   lat: 4.43,
    //   lng: 10.01,
    //   username: 'Alan'
    // }, 
    // {
    //   lat: 4.67,
    //   lng: 10.94,
    //   username: 'Mario'
    // }, 
    // {
    //   lat: 4.57,
    //   lng: 10.42,
    //   username: 'Elise'
    // }, 
    // {
    //   lat: 4.70,
    //   lng: 10.14,
    //   username: 'Audrey'
    // }, 
    // {
    //   lat: 4.47,
    //   lng: 10.44,
    //   username: 'Irene'
    // }, 
    // {
    //   lat: 7.70,
    //   lng: 14.01,
    //   username: 'Youssouf'
    // }, 
    // {
    //   lat: 3.41,
    //   lng: 11.34,
    //   username: 'Thierno'
    // }, 
    // {
    //   lat: 5.08,
    //   lng: 13.40,
    //   username: 'Steves'
    // }, 
    // this.positions
  ];
  user:UserResponse;
  // Goe Map Postion ID variable from backed server
  position_number:any;
  // displaying mouse hover latitude and longitude
  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 24,
      lng: 12
  };
  // Google Map Zoom Option
  zoom = 3;

  constructor(
    private position : PositionService,
    private router : Router,
    private toast : AppToastService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private localStorage: LocalStorageService ) {
    
    // Initiating Form Data
    this.positionRequestPayload = {
      longitude: '',
      latitude: '',
      available: false,
      user_id: null
    };

  }

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



  getUsersPosition(): void {

    this.position.index().subscribe(res => {
      this.positions = res.data.positions.map( obj =>{
          return {
            lat: Number(obj.latitude) ,
            lng: Number(obj.longitude),
            username : obj.user_name
          }
      })

      this.markerPositions=this.positions;

    }, error => {
      this.toast.error(''+error);
      throwError(error);
    })
  }


  ngOnInit(): void {


    this.submitForm = new FormGroup({
      longitude: new FormControl('',[Validators.required]),
      latitude: new FormControl('',[Validators.required]),
    });

    this.getUsersPosition();

    console.log("GMAP MARKER POSITIONS ARE ",this.markerPositions)


  }

  manualSubmit(){

    // Inserting data From Form into Payload
      this.positionRequestPayload.latitude = this.submitForm?.get('latitude')?.value;
      this.positionRequestPayload.longitude = this.submitForm?.get('longitude')?.value;
      this.positionRequestPayload.available = true;

      // Retrieve User From Localstorage
      const app_user=this.localStorage.retrieve('user')

      this.positionRequestPayload.user_id = app_user.id;

      this.position_number = app_user.position.id;

      // Update Map Position 
      this.position.update(this.positionRequestPayload, this.position_number).subscribe((data) => {

        console.log("ResPonse Lat Long Submit : ",data)
        // navigate to home Page
        this.router.navigate(['/']);



          // Toast Notification
          this.toast.success("Data Posted SuccesFully");

          // navigate to home Page
          setTimeout(() => {
            window.location.href ='/'
          }, 3000);

        
      }, (error_message) => {
        // Toast Error Message
        this.toast.error(error_message.error.message);

        console.log(error_message);

      });
  }

  authomaticSubmit(){

    // Calling the ipapi method from position Service
    this.position.ipapi().subscribe(data=>{

        // Retrieve Data From Api Response into
        this.positionRequestPayload.latitude = data.latitude;
        this.positionRequestPayload.longitude = data.longitude;
        this.positionRequestPayload.city = data.city;
        this.positionRequestPayload.region = data.region;
        this.positionRequestPayload.country = data.country_name;
        this.positionRequestPayload.available = true;
        
        const app_user=this.localStorage.retrieve('user')

        this.positionRequestPayload.user_id = app_user.id;

        this.position_number = app_user.position.id;

      // Update Map Position 
        // console.log("IPIA : ",data)
        // console.log("Position Number : ",this.position_number)
        // console.log("Payload Reuqest : ",this.positionRequestPayload)
      
        this.position.update(this.positionRequestPayload, this.position_number).subscribe((data) => {

          console.log("ResPonse Lat Long Submit : ",data)

          // Toast Notification
          this.toast.success("Data Posted SuccesFully");

          // navigate to home Page
          setTimeout(() => {
            window.location.href ='/'
          }, 3000);

          
        }, (error_message) => {

          this.toast.error(error_message.error.text);

          console.log(error_message);

        });
       
    }, (error_message) => {

      this.toast.error(error_message.error.text);

      console.log(error_message);

    });
              
        


  }


}
