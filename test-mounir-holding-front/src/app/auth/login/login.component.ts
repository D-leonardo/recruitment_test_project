import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from 'src/app/services/app-toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup = new FormGroup({});
  loginRequestPayload: LoginRequestPayload;
  answer:any;

  constructor(private authService: AuthService, private router : Router,private toast : AppToastService,
    private activatedRoute : ActivatedRoute) { 
    this.loginRequestPayload = {
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {


    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
    });

  }


  login() {
    this.loginRequestPayload.email = this.loginForm?.get('email')?.value;
    this.loginRequestPayload.password = this.loginForm?.get('password')?.value;

    console.log('Request Payload Data : ',this.loginRequestPayload);

    this.authService.login(this.loginRequestPayload).subscribe((data) => {

      console.log("DATA LOGIN : ",data)
      this.answer=data
      this.router.navigate(['/']);


      this.toast.success("User Logged In Succesfully.");
      
      setTimeout(() => {
        window.location.href ='/'
      }, 3000);
      
    }, (error_message) => {

      this.toast.error(error_message.error.message);

      console.log(error_message);

    });


  }


}
