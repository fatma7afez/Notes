import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare let $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error: string = '';
  isRegister:boolean;
  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(16),
      Validators.max(80),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z1-9]{3,8}$'),
    ]),
  });

  submitRegisterForm(registerForm: FormGroup) {
    if (registerForm.valid) {
      this.isRegister=true;
      this._AuthService.register(registerForm.value).subscribe((response) => {
        if (response.message == 'success') {
          this.isRegister=false;
          this._Router.navigate(['signin']);

        } else {
          this.error = response.errors.email.message;
          this.isRegister=true;

        }
      });
    }
  }

  constructor(public _AuthService: AuthService, public _Router: Router) {
    this.isRegister=false;
  }

  ngOnInit(): void {
    $('#register').particleground();
  }
}
