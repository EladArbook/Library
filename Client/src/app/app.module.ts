import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookListComponent } from './Components/home/book-list/book-list.component';
import { BookReturnComponent } from './Components/home/book-return/book-return.component';
import { BookBorrowComponent } from './Components/home/book-borrow/book-borrow.component';
import { BookNewComponent } from './Components/home/book-new/book-new.component';
import { TokenInterceptor } from './token.interceptor';
import { ManageBooksComponent } from './Components/home/admin/manage-books/manage-books.component';
import { ManageUsersComponent } from './Components/home/admin/manage-users/manage-users.component';
import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BookListComponent,
    BookReturnComponent,
    BookBorrowComponent,
    BookNewComponent,
    ManageBooksComponent,
    ManageUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
