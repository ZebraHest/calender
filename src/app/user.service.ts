import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserDto } from './data/userDto';


import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  eventsUrl = 'http://localhost:8080/event'; // URL to web api

  constructor(private http: HttpClient) {
    axios.defaults.baseURL = 'http://localhost:8080/user';
    axios.defaults.headers.post["Content-Type"] = "application/json"
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("authToken");
  }

  setAuthToken(token: string | null): void{
    if(token !== null) {
      window.localStorage.setItem('authToken', token);
    } else {
      window.localStorage.removeItem('authToken');
    }
   
  }

  request(method: string, url: string, data: any): Promise<any> {

    let headers = {};

    if (this.getAuthToken() !== null){
      headers = {"Authorization": "Bearer "+this.getAuthToken()};
    }

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    })
  }

  // getAllUsers(): Observable<UserDto[]> {
  //   return this.http.get<UserDto[]>(this.eventsUrl + '/login');
  //   // return this.http.get<EventData[]>(this.eventsUrl);
  // }

  // addEvent(event: EventData) {
    

  //   const data = this.http.post(this.eventsUrl + '/add', body, httpOptions);
  //   console.log(data);
  //   return data;
  // }
}
