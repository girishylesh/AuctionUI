import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  public isUserLoggedIn: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
 
  constructor(private http: HttpClient) {

  }

  authenticateUser(data: any) {
    return this.http.post(`${environment.apiEndpoint}/auth/login`, data);
  }

  registerUser(data: any) {
    return this.http.post(`${environment.apiEndpoint}/auth/register`, data, {
      responseType: 'text'
    });
  }

  setBearerToken(token: string) {
    localStorage.setItem('bearerToken', token);   
  }

  setCurrentUser(user: any)
  {
    localStorage.setItem('currentUser', user);
  }

  setCurrentUserDetail(userId: string, userType: string)
  {
    localStorage.setItem('currentUserId', userId);
    localStorage.setItem('currentUserType', userType);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  getCurrentUser() {
    return localStorage.getItem('currentUser');
  }

  getCurrentUserId() {
    return localStorage.getItem('currentUserId');
  }

  getCurrentUserType() {
    return localStorage.getItem('currentUserType');
  }
  
  removeUserData() {
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserId');
  }

  isLoggedInUser() {
    const helper = new JwtHelperService();
    const token= this.getBearerToken();
    if(token && helper.isTokenExpired(token))
    {
      this.removeUserData();
      return false;
    }
    /*console.log(
      helper.decodeToken(token),
      helper.getTokenExpirationDate(token),
      helper.isTokenExpired(token)
    );*/
    return (this.getBearerToken())?true:false;
  }

  isUserAuthenticated(token: any): Promise<boolean> {

  //check if token available
   const flag=(token)?true:false;
   return new Promise(function(resolve,reject){resolve(flag)});

  }

  getHeaders() {
     return new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getBearerToken());
  }
}
