import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}
  userDta: any = '';
  isLogin: boolean = false;
  ngOnInit(): void {
    this._AuthService.userDta.subscribe(() => {
      if (this._AuthService.userDta.getValue() != null) {
        this.isLogin = true;
        this.userDta=this._AuthService.userDta.getValue();
      } else {
        this.isLogin = false;
      }
    });
  }

  logOut() {
    this._AuthService.logOut();
  }
}
