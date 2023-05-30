import { Component } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/Modules/User';
import { AuthService } from 'src/app/Services/auth.service';
//Captcha = 'https://www.google.com/recaptcha/admin/create';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, private http: AuthService) {
    //this.captcha = '';
  }
  employeeID: number | undefined;
  firstName: string = "";
  lastName: string = "";
  passWord: string = "";
  showPass: boolean = false;
  showHint: boolean = false;
  error: string = "";
  successMsg: string = "";
  captcha: string = ''; //was filled in constructor before


  ngOnInit() {
    if (localStorage.getItem('userData'))
      this.router.navigate(['library']);
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    this.resetErrors();

    //console.log(`resolved captcha with response: '${captchaResponse}'`);//DEL
  }

  resetErrors() {
    this.error = "";
  }

  register() {
    this.error = "";
    const error = this.checkInfoLegality();
    if (!error && this.employeeID) {
      const newUser: User = {
        user_id: 0,
        employee_ID: this.employeeID,
        first_name: this.firstName,
        last_name: this.lastName,
        password: this.passWord,
        role: ""
      };
      this.http.register(newUser).subscribe(val => {
        if (val && val.message) {
          this.error = val.message;
        }
        else {
          this.resetForm();
          this.successMsg = "Register Succesfully, admin-approve pending.";
          let timer = setTimeout(() => {
            this.router.navigate(['login']);
            if (timer)
              clearTimeout(timer);
          }, 7500);
          /* localStorage['userData'] = JSON.stringify(val);
          this.router.navigate(['library']); */
        }
      });
    }
    else {
      this.error = error;
    }
  }

  backToLogin() {
    this.router.navigate(['login']);
  }

  resetForm() {
    this.employeeID = undefined;
    this.firstName = "";
    this.lastName = "";
    this.passWord = "";
  }

  checkInfoLegality() {
    let error = "";
    const nameRegEx = /^[A-Za-z0-9` ]*$/;
    const passRegEx = /^[A-Za-z0-9`]*$/;
    if (!this.employeeID)
      error = "*Employee ID is missing.";
    else if (this.employeeID > 999999)
      error = "*Employee ID is too long.";
    else if (this.employeeID < 1)
      error = "*Employee ID is too short.";
    else if (!this.firstName)
      error = "*First name is missing.";
    else if (this.firstName.length > 20)
      error = "*First name is too long.";
    else if (this.firstName.length < 2)
      error = "*First name is too short.";
    else if (!this.firstName.match(nameRegEx))
      error = "*First name cannot contains special characters.";
    else if (!this.lastName)
      error = "*Last name is missing.";
    else if (this.lastName.length > 20)
      error = "*Last name is too long.";
    else if (this.lastName.length < 2)
      error = "*Last name is too short.";
    else if (!this.lastName.match(nameRegEx))
      error = "*Last name cannot contains special characters.";
    else if (!this.passWord)
      error = "*Password is missing.";
    else if (this.passWord.length > 12)
      error = "*Password is too long.";
    else if (this.passWord.length < 4)
      error = "*Password is too short.";
    else if (!this.passWord.match(passRegEx))
      error = "*Password cannot contains special characters.";
    else if (!this.captcha)
      error = "*Human Verification id required."

    return error;
  }

  showHintTgl() {
    if (this.showHint)
      this.showHint = false;
    else {
      this.showHint = true;
      let autoHide = setTimeout(() => {
        if (this.showHint)
          this.showHint = false;
        clearTimeout(autoHide);
      }, 5000)
    }
  }
}
