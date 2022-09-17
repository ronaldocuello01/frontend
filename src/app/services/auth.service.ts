import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URI = 'http://localhost:4000/api/auth';

  constructor(public http: HttpClient, private router: Router) { }

  login (user: any){
    return this.http.post<any>(`${this.URI}/login`, user);
  }

  logged (){
    return !!localStorage.getItem('token');
  }

  getToken (){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

}
