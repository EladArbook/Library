import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.post<{ message: string } & Error>(`${this.BASE_URL}/newBook`, book);
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
    return this.http.get<{ bookList: Book[] } & Error>(`${this.BASE_URL}/searchBooks/${operation}/${language}/${type}/${keywords}`);
  }

  borrowBook(book: any) {//add user details
    return this.http.patch<{ message: string } & Error>(`${this.BASE_URL}/borrowBook`, book);
  }

  returnBook(book: any) {//add user details
    return this.http.patch<{ message: string } & Error>(`${this.BASE_URL}/returnBook`, book);
  }

  getLanguages() {
    return this.http.get<{ list: Language[] } & Error>(`${this.BASE_URL}/getLanguages`);
  }

  addNewLanguage(newLanguage: string) {
    return this.http.post<{ message: string } & Error>(`${this.BASE_URL}/newLanguage`, { language: newLanguage })
  }

  deleteBook(bookId: number, userName: string) {
    return this.http.delete<{ message: string } & Error>(`${this.BASE_URL}/deleteBook/${bookId}/${userName}`);
  }

  deleteLanguage(languageId: number) {
    return this.http.delete<{ message: string } & Error>(`${this.BASE_URL}/deleteLanguage/${languageId}`);
  }

  getBorrowerName(bookId: number) {
    return this.http.get<{ borrowerName: string } & Error>(`${this.BASE_URL}/getBorrowerName/${bookId}`).toPromise();
  }

}
