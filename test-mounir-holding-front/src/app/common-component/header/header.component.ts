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
  checkbox:boolean = false;
  user:any;
  loggedIn:boolean = false;

  ngOnInit(): void {

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

  logout(){
    this.authService.logout().subscribe((res)=>{

      console.log(res);
      // this.localStorage.clear('access_token');
      // this.localStorage.clear('user');
      // this.localStorage.clear('email');
      // this.localStorage.clear('expiresAt');

      // this.router.navigate(['login'])
      // .then(() => {
      //   window.location.reload();
      // });

    }, (err) =>{
      console.log(err)
    })
  }

}
