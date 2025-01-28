import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../Enviroment/enviroment';
import Book from '../Modules/Book';
import Error from '../Modules/Error';
import Language from '../Modules/Language';
import NewBook from '../Modules/NewBook';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private BASE_URL = `${environment.serverUrl}/user`;

  addNewBook(book: NewBook) {
    return this.http.post<{ message: string } & Error>(`${this.BASE_URL}/newBook`, book)
    .pipe(
          catchError(error => {
            console.error('Adding a book error: ', {
        status: error.status,
        message: error.message,
        details: error.error
      });
            return throwError(()=> new Error(error.message || 'Server error'));
          })
        );
  }

  searchBooks(keywords: string, language: string, type: number, operation: number) {
    //removing spaces from the beginning if exist
    let noWord = true;
    for (let letter of keywords) {
      if (letter != " ") {
        noWord = false;
        break;
      }
    }
    if (noWord)
      keywords = "-1";
    return this.http.get<{ bookList: Book[] } & Error>(`${this.BASE_URL}/searchBooks/${operation}/${language}/${type}/${keywords}`)
    .pipe(
      catchError(error => {
        console.error('Search books error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  borrowBook(book: any) {//add user details
    return this.http.patch<{ message: string } & Error>(`${this.BASE_URL}/borrowBook`, book)
    .pipe(
      catchError(error => {
        console.error('Borrowing book error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  returnBook(book: any) {//add user details
    return this.http.patch<{ message: string } & Error>(`${this.BASE_URL}/returnBook`, book)
    .pipe(
      catchError(error => {
        console.error('Returning a book error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  getLanguages() {
    return this.http.get<{ list: Language[] } & Error>(`${this.BASE_URL}/getLanguages`)
    .pipe(
      catchError(error => {
        console.error('Getting languages error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  addNewLanguage(newLanguage: string) {
    return this.http.post<{ message: string } & Error>(`${this.BASE_URL}/newLanguage`, { language: newLanguage })
    .pipe(
      catchError(error => {
        console.error('Adding a new language error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  deleteBook(bookId: number, userName: string) {
    return this.http.delete<{ message: string } & Error>(`${this.BASE_URL}/deleteBook/${bookId}/${userName}`)
    .pipe(
      catchError(error => {
        console.error('Deleting a book error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  deleteLanguage(languageId: number) {
    return this.http.delete<{ message: string } & Error>(`${this.BASE_URL}/deleteLanguage/${languageId}`)
    .pipe(
      catchError(error => {
        console.error('Deleting a language error: ', {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

  getBorrowerName(bookId: number) {
    return this.http.get<{ borrowerName: string } & Error>(`${this.BASE_URL}/getBorrowerName/${bookId}`)
    .pipe(
      catchError(error => {
        console.error(`Getting burrower's name error: `, {
    status: error.status,
    message: error.message,
    details: error.error
  });
        return throwError(()=> new Error(error.message || 'Server error'));
      })
    );
  }

}
