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

  constructor(private authService: AuthService, private router : Router,private toast : AppToastService,
    private activatedRoute : ActivatedRoute) { 

    // Initialising The Login Form Payload
    this.loginRequestPayload = {
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {

    // Validating Login Form
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
    });

  }


  login() {
    this.loginRequestPayload.email = this.loginForm?.get('email')?.value;
    this.loginRequestPayload.password = this.loginForm?.get('password')?.value;

    console.log('Request Payload Data : ',this.loginRequestPayload);

    // Calling AuthService Login Method
    this.authService.login(this.loginRequestPayload).subscribe((data) => {

      this.router.navigate(['/']);

      this.toast.success("User Logged In Succesfully.");
      
      setTimeout(() => {
        window.location.href ='/'
      }, 2000);
      
    }, (error_message) => {

      this.toast.error(error_message.error.message);

      console.log(error_message);

    });


  }


}
