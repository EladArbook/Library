import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private http: AuthService) { }
  userName: string = "";
  role: string = "";
  ngOnInit() {
    if (!localStorage['userData'] || !JSON.parse(localStorage['userData']).token) { // no user data is saved
      localStorage.removeItem('userData');
      this.router.navigate(['login']);
    }
    else { // all data exist - validate is next

      if (localStorage['userData'] && JSON.parse(localStorage['userData']).first_name &&
        JSON.parse(localStorage['userData']).last_name) {

        this.http.validToken().subscribe(val => {
          if (val && val.valid) { //auto log in

            this.userName = JSON.parse(localStorage['userData']).first_name + " " +
              JSON.parse(localStorage['userData']).last_name;

            if (localStorage['userData'] && JSON.parse(localStorage['userData']).role &&
              JSON.parse(localStorage['userData']).role == "Admin")
              this.role = "Admin";
          }
          else { //session timed out
            localStorage.removeItem('userData');
            this.router.navigate(['login']);
          }

        });
      }
    }
  }

  logOut() {
    if (localStorage.getItem('userData'))
      localStorage.removeItem('userData');
    this.router.navigate(['login']);
  }

  changeView(view: number) {
    switch (view) {
      case 1:
        this.router.navigate(['library/list']);
        break;
      case 2:
        this.router.navigate(['library/return']);
        break;
      case 3:
        this.router.navigate(['library/borrow']);
        break;
      case 4:
        this.router.navigate(['library/new']);
        break;
      default:
        this.router.navigate(['library']);
        break;
    }
  }

  manageBooks() {
    this.router.navigate(['library/manage-books']);
  }

  manageUsers() {
    this.router.navigate(['library/manage-users']);
  }

}
