import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedIn = false;
  isProfile = false;

  login() {
    this.isLoggedIn = true;
  }

  loginBtn() {
    this.isLoggedIn = false;
  }

  logout() {
    this.isLoggedIn = false;
    this.isProfile = false;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }
}
