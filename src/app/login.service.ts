import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedIn = false;
  private profileVisible = false;


  login(): void {
    this.isLoggedIn = true;
    this.profileVisible = true;
  }


  loginBtn(): void {
    this.isLoggedIn = false;
    this.profileVisible = false;
  }


  logout(): void {
    this.isLoggedIn = false;
    this.profileVisible = false;
  }

  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }

  get isProfile(): boolean {
    return this.profileVisible;
  }
}

