import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  loginService = inject(LoginService);
  isClicked = false;
  isError = false;
  errorMes : any;
  formData : any;
  number = 0;

  user = JSON.parse(localStorage.getItem("user") || "{}");
  users = JSON.parse(localStorage.getItem("users") || "[]");


  addLike() {
    if(this.isClicked) {
      this.number--;
    } else {
      this.number++;
    }
    this.isClicked = !this.isClicked;
  }

  // save button function
  saveChanges(username : any, password : any, email : any) {
    let user = this.user.username;
    let pass = this.user.password;

    this.user.username = username.value;
    this.user.password = password.value;
    this.user.email = email.value;

    if(user === this.user.username && pass === this.user.password) {
      this.isError = false;
      this.errorMes = '';
      return;
    } else if(user !== this.user.username) {
      for(let user of this.users) {
        if(this.user.username === user.username) {
          this.isError = true;
          this.errorMes = "This username is already used.";
          return;
        }
      }
      const userIndex = this.users.findIndex((u: any) => u.id === this.user.id);
      if (userIndex !== -1) {
        this.users[userIndex] = this.user;
      }

      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("users", JSON.stringify(this.users));


      this.isError = false;
      this.errorMes = '';
    } else if(pass !== this.user.password) {
      for(let user of this.users) {
        if(this.user.password === user.password) {
          this.isError = true;
          this.errorMes = "This password is already used.";
          return;
        }
      }
      const userIndex = this.users.findIndex((u: any) => u.id === this.user.id);
      if (userIndex !== -1) {
        this.users[userIndex] = this.user;
      }

      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("users", JSON.stringify(this.users));


      this.isError = false;
      this.errorMes = '';
    }
  }

  // create post function
  createPost(event: any) {
    event.preventDefault();
    this.formData = new FormData(event.target);

    let today = new Date();
    let todayFormat = today.toISOString().split('T')[0];

    const imageFile = this.formData.get('image') as File;

    if (imageFile && imageFile.size > 0) {

      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;


        let post = {
          title: this.formData.get('title'),
          description: this.formData.get('description'),
          details: this.formData.get('details'),
          image: base64Image,
          date: todayFormat
        };


        this.user.posts.push(post);


        const userIndex = this.users.findIndex((u: any) => u.id === this.user.id);
        if (userIndex !== -1) {
          this.users[userIndex] = this.user;
        }


        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("users", JSON.stringify(this.users));


        event.target.reset();
      };
      reader.readAsDataURL(imageFile);
    } else {

      let post = {
        title: this.formData.get('title'),
        description: this.formData.get('description'),
        details: this.formData.get('details'),
        image: null,
        date: todayFormat
      };


      this.user.posts.push(post);


      const userIndex = this.users.findIndex((u: any) => u.id === this.user.id);
      if (userIndex !== -1) {
        this.users[userIndex] = this.user;
      }

      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("users", JSON.stringify(this.users));

      event.target.reset();
    }

  }

}
