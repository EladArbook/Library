import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
    return this.http.post<{ message: string, details: any }>(`${this.BASE_URL}/login`, credentials)
    .pipe(
      catchError(error => {
        console.error('Login error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  register(newUser: User) {
    return this.http.post<{ message: string } & UserData>(`${this.BASE_URL}/register`, newUser)
    .pipe(
      catchError(error => {
        console.error('Registration error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }

  validToken() {
    return this.http.get<{ valid: boolean }>(`${this.BASE_URL}/valid`)
    .pipe(
      catchError(error => {
        console.error('Token validation error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }

}
