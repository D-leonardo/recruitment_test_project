import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginRequestPayload } from '../auth/login/login-request.payload';
import { LoginResponse } from '../auth/login/login-response.payload';
import { SignUpRequestPayload } from '../auth/sign-up/sign-up-request.payload';
import { CustomResponse } from '../interfaces/custom-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =  "http://find_our_location.test";

  private isLoggedIn  = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }


  getAccessToken() {
    return this.localStorage.retrieve('access_token');
  }

  signup(signUpRequestPayload: SignUpRequestPayload): Observable<any> {
    return this.httpClient.post<CustomResponse>(`${this.apiUrl}/api/register`, signUpRequestPayload);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/api/login`, loginRequestPayload)
      .pipe(map(data => {
        console.log("DATA AUTH : ",data)

        // this.toast.success(""+data.message);
        this.localStorage.store('access_token', data.access_token);
        this.localStorage.store('user', data.user);
        this.localStorage.store('email', JSON.stringify(data.user.email));
        this.localStorage.store('expiresAt', data.token_expires_at);

        return true;
      }));
  }

  // Toogle Loggedin
  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  // Status
  status() {
    const localData: any = this.localStorage.retrieve('user');
    const toke_exp: any = this.localStorage.retrieve('expiresAt');
    if (!localData) {
      this.isLoggedIn.next(false);
       console.log('User not lgged in !!');
    } else {
      const token_expires_at = new Date(toke_exp);
      const current_date = new Date();
      if (token_expires_at > current_date) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
        console.log('Token Expires!!');
      }
    }
    return this.isLoggedIn.asObservable();
  }

  // User Info
  user() {
    const token: any = this.localStorage.retrieve('access_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(`${this.apiUrl}/api/user`, {
      headers: headers,
    });

  }


  logout(allDevice: boolean) {
    const userToken: any = this.localStorage.retrieve('access_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${userToken}`,
    });

    return this.httpClient.post(`${this.apiUrl}/api/logout`, {headers:headers})
  }



}
