import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  listClicked = false;
  loginService = inject(LoginService);
  showLinks() {
    this.listClicked = !this.listClicked;
  }

  login() {
    this.loginService.login();
  }
}
