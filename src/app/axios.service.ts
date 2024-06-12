import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  constructor(private http: HttpClient) {
    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    if (window == null) {
      return null;
    }

    return window.localStorage.getItem('authToken');
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem('authToken', token);
    } else {
      window.localStorage.removeItem('authToken');
    }
  }

  request(method: string, url: string, data: any): Promise<any> {
    let headers = {};

    if (this.getAuthToken() !== null) {
      headers = { Authorization: 'Bearer ' + this.getAuthToken() };
    }

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });
  }
}
