import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { map, throwError } from 'rxjs';
import { PositionRequest } from 'src/app/interfaces/position/position-request-payload';
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

  @ViewChildren(MapInfoWindow) infoWindowsView: QueryList<MapInfoWindow>;

  submitForm : FormGroup = new FormGroup({});

  positionRequestPayload: PositionRequest;

  markerPositions: any[] = [];
  // User Response varable
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


// Info Window Displaying Current User Position On The Map
  openInfoWindow(marker: MapMarker, windowIndex: number) {
    /// stores the current index in forEach
    let curIdx = 0;
    this.infoWindowsView.forEach((window: MapInfoWindow) => {
      if (windowIndex === curIdx) {
        window.open(marker);
        curIdx++;
      } else {
        curIdx++;
      }
    });
  }

  setMarkers(): void {

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

    this.setMarkers();

    // Reload Markers Every 3 Seconds ( Gives Real Time Position Effect )
    setInterval(()=>this.setMarkers(), 3000);

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

    // Calling PositionService Update Method
      this.position.update(this.positionRequestPayload, this.position_number).subscribe((data) => {

        console.log("ResPonse Lat Long Submit : ",data)
        // navigate to home Page
        this.router.navigate(['/']);

          // Toast Notification
          this.toast.success("Data Posted SuccesFully");
        
      }, (error_message) => {
        // Toast Error Message
        this.toast.error(error_message.error.message);

      });
  }

  automaticSubmit(){

    // Calling PositionService ipapi method
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

        
      
        // Calling PositionService Update Method
        this.position.update(this.positionRequestPayload, this.position_number).subscribe((data) => {

          console.log("ResPonse Lat Long Submit : ",data)

          // navigate to home Page
          this.router.navigate(['/']);
          
          // Toast Notification
          this.toast.success("Data Posted SuccesFully");
          
        }, (error_message) => {

          this.toast.error(error_message.error.text);

        });
       
    }, (error_message) => {

      this.toast.error(error_message.error.text);

    });
              
        


  }


}
