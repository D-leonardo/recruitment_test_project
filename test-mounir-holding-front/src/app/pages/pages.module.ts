import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { CommonComponentModule } from '../common-component/common-component.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';



@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    FileNotFoundComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    CommonComponentModule
  ]
})
export class PagesModule { }
