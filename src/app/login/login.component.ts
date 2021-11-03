import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare let $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z1-9]{3,8}$'),
    ]),
  });

  submitLoginForm(loginForm: FormGroup) {
    if (loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe((response) => {
        if (response.message == 'success') {
          this._Router.navigate(['home']);
          localStorage.setItem('userToken',response.token);
          this._AuthService.saveUserDta()
        } else {
          this.error = response.errors.email.message;  }
      });
    }
  }

  constructor(public _AuthService: AuthService, public _Router: Router) {
  }

  ngOnInit(): void {
    $('#login').particleground();
  }
}
