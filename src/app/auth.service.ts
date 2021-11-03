import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://routeegypt.herokuapp.com/';

  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem("userToken")){
      this.saveUserDta()
    }
   };

  register(formData:object):Observable<any>  {
   return this._HttpClient.post(this.baseUrl+`signup`, formData)
  };
  login(formData:object):Observable<any>  {
    return this._HttpClient.post(this.baseUrl+`signin`, formData)
   };


  userDta= new BehaviorSubject(null);

  saveUserDta(){
    let encodedUserDta= JSON.stringify(localStorage.getItem("userToken"));
    this.userDta.next(jwtDecode(encodedUserDta));
   
  }

  logOut(){
    localStorage.removeItem("userToken");
    this.userDta.next(null);
    this._Router.navigate(["signin"]);

  }


};

