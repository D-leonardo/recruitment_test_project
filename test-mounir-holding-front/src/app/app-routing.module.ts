import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FileNotFoundComponent } from './pages/file-not-found/file-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent , canActivate:[AuthGuard] },
  { path: 'home', component: HomeComponent , canActivate:[AuthGuard]},
  { path: 'landing', component: LandingComponent   },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'not-found', component: FileNotFoundComponent },
  
  { path: '**', redirectTo: 'not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
