import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Enviroment/enviroment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import AllHistory from '../Modules/AllHistory';
import Archive from '../Modules/Archive';
import Book from '../Modules/Book';
import Error from '../Modules/Error';
import History from '../Modules/History';
import Language from '../Modules/Language';
import NewBook from '../Modules/NewBook';
import User from '../Modules/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  private BASE_URL = `${environment.serverUrl}/admin`;

  getAllUsers() {
    return this.http.get<{ userList: User[] } & Error>(`${this.BASE_URL}/users`)
      .pipe(
        catchError(error => {
          console.error('User list error: ', {
            status: error.status,
            message: error.message,
            details: error.error
          });
          return throwError(() => new Error(error.message || 'Server error'));
        })
      );
  }

  blockUser(userId: number) {
    return this.http.patch<{ message: "string" } & Error>(`${this.BASE_URL}/block/`, { userId: userId })
      .pipe(
        catchError(error => {
          console.error('Block user error: ', {
            status: error.status,
            message: error.message,
            details: error.error
          });
          return throwError(() => new Error(error.message || 'Server error'));
        })
      );
  }

  unblockUser(userId: number) {
    return this.http.patch<{ message: "string" } & Error>(`${this.BASE_URL}/unblock/`, { userId: userId });
  }

  userHistory(userName: string) {
    return this.http.get<{ historyList: History[] } & Error>(`${this.BASE_URL}/history/${userName}`)
    .pipe(
      catchError(error => {
        console.error('User history error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  allHistory() {
    return this.http.get<{ historyList: AllHistory[] } & Error>(`${this.BASE_URL}/history`)
    .pipe(
      catchError(error => {
        console.error('Overall history error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  getLastChange(userId: number) {
    return this.http.get<{ time: string, date: string } & Error>(`${this.BASE_URL}/getLastChange/${userId}`)
    .pipe(
      catchError(error => {
        console.error('Getting last change error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  editBook(book: Book) {
    return this.http.patch<{ message: string } & Error>(`${this.BASE_URL}/editBook`, book)
    .pipe(
      catchError(error => {
        console.error('Edit book error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  getArchive() {
    return this.http.get<{ bookList: Archive[] } & Error>(`${this.BASE_URL}/archive`)
    .pipe(
      catchError(error => {
        console.error('Getting archive error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }
}
