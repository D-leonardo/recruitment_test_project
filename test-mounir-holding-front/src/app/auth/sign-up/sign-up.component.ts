import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from 'src/app/services/app-toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpRequestPayload } from './sign-up-request.payload';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  
  signUpForm : FormGroup = new FormGroup({});
  signUpRequestPayload: SignUpRequestPayload;


  errors = {
    name:null,
    email:null,
    password:null,
  }


  constructor(private authService: AuthService, private toast : AppToastService, private router : Router,
    private activatedRoute : ActivatedRoute) { 

    // Initialising The SignUp Form
    this.signUpRequestPayload = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    };
  }

  ngOnInit(): void {

    // Validating SignUp Form
    this.signUpForm = new FormGroup({
      username: new FormControl('',Validators.required),
      phone: new FormControl(null),
      email : new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      password_confirmation: new FormControl('',[Validators.required])
    });
  }




  signup() {
    this.signUpRequestPayload.name = this.signUpForm?.get('username')?.value;
    this.signUpRequestPayload.email = this.signUpForm?.get('email')?.value;
    this.signUpRequestPayload.password = this.signUpForm?.get('password')?.value;
    this.signUpRequestPayload.password_confirmation = this.signUpForm?.get('password')?.value;
    console.log('Request Payload Data : ',this.signUpRequestPayload);

    // Calling AuthService SignUp Method
    this.authService.signup(this.signUpRequestPayload).subscribe((data) => {

      this.router.navigate(['/login']);
      this.toast.success(data.message);

    },(error_message) => {
      this.toast.error(error_message.error.message);

      this.errors = error_message.error.errors;
      // console.log(error_message);

    });


  }

}
