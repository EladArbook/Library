import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/Enviroment/enviroment';
import Book from 'src/app/Modules/Book';
import Language from 'src/app/Modules/Language';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
  styleUrls: ['./book-return.component.css']
})
export class BookReturnComponent {
  constructor(private http: UserService, private router: Router) { }

  bookList: Book[] = [];
  languageList: Language[] = [];
  borrowNames: { bookId: number, borrowName: string }[] = [];
  keyWords: string = "";
  language: number = 0;
  type: number = 0;

  selectedBookId: number = 0;
  selectedBookName: string = "";
  borrowName: string = "";
  error: string = "";
  selectedBookLang: string = "";
  selectedBookPages: number = 0;
  successMsg: boolean = false;

  currentPage: number = 1;
  numOfPages: number = 0;

  ngOnInit() {
    if (this.languageList.length < 1) {//get languages
      this.http.getLanguages().subscribe(val => {
        if (val && val.error) {
          console.log(val.error);
          if (localStorage.getItem('loginData'))
            localStorage.removeItem('loginData');
          this.router.navigate(['login']);
        }
        else {
          this.languageList = val.list;
        }
      });
    }
  }

  resetSearch() {
    this.keyWords = "";
    this.language = 0;
    this.type = 0;
    this.search();
  }

  showAll() {
    this.keyWords = " ";
    this.search();
  }

  returnBook() {
    this.error = "";
    let error = this.checkInfoLegality();
    if (!error) {
      const user = JSON.parse(localStorage['userData']).first_name + " "
        + JSON.parse(localStorage['userData']).last_name;
      const book = {
        id: this.selectedBookId,
        name: this.borrowName,
        qaPages: "0",
        devPages: "0",
        user: user,
        title: this.selectedBookName
      };
      this.http.returnBook(book).subscribe(val => {
        if (val && val.error) {
          console.log(val.error);
          if (localStorage.getItem('loginData'))
            localStorage.removeItem('loginData');
          this.router.navigate(['login']);
        }
        else {
          this.cancelSelection();
          this.search();
          this.borrowName = "";
          this.successMsg = true;
          let autoHide = setTimeout(() => {
            if (this.successMsg)
              this.successMsg = false;
            clearTimeout(autoHide);
          }, 5000);
        }
      });
    }
    else
      this.error = error;
    console.log(error);

  }



  checkInfoLegality() {
    let error = "";
    const nameReGex = /^[A-Za-z0-9` ]*$/;
    /*     const pagesReGex = /^[A-Za-z0-9` ,-]*$/; */

    if (!this.borrowName)
      error = "*Name of the borrower is missing.";
    else if (this.borrowName.length > 20)
      error = "*Name of the borrower is too long.";
    else if (!this.borrowName.match(nameReGex))
      error = "*Name of the Borrower cannot contains special characters.";
    return error;
  }

  selectBook(bookId: number, bookName: string, language: string, pages: number) {
    this.selectedBookId = bookId;
    this.selectedBookName = bookName;
    /* this.oldQaPages = bookQa;
    this.oldDevPages = bookDev; */
    this.selectedBookLang = language;
    this.selectedBookPages = pages;
  }

  search() {
    this.cancelSelection();
    for (let i of this.keyWords) {
      if (i === "'")
        i = "`";
    }
    let language = this.manageLanguage();
    if (!language)
      language = "0";

    if (language == "0" && this.type == 0 && !this.keyWords) {
      this.bookList = [];
    }
    else
      this.http.searchBooks(this.keyWords, language, this.type, 2).subscribe(val => {
        if (val && val.error) {
          console.log(val.error);
          if (localStorage.getItem('loginData'))
            localStorage.removeItem('loginData');
          this.router.navigate(['login']);
        }
        else {
          //this.bookList = val.bookList;

          this.numOfPages = Math.ceil(val.bookList.length / environment.booksPerPage);
          let start = environment.booksPerPage * (this.currentPage - 1);
          let end = start + environment.booksPerPage;
          this.bookList = val.bookList.slice(start, end);
          
          this.generateBorrowerNames();
        }
      });
  }

  nextPage() {
    if (this.currentPage >= this.numOfPages)
      this.currentPage = 1;
    else
      this.currentPage++;
    this.search();
  }

  prevPage() {
    if (this.currentPage <= 1)
      this.currentPage = this.numOfPages;
    else
      this.currentPage--;
    this.search();
  }

  generateBorrowerNames() {
    for (let book of this.bookList) {
      if (book.status == 0) {
        this.http.getBorrowerName(book.book_id).subscribe({
          next: (val) => {
            if (val?.error) {
              if (localStorage.getItem('loginData')) {
                localStorage.removeItem('loginData');
              }
              this.router.navigate(['login']);
            } else {
              this.borrowNames.push({ bookId: book.book_id, borrowName: val?.borrowerName || "" });
            }
          },
          error: () => {
            // Error already logged in service, handle only if needed
            console.warn(`Failed to fetch borrower name for book ID ${book.book_id}`);
          }
        });
      }
    }
  }

  manageLanguage() {
    const i = this.languageList.find(lang => lang.language_id == this.language);
    return i?.name;
  }

  cancelSelection() {
    this.selectedBookId = 0;
    this.selectedBookName = "";
    this.selectedBookLang = "";
    this.selectedBookPages = 0;
    /*    this.qaPages = "";
       this.oldQaPages = "";
       this.devPages = "";
       this.oldDevPages = ""; */
    this.borrowName = "";
    this.error = "";
  }

  resetError() {
    this.error = "";
  }

  getBorrowerName(bookId: number) {
    let book = this.borrowNames.find(book => book.bookId == bookId);
    return book?.borrowName;
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

}
