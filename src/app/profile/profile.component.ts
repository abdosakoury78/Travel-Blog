import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { LoginService } from '../login.service';


interface UserPost {
  title: string;
  description: string;
  details: string;
  image: string | null;
  date: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: UserPost[];
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  private fb = inject(FormBuilder);
  loginService = inject(LoginService);


  // =========================
  // Component State
  // =========================

  isClicked = false;
  isError = false;
  isSaved = false;

  errorMes = '';
  number = 0;

  selectedImage: File | null = null;


  // =========================
  // Local Storage
  // =========================

  user: User = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  users: User[] = JSON.parse(
    localStorage.getItem('users') || '[]'
  );


  // =========================
  // Profile Form
  // =========================

  profileForm = this.fb.nonNullable.group({

    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ]

  });


  // =========================
  // Create Post Form
  // =========================

  postForm = this.fb.nonNullable.group({

    title: [
      '',
      Validators.required
    ],

    description: [
      '',
      Validators.required
    ],

    details: [
      '',
      Validators.required
    ]

  });


  constructor() {

    this.profileForm.setValue({
      username: this.user.username || '',
      password: this.user.password || '',
      email: this.user.email || ''
    });

  }


  // =========================
  // Save Profile
  // =========================

  saveChanges(): void {

    this.isError = false;
    this.isSaved = false;
    this.errorMes = '';

    if (this.profileForm.invalid) {

      this.profileForm.markAllAsTouched();

      return;
    }


    const {
      username,
      password,
      email
    } = this.profileForm.getRawValue();


    // Check if username belongs to another user
    const usernameExists = this.users.some(
      user =>
        user.username === username &&
        user.id !== this.user.id
    );

    if (usernameExists) {

      this.isError = true;
      this.errorMes = 'This username is already used.';

      return;
    }


    // Check if password belongs to another user
    const passwordExists = this.users.some(
      user =>
        user.password === password &&
        user.id !== this.user.id
    );

    if (passwordExists) {

      this.isError = true;
      this.errorMes = 'This password is already used.';

      return;
    }


    // Update current user
    this.user = {
      ...this.user,
      username,
      password,
      email
    };


    // Find user inside users array
    const userIndex = this.users.findIndex(
      user => user.id === this.user.id
    );


    if (userIndex !== -1) {
      this.users[userIndex] = this.user;
    }


    // Update localStorage
    localStorage.setItem(
      'user',
      JSON.stringify(this.user)
    );

    localStorage.setItem(
      'users',
      JSON.stringify(this.users)
    );


    this.isSaved = true;

  }


  // =========================
  // Select Image
  // =========================

  onImageSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedImage = input.files[0];

    } else {

      this.selectedImage = null;

    }

  }


  // =========================
  // Create Post
  // =========================

  createPost(): void {

    if (this.postForm.invalid) {

      this.postForm.markAllAsTouched();

      return;
    }


    const {
      title,
      description,
      details
    } = this.postForm.getRawValue();


    const today = new Date()
      .toISOString()
      .split('T')[0];


    // If user selected an image
    if (this.selectedImage) {

      const reader = new FileReader();

      reader.onload = () => {

        const post: UserPost = {

          title,
          description,
          details,

          image: reader.result as string,

          date: today

        };


        this.savePost(post);

      };


      reader.readAsDataURL(this.selectedImage);

    } else {

      const post: UserPost = {

        title,
        description,
        details,

        image: null,

        date: today

      };


      this.savePost(post);

    }

  }


  // =========================
  // Save Post
  // =========================

  private savePost(post: UserPost): void {

    this.user.posts.push(post);


    const userIndex = this.users.findIndex(
      user => user.id === this.user.id
    );


    if (userIndex !== -1) {

      this.users[userIndex] = this.user;

    }


    localStorage.setItem(
      'user',
      JSON.stringify(this.user)
    );

    localStorage.setItem(
      'users',
      JSON.stringify(this.users)
    );


    // Reset form
    this.postForm.reset();

    this.selectedImage = null;

  }


  // =========================
  // Like
  // =========================

  addLike(): void {

    if (this.isClicked) {

      this.number--;

    } else {

      this.number++;

    }

    this.isClicked = !this.isClicked;

  }

}