import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private localStorage: LocalStorageService) { }

  username ?: String;

  isLoggedIn ?: boolean;
  // User Variable
  user:any;

  // Log in Status Variable
  loggedIn:boolean = false;

  ngOnInit(): void {

    // Initialisint the ogin Status(Returns True or False)
    this.authService.status().subscribe((res)=>{
      console.log("User Logged In State is : ",res);
      this.loggedIn = res;
    })

    this.authService.user().subscribe((res)=>{
      this.user = res;
      // console.log("User  is : ",res);

      this.username=this.user.name;
    }, (err) =>{
      console.log(err);
    })

  }


// VErify the current Route
  isActive(instruction: string): boolean {
    return this.router.isActive(instruction,true);
  }


  logout(){
    // Calling og Out Services
    this.authService.logout().subscribe((res)=>{

      console.log(res);
      // Clearing Local Storage Token and User Data
      this.localStorage.clear('access_token');
      this.localStorage.clear('user');
      this.localStorage.clear('email');
      this.localStorage.clear('expiresAt');

      // Naviget To Login Form
      this.router.navigate(['login'])
      .then(() => {
        window.location.reload();
      });

    }, (err) =>{
      console.log(err)
    })
  }

}
