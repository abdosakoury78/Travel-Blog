import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isFlipped = false;
  formData : any;
  response : any;
  errorMes : any;
  isError = false;
  users = JSON.parse(localStorage.getItem('users') || '[]');
  http = inject(HttpClient);
  router = inject(Router);
  loginService = inject(LoginService);


  flipToSignup() {
    this.isFlipped = true;
  }


  flipToLogin() {
    this.isFlipped = false;
  }

  onSubmitLogin(event : any, username : any, password : any) {
    event.preventDefault();
    this.formData = new FormData(event.target);
    if(this.formData.get('username') !== "" && this.formData.get("password") !== "") {
      for(let user of this.users) {
        if(user.username === this.formData.get('username') && user.password === this.formData.get('password')) {
          this.loginService.isProfile = true;
          this.loginService.loginBtn();
          localStorage.setItem("user", JSON.stringify(user));
          this.router.navigate(['/home']);
          username.value = "";
          password.value = "";
          break;
        } else {
          this.errorMes = "Wrong in username or password.";
          this.isError = true;
        }
      }
    }
  }

  getLastId(): number {
    const lastId = localStorage.getItem('lastId');
    return lastId ? Number(lastId) : 1;
  }

  updateLastId(newId: number): void {
    localStorage.setItem('lastId', newId.toString());
  }



  onSubmitSignup(event : any, username : any, email : any, password : any) {
    event.preventDefault();
    this.formData = new FormData(event.target);
    const newId = this.getLastId() + 1;
    if(this.formData.get('username') !== "" && this.formData.get('email') !== "" && this.formData.get("password") !== "") {
      for(let user of this.users) {
        if(this.formData.get('username') === user.username) {
          this.isError = true;
          this.errorMes = "This username is already used.";
          username.style.borderColor = 'red';
          return;
        }
      }

      for(let user of this.users) {
        if(this.formData.get('password') === user.password) {
          this.isError = true;
          this.errorMes = "This password is already used.";
          password.style.borderColor = 'red';
          username.style.borderColor = "#ccc";
          return;
        }
      }
      const signupData = {
        id: newId,
        username: this.formData.get('username'),
        email: this.formData.get('email'),
        password: this.formData.get('password'),
        posts: []
      };
      this.users.push(signupData);

      localStorage.setItem('users', JSON.stringify(this.users));

      this.updateLastId(newId);

      username.value = "";
      email.value = "";
      password.value = "";

      this.errorMes = "";
      this.isError = false;
      password.style.borderColor = "#ccc";
      username.style.borderColor = "#ccc";

    }


  }
}