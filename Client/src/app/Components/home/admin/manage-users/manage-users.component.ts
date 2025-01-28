import { Component } from '@angular/core';
import { Router } from '@angular/router';
import History from 'src/app/Modules/History';
import User from 'src/app/Modules/User';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {

  constructor(private http: AdminService, private router: Router) { }
  userList: User[] = [];
  selectedUser: number = 0;
  historyId: number = 0;
  historyList: History[] = [];
  userName: string = "";

  ngOnInit() {
    if (!localStorage['userData'] || !JSON.parse(localStorage['userData']).token ||
      JSON.parse(localStorage['userData']).role != "Admin") {
      if (localStorage['userData'])
        localStorage.removeItem('userData');
      this.router.navigate(['login']);
    }
    else {
      this.http.getAllUsers().subscribe(val => {
        if (val && val.error) {//logged out
          if (localStorage.getItem('loginData'))
            localStorage.removeItem('loginData');
          this.router.navigate(['login']);
        }
        else {
          this.userList = val.userList;
        }
      });
    }
  }

  selectUser(userId: number) {
    this.selectedUser = userId;
  }

  manageUser(operation: string, userId: number, userName: string) {
    switch (operation) {
      case "BLOCK":
        this.http.blockUser(userId).subscribe(val => {
          if (val && val.error) { //logged out
            if (localStorage.getItem('loginData'))
              localStorage.removeItem('loginData');
            this.router.navigate(['login']);
          }
          else {
            this.ngOnInit();
          }
        });
        break;
      case "UNBLOCK":
        this.http.unblockUser(userId).subscribe(val => {
          if (val && val.error) { //logged out
            if (localStorage.getItem('loginData'))
              localStorage.removeItem('loginData');
            this.router.navigate(['login']);
          }
          else {
            this.ngOnInit();
          }
        });
        break;
      case "APPROVE":
        if (confirm(`Approve ${userName} ?`) == true) {
          this.http.unblockUser(userId).subscribe(val => {
            if (val && val.error) { //logged out
              if (localStorage.getItem('loginData'))
                localStorage.removeItem('loginData');
              this.router.navigate(['login']);
            }
            else
              this.ngOnInit();
          });
        }
        break;
    }
  }

  showHistory(userId: number, userName: string) {
    this.historyId = userId;
    this.userName = userName;
    this.searchHistory(userName);
  }

  searchHistory(userName: string) {
    if (this.historyId > 0) {
      this.http.userHistory(userName).subscribe(val => {

        if (val && val.error) { //logged out
          if (localStorage.getItem('loginData'))
            localStorage.removeItem('loginData');
          this.router.navigate(['login']);
        }
        else {
          this.historyList = val.historyList;
        }
      })
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

  backToList() {
    this.historyId = 0;
    this.userName = "";
  }



}