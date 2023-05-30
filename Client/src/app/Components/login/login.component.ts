import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Credentials from 'src/app/Modules/Credentials';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: AuthService) { }

  employeeID: number | undefined;
  passWord: string = "";
  showPass: boolean = false;
  error: string = "";

  ngOnInit() {
    if (localStorage.getItem('userData'))
      this.router.navigate(['library']);
  }

  register() {
    this.router.navigate(['register']);
  }

  login() {
    let error = this.checkInfoLegality();
    if (!error && this.employeeID) {
      const credentials: Credentials = {
        employeeID: this.employeeID,
        password: this.passWord
      };
      this.http.login(credentials).subscribe(val => {

        if (val && val.details) { //success
          localStorage['userData'] = JSON.stringify(val.details);
          this.router.navigate(['library']);
        }
        else if (val && val.message) { //failure
          this.error = val.message;
        }

      })


    }
    else {
      this.error = error;
    }
  }

  checkInfoLegality() {
    let error = "";
    const noSpecialRegEx = /^[A-Za-z0-9`]*$/;
    if (!this.employeeID)
      error = "*Employee ID is missing.";
    else if (this.employeeID > 999999)
      error = "*Employee ID is too long.";
    else if (this.employeeID < 1)
      error = "*Employee ID is too short.";
    else if (!this.passWord)
      error = "Password is missing.";
    else if (this.passWord.length > 12)
      error = "Password is too long.";
    else if (this.passWord.length < 4)
      error = "*Password is too short.";
    else if (!this.passWord.match(noSpecialRegEx))
      error = "*Password name cannot contains special characters.";
    return error;
  }

  resetError() {
    this.error = "";
  }

}
