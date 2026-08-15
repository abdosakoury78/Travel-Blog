import { Component, inject } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  listClicked = false;

  private readonly loginService = inject(LoginService);


  showLinks(): void {
    this.listClicked = !this.listClicked;
  }

  closeMenu(): void {
    this.listClicked = false;
  }

  login(): void {
    this.loginService.login();
    this.closeMenu();
  }

  isProfile() {
    return this.loginService.isProfile;
  }

  logout(): void {
    this.loginService.logout();

    this.closeMenu();
  }
}

