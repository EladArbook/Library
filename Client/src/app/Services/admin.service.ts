import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Enviroment/enviroment';
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
    return this.http.get<{ userList: User[] } & Error>(`${this.BASE_URL}/users`);
  }

  blockUser(userId: number) {
    return this.http.patch<{ message: "string" } & Error>(`${this.BASE_URL}/block/`, { userId: userId });
  }

  unblockUser(userId: number) {
    return this.http.patch<{ message: "string" } & Error>(`${this.BASE_URL}/unblock/`, { userId: userId });
  }

  userHistory(userName: string) {
    return this.http.get<{ historyList: History[] } & Error>(`${this.BASE_URL}/history/${userName}`)
  }

  allHistory() {
    return this.http.get<{ historyList: AllHistory[] } & Error>(`${this.BASE_URL}/history`)
  }

  getLastChange(userId: number) {
    return this.http.get<{ time: string, date: string } & Error>(`${this.BASE_URL}/getLastChange/${userId}`);
  }

  editBook(book: Book) {
    return this.http.patch<{ message: string } & Error>(`${this.BASE_URL}/editBook`, book);
  }

  getArchive() {
    return this.http.get<{ bookList: Archive[] } & Error>(`${this.BASE_URL}/archive`);
  }

  /*  addNewBook(book: NewBook) {
     return this.http.post<{ message: string } & Error>(`${this.BASE_URL}/newBook`, book);
   } */

  /* searchBooks(keywords: string, language: string, type: number, operation: number) {
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
  } */

  /* borrowBook(book: any) {//add user details
    return this.http.patch<{ message: string } & Error>(`${this.BASE_URL}/borrowBook`, book);
  } */

  /* returnBook(book: any) {//add user details
    return this.http.patch<{ message: string } & Error>(`${this.BASE_URL}/returnBook`, book);
  } */

  /* getLanguages() {
    return this.http.get<{ list: Language[] } & Error>(`${this.BASE_URL}/getLanguages`);
  } */

  /*  addNewLanguage(newLanguage: string) {
     return this.http.post<{ message: string } & Error>(`${this.BASE_URL}/newLanguage`, { language: newLanguage })
   } */

  /* deleteLanguage(languageId: number) {
    return this.http.delete<{ message: string } & Error>(`${this.BASE_URL}/deleteLanguage/${languageId}`);
  } */

  /* deleteBook(bookId: number) {
    return this.http.delete<{ message: string } & Error>(`${this.BASE_URL}/deleteBook/${bookId}`);
  } */

  /* getBorrowerName(bookId: number) {
    return this.http.get<{ borrowerName: string } & Error>(`${this.BASE_URL}/getBorrowerName/${bookId}`).toPromise();
  } */

}
