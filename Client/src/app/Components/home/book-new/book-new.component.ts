import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Language from 'src/app/Modules/Language';
import NewBook from 'src/app/Modules/NewBook';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css']
})
export class BookNewComponent {
  constructor(private http: UserService, private router: Router) { }

  languageList: Language[] = [];
  bookName: string = "";
  type: number = 0; //1-3
  language: number = 0;
  newLanguage: string = ""; // if language type == -1
  pages: number | undefined; //1-999999
  error: string = "";
  successMsg: boolean = false;


  ngOnInit() {
    this.http.getLanguages().subscribe(val => {
      if (val && val.error) { //logged out
        if (localStorage.getItem('loginData'))
          localStorage.removeItem('loginData');
        this.router.navigate(['login']);
      }
      else {
        this.languageList = val.list;
      }
    });
  }

  addNewBook() {
    if (this.bookName.charAt(0) == " ") {
      let noWord = true;
      for (let letter of this.bookName) {
        if (letter != " ") {
          noWord = false;
          break;
        }
      }
      if (noWord) {
        this.error = "*Book name is missing.";
        return;
      }
    }
    this.error = "";
    let error = this.checkInfoLegality();
    if (!error) {
      let language: string = "";
      if (this.pages) { //can't be undefiend

        for (let lang of this.languageList) {
          if (lang.language_id == this.language) {
            language = lang.name;
            break;
          }
        }

        const book: NewBook = {
          name: this.bookName,
          category: this.type,
          language: language,
          pages: this.pages,
          userName: JSON.parse(localStorage['userData']).first_name + " " + JSON.parse(localStorage['userData']).last_name
        }

        this.http.addNewBook(book).subscribe(answer => {
          if (answer.error) {
            this.error = answer.error;
          }
          else {
            this.bookName = "";
            this.type = 0;
            this.language = 0;
            this.pages = undefined;
            /* this.qaPages = "";
            this.devPages = "";
            this.showPages = false; */
            this.successMsg = true;
            let timer = setTimeout(() => {
              this.successMsg = false;
              clearTimeout(timer);
            }, 5000);
          }


        }

        );

      }
    }
    else {
      this.error = error;
    }
  }

  checkInfoLegality() {
    let error = "";
    //const pagesReGex = /^[A-Za-z0-9` ,-]*$/;
    const bookNameReGex = /^[A-Za-z0-9` ,-]*$/;
    if (!this.bookName)
      error = "*Material name is missing.";
    else if (this.bookName.length > 30)
      error = "*Material name is too long.";
    else if (!this.bookName.match(bookNameReGex))
      error = "*Material name cannot contains speacial characters";
    else if (!this.type)
      error = "*Material's type is missing.";
    else if (!this.language || this.language < 1)
      error = "*Language is missing."
    else if (!this.pages)
      error = "*Pages are missing.";
    else if (this.pages < 0)
      error = "Pages can't be lower than zero.";
    return error;
  }

  addNewLanguage() {
    let error = "";
    if (this.newLanguage.length < 1)
      error = "*Language name is missing"
    else if (this.newLanguage.length > 20)
      error = "*Language name is too long.";
    if (!error) {
      this.http.addNewLanguage(this.newLanguage).subscribe(async val => {
        if (val && val.error) { //logged out
          if (localStorage.getItem('loginData'))
            localStorage.removeItem('loginData');
          this.router.navigate(['login']);
        }
        else {
          this.error = "";
          this.newLanguage = "";
          this.language = 0;
          this.ngOnInit();
          let timer = setTimeout(() => {
            if (this.languageList[this.languageList.length - 1])
              this.language = this.languageList[this.languageList.length - 1].language_id;
            clearTimeout(timer);
          }, 10);
        }
      });
    }
    else {
      this.error = error;
    }

  }

  deleteLanguage() {
    let languageName = "";
    for (let lang of this.languageList)
      if (lang.language_id == this.language) {
        languageName = lang.name;
        break;
      }
    if (confirm(`Remove language ' ${languageName} ' ?`) == true) {
      this.http.deleteLanguage(this.language).subscribe(val => {
        if (val && val.error) { //logged out
          if (localStorage.getItem('loginData'))
            localStorage.removeItem('loginData');
          this.router.navigate(['login']);
        }
        else {
          this.ngOnInit();
          this.newLanguage = "";
          this.language = 0;
        }
      })
    }
  }

  resetError() {
    this.error = "";
  }

}
