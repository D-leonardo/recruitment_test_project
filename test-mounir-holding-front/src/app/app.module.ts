import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { CommonComponentModule } from './common-component/common-component.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   
    AppRoutingModule,
    AuthModule,
    PagesModule,
    CommonComponentModule,
    HttpClientModule,

    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
