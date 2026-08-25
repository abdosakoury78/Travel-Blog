import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);

  isFlipped = false;

  errorMes = '';
  isError = false;

  users: any[] = JSON.parse(
    localStorage.getItem('users') || '[]'
  );

  // =========================
  // Login Form
  // =========================

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });


  // =========================
  // Signup Form
  // =========================

  signupForm = this.fb.nonNullable.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });


  // =========================
  // Flip Forms
  // =========================

  flipToSignup(): void {
    this.isError = false;
    this.errorMes = '';

    this.isFlipped = true;
  }

  flipToLogin(): void {
    this.isError = false;
    this.errorMes = '';

    this.isFlipped = false;
  }


  // =========================
  // Login
  // =========================

  onSubmitLogin(): void {

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    const user = this.users.find(
      user =>
        user.username === username &&
        user.password === password
    );

    if (!user) {
      this.isError = true;
      this.errorMes = 'Wrong username or password.';
      return;
    }

    // Login successful
    this.isError = false;
    this.errorMes = '';

    this.loginService.login();

    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );

    this.loginForm.reset();

    this.router.navigate(['/']);
  }


  // =========================
  // Signup
  // =========================

  onSubmitSignup(): void {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const {
      username,
      email,
      password
    } = this.signupForm.getRawValue();


    // Check username
    const usernameExists = this.users.some(
      user => user.username === username
    );

    if (usernameExists) {
      this.isError = true;
      this.errorMes = 'This username is already used.';
      return;
    }


    // Create new user
    const newUser = {
      id: this.getLastId() + 1,
      username,
      email,
      password,
      posts: []
    };


    this.users.push(newUser);

    localStorage.setItem(
      'users',
      JSON.stringify(this.users)
    );

    this.updateLastId(newUser.id);


    // Reset form
    this.signupForm.reset();

    this.isError = false;
    this.errorMes = '';

    // Go back to login
    this.isFlipped = false;
  }


  // =========================
  // ID Management
  // =========================

  getLastId(): number {

    const lastId = localStorage.getItem('lastId');

    return lastId
      ? Number(lastId)
      : 0;
  }


  updateLastId(newId: number): void {

    localStorage.setItem(
      'lastId',
      newId.toString()
    );
  }
}