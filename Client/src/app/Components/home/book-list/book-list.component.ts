import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Book from 'src/app/Modules/Book';
import Language from 'src/app/Modules/Language';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/app/Enviroment/enviroment';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  constructor(private http: UserService, private router: Router) { }
  bookList: Book[] = [];
  borrowNames: { bookId: number, borrowName: string }[] = [];
  languageList: Language[] = [];
  keyWords: string = "";
  language: number = 0;
  type: number = 0;//1-3
  selectedBook: number = 0;
  searchInfo: string = ``;

  //pagination___________________________________________

  currentPage: number = 1;
  numOfPages: number = 0;
  //delete this bookList

  //_____________________________________________________

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
    this.search();
  }

  selectBook(bookId: number) {
    this.selectedBook = bookId;
  }

  resetSearch() {
    this.keyWords = "";
    this.language = 0;
    this.type = 0;
    this.search();
  }

  getOverallInfo(bookList: Book[]) { // EFFICIENCY PROBLEM - need to check the list only 1 time
    //total found
    if (bookList.length > 0) {
      this.searchInfo = `Found ${bookList.length} material`;
      if (bookList.length > 1)
        this.searchInfo += `s`;
      //languages found
      if (!this.language || this.language == 0) {
        this.searchInfo += `\n Languages: `;
        for (let lang in this.languageList) {
          let langCount = 0;
          for (let i = 0; i < bookList.length; i++) {
            if (this.languageList[lang].name == bookList[i].language)
              langCount++;
          }
          if (langCount > 0)
            this.searchInfo += ` ${langCount} ${this.languageList[lang].name},`;
          this.searchInfo
          langCount = 0;
        }
      }
      //types found
      if (!this.type || this.type == 0) {
        this.searchInfo += `\n`;
        for (let j = 1; j < 4; j++) {
          let typeCount = 0;
          for (let book of bookList) {
            if (book.category == j)
              typeCount++;
          }
          if (typeCount > 0)
            this.searchInfo += ` ${typeCount} ${this.manageType(j)}`;
          if (typeCount > 1)
            this.searchInfo += `s`;
          if (j < 3)
            this.searchInfo += `,`;
          typeCount = 0;
        }
      }
      this.searchInfo += `\n`;

      let totalPages = 0;
      for (let book of bookList)
        totalPages += book.pages;
      if (totalPages > 0)
        this.searchInfo += ` - ${totalPages} pages`;

      let borrowTimer = setTimeout(() => {
        if (this.borrowNames.length > 0) {
          let takenBooks = 0;
          for (let book of bookList) {
            if (book.status == 0)
              takenBooks++;
          }
          this.searchInfo += ` - ${takenBooks} borrowed material`;
          if (takenBooks > 1)
            this.searchInfo += `s`;
        }
        this.searchInfo += ` - `;
        clearTimeout(borrowTimer);
      }, 10);
    }
    else //none found
      this.searchInfo = `None materials found`;
  }

  search() {
    let language = this.manageLanguage();

    for (let i of this.keyWords) { //was bothering the server
      if (i === "'")
        i = "`";
    }

    this.http.searchBooks(this.keyWords, language, this.type, 0).subscribe(val => {
      if (val && val.error) {
        console.log(val.error);
        this.router.navigate(['login']);
        if (localStorage.getItem('loginData'))
          localStorage.removeItem('loginData');

      }
      else {
        //all:
        /* this.bookList = val.bookList;
        this.generateBorrowerNames();
        this.getOverallInfo(bookList); */

        //page:
        
        this.numOfPages = Math.ceil(val.bookList.length / environment.booksPerPageList);
        let start = environment.booksPerPageList * (this.currentPage - 1);
        let end = start + environment.booksPerPageList;
        this.bookList = val.bookList.slice(start, end);

        this.generateBorrowerNames();
        this.getOverallInfo(val.bookList);


        /* for (let i = 0; i < paginatedBooks.length; i++) {
          console.log(paginatedBooks[i]);
        }
 */

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
        this.http.getBorrowerName(book.book_id).then(val => {
          if (val && val.error) {
            console.log(val.error);
            if (localStorage.getItem('loginData'))
              localStorage.removeItem('loginData');
            this.router.navigate(['login']);
          }
          else {
            if (val?.borrowerName)
              this.borrowNames.push({ bookId: book.book_id, borrowName: val ? val.borrowerName : "" });
          }
        });
      }
    }
  }

  getBorrowerName(bookId: number) {
    let book = this.borrowNames.find(book => book.bookId == bookId);
    return book?.borrowName;
  }



  manageLanguage() {
    const i = this.languageList.find(lang => lang.language_id == this.language);
    return (i && i.name) ? i.name : "0";
  }

  deleteBook(bookId: number, name: string) {
    if (confirm(`Delete ${name} ?`) == true) {
      let userName = JSON.parse(localStorage['userData']).first_name + " " + JSON.parse(localStorage['userData']).last_name;
      this.http.deleteBook(bookId, userName).subscribe(val => {
        if (val && val.error) {
          console.log(val.error);
          if (localStorage.getItem('loginData'))
            localStorage.removeItem('loginData');
          this.router.navigate(['login']);
        }
        else {
          this.search();
        }
      });
    }
  }

  manageStatus(statusId: number): string {
    if (statusId == 1)
      return "Available";
    else
      return "Taken";
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
