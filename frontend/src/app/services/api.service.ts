import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  register(input:any){
    return this.http.post('http://localhost:5000/api/user/register', input);
  }

  login(input:any){
    return this.http.post('http://localhost:5000/api/user/login', input);
  }

  findOne(userId:any){
    return this.http.get('http://localhost:5000/api/user/getOne?userId='+userId);
  }

  loggedIn(){
    return localStorage.getItem('token');
  }

  logout(){
    return localStorage.removeItem('token');
  }

  getItem(){
    return localStorage.getItem('token');
  }

  getUserId(){
    return localStorage.getItem('userId')
  }
}
