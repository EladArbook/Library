import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Enviroment/enviroment';
import Credentials from '../Modules/Credentials';
import User from '../Modules/User';
import UserData from '../Modules/UserData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private BASE_URL = `${environment.serverUrl}/auth`;

  login(credentials: Credentials) {
    return this.http.post<{ message: string, details: any }>(`${this.BASE_URL}/login`, credentials);
  }

  register(newUser: User) {
    return this.http.post<{ message: string } & UserData>(`${this.BASE_URL}/register`, newUser);
  }

  validToken() {
    return this.http.get<{ valid: boolean }>(`${this.BASE_URL}/valid`);
  }


}
