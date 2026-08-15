import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);


  data: any[] = [];

  goToBlog(): void {
    this.router.navigate(['/blog']);
  }


  ngOnInit(): void {

    this.http
      .get<any[]>(
        'https://raw.githubusercontent.com/abdosakoury78/my-json-files/refs/heads/master/posts.json'
      )
      .subscribe({
        next: (response) => {
          this.data = response.slice(0, 3);
        },

        error: (error) => {
          console.error('Failed to load blog posts:', error);
        }
      });

  }
}

