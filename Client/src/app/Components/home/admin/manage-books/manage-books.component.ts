import { Component } from '@angular/core';
import { Router } from '@angular/router';
import AllHistory from 'src/app/Modules/AllHistory';
import Archive from 'src/app/Modules/Archive';
import Book from 'src/app/Modules/Book';
import Language from 'src/app/Modules/Language';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent {

  constructor(private http: AdminService, private userHttp: UserService, private router: Router) { }
  view: number = 0;
  historyList: AllHistory[] = [];
  selectedBook: number = 0;
  bookList: Book[] = [];
  archiveList: Archive[] = [];
  editedBook: Book = { book_id: 0, category: 0, language: "", name: "", pages: 0, status: 0 };
  error: string = "";
  languageList: Language[] = [];
  languageId: number = 0;
  keyWords: string = "";

  resetSearch() {
    this.keyWords = "";
    this.getBookList();
  }

  resetEditedBook() {
    this.editedBook = {
      book_id: 0,
      category: 0,
      language: "",
      name: "",
      pages: 0,
      status: 0
    };
    this.languageId = 0;
  }

  ngOnInit() {
    if (!localStorage['userData'] || !JSON.parse(localStorage['userData']).token ||
      JSON.parse(localStorage['userData']).role != "Admin") {
      if (localStorage['userData'])
        localStorage.removeItem('userData');
      this.router.navigate(['login']);
    }
    else {

    }
  }

  changeView(viewId: number) {
    if (this.archiveList.length > 0)
      this.archiveList = [];
    if (this.historyList.length > 0)
      this.historyList = [];
    if (this.error)
      this.resetError();
    if (this.languageList.length > 0)
      this.languageList = [];
    this.selectedBook = 0;
    switch (viewId) {
      case 1: //History
        this.searchHistory();
        this.bookList = [];
        this.resetEditedBook();
        this.keyWords = "";
        break;
      case 2: //Edit List
        this.getBookList();
        this.resetEditedBook();
        break;
      case 3: //Archive
        this.keyWords = "";
        this.bookList = [];
        this.resetEditedBook();
        this.http.getArchive().subscribe(val => {
          if (val && val.error) {
            console.log(val.error);
            this.router.navigate(['login']);
            if (localStorage.getItem('loginData'))
              localStorage.removeItem('loginData');
          }
          else {
            this.archiveList = val.bookList;
          }
        });
        break;
      case 4: //Edit Book (forward from case: 2)
        this.userHttp.getLanguages().subscribe(val => {
          if (val && val.error) {
            console.log(val.error);
            if (localStorage.getItem('loginData'))
              localStorage.removeItem('loginData');
            this.router.navigate(['login']);
          }
          else {
            this.languageList = val.list;
            this.manageLanguage();
          }
        });
        break;
      default:
        this.keyWords = "";
        this.view = 0;
        this.historyList = [];
        this.bookList = [];
        this.archiveList = [];
        this.resetEditedBook();
        break;
    }
    this.view = viewId;
  }

  getBookList() {
    //keyWords, lang, type
    this.userHttp.searchBooks(
      this.keyWords ? this.keyWords : "", "0", 0, 0).subscribe(val => {
        if (val && val.error) {
          console.log(val.error);
          this.router.navigate(['login']);
          if (localStorage.getItem('loginData'))
            localStorage.removeItem('loginData');
        }
        else {
          this.bookList = val.bookList;
        }
      });
  }

  searchHistory() {
    this.http.allHistory().subscribe(val => {

      if (val && val.error) {
        console.log(val.error);
        if (localStorage.getItem('loginData'))
          localStorage.removeItem('loginData');
        this.router.navigate(['login']);
      }
      else {
        this.historyList = val.historyList;
      }
    });
  }

  selectBook(bookId: number) {
    this.selectedBook = bookId;
  }

  editBook(book: Book) {
    this.changeView(4);
    this.editedBook = book;
  }

  saveEditBook() {
    let editBook = this.editedBook;

    const error = this.checkInfoLegality();
    if (error) {
      this.error = error;
    }
    else {
      const language = this.languageList.find(lang => String(lang.language_id) == this.editedBook.language);
      if (language && language.name)
        editBook.language = language.name;
      this.http.editBook(editBook).subscribe(val => {
        if (val && val.error) {
          console.log(val.error);
          if (localStorage.getItem('loginData'))
            localStorage.removeItem('loginData');
          this.router.navigate(['login']);
        }
        else {
          this.changeView(2);
        }
      });
    }
  }

  checkInfoLegality() {
    let error = "";
    //const pagesReGex = /^[A-Za-z0-9` ,-]*$/;
    const bookNameReGex = /^[A-Za-z0-9` ,-]*$/;
    if (!this.editedBook.name)
      error = "*Material name is missing.";
    else if (this.editedBook.name.length > 30)
      error = "*Material name is too long.";
    else if (!this.editedBook.name.match(bookNameReGex))
      error = "*Material name cannot contains speacial characters";
    else if (!this.editedBook.category || this.editedBook.category == 0)
      error = "*Material's type is missing.";
    else if (!this.editedBook.language || this.editedBook.language == "0")
      error = "*Language is missing."
    else if (!this.editedBook.pages)
      error = "*Pages are missing.";
    else if (this.editedBook.pages < 0)
      error = "Pages can't be lower than zero.";
    return error;
  }

  manageLanguage() {
    const i = this.languageList.findIndex(lang => lang.name == this.editedBook.language);
    this.editedBook.language = String(this.languageList[i].language_id);
  }

  resetError() {
    this.error = "";
  }

  cancelEdit() {
    this.changeView(2);
  }

  manageType(typeId: number): string {
    if (typeId == 1)
      return "Book";
    else if (typeId == 2)
      return "Magazine";
    else if (typeId == 3)
      return "Newspaper";
    return "";
  }

  manageOperation(operationId: number) {
    switch (operationId) {
      case 1:
        return "New";
      case 2:
        return "Borrow";
      case 3:
        return "Return";
      case 4:
        return "Delete";
      default:
        return "";
    }
  }

  manageDate(date: Date) {
    const myDate = new Date(date);
    let dateString = "";
    if (myDate.getDate() < 10)
      dateString += "0";
    dateString += `${myDate.getDate()} - `;
    if (myDate.getMonth() + 1 < 10)
      dateString += "0";
    dateString += `${myDate.getMonth() + 1} - ${myDate.getFullYear()}`;
    return dateString;
  }

}