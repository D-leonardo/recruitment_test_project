import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CustomResponse } from '../interfaces/custom-response';
import { PositionRequest } from '../interfaces/position/position-request-payload';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private httpClient: HttpClient, private authService : AuthService) {}

  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getAccessToken()}`
  })

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An Error Occured -  Error Code : ${error.status}`);
  }

  private readonly apiUrl =  "http://find_our_location.test";

  index():Observable<CustomResponse>{
    return this.httpClient
    .get<CustomResponse>(`${this.apiUrl}/api/positions`,{
      headers: this.headers,
    }).pipe(tap(console.log), catchError(this.handleError))
  }
  
  
  create( createUserPayload : PositionRequest ):Observable<boolean> {
    return this.httpClient.post<CustomResponse>(`${this.apiUrl}/api/positions`,
    createUserPayload,{
      headers: this.headers,
    }).pipe(tap(console.log), catchError(this.handleError));
  }

     
  show(id:number):Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(`${this.apiUrl}/api/positions/${id}`,
   {
      headers: this.headers,
    }).pipe(tap(console.log), catchError(this.handleError));
  }

    
  update( createUserPayload : PositionRequest , position_number:any):Observable<boolean> {
    return this.httpClient.patch<CustomResponse>(`${this.apiUrl}/api/positions/${position_number}`,
    createUserPayload,{
      headers: this.headers,
    }).pipe(tap(console.log), catchError(this.handleError));
  }

  delete(id:number):Observable<CustomResponse>{
    return this.httpClient
    .delete<CustomResponse>(
      `${this.apiUrl}/api/positions/${id}`,{
        headers: this.headers,
      }
    )
    .pipe(tap(console.log), catchError(this.handleError))
  }
}
