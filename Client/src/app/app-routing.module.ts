import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBooksComponent } from './Components/home/admin/manage-books/manage-books.component';
import { ManageUsersComponent } from './Components/home/admin/manage-users/manage-users.component';
import { BookBorrowComponent } from './Components/home/book-borrow/book-borrow.component';
import { BookListComponent } from './Components/home/book-list/book-list.component';
import { BookNewComponent } from './Components/home/book-new/book-new.component';
import { BookReturnComponent } from './Components/home/book-return/book-return.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  {
    path: `library`,
    component: HomeComponent,
    children: [
      {
        path: 'list',
        component: BookListComponent
      },
      {
        path: 'return',
        component: BookReturnComponent
      },
      {
        path: 'borrow',
        component: BookBorrowComponent
      },
      {
        path: 'new',
        component: BookNewComponent
      },
      {
        path: 'manage-books',
        component: ManageBooksComponent
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: `register`,
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
