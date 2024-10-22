import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  router = inject(Router);
  http = inject(HttpClient);
  allPosts: any[] = [];
  data: any;
  buttonClicked: string = '';
  page = 1;
  postsPerPage = 6;

  fetchData() {
    this.http.get('https://raw.githubusercontent.com/abdosakoury78/my-json-files/refs/heads/master/posts.json').subscribe(response => {
      this.allPosts = response as any[];
      this.changePage(this.page);
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  filterCategories(event: any) {
    this.buttonClicked = event.target.textContent;
  }

  changePage(page: number) {
    this.page = page;
    this.applyFiltersAndPagination();
  }

  applyFiltersAndPagination() {
    let filteredPosts = this.allPosts;

    const startIndex = (this.page - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    if(this.page === 3) {
      this.data = filteredPosts.slice(startIndex);
      return;
    } else if(this.page > 3 || this.page < 1) {
      return;
    }
    this.data = filteredPosts.slice(startIndex, endIndex);
  }
}
