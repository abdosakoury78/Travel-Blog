import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedIn = false;


  login(): void {
    this.isLoggedIn = true;
  }


  loginBtn(): void {
    this.isLoggedIn = false;
  }


  logout(): void {
    this.isLoggedIn = false;
  }

  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }

}

