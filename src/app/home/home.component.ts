import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  router = inject(Router);
  http = inject(HttpClient);
  data : any;
  goToBlog() {
    this.router.navigate(["/blog"]);
  }

  ngOnInit(): void {
    this.http.get('https://raw.githubusercontent.com/abdosakoury78/my-json-files/refs/heads/master/posts.json').subscribe(response => {
      console.log(response);
      this.data = response;
      this.data = this.data.slice(0, 3);
    });
  }
}
