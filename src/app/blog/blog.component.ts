import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FooterComponent } from '../footer/footer.component';

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  private readonly http = inject(HttpClient);
  allPosts: Post[] = [];
  data: Post[] = [];
  categories: string[] = [
    'All',
    'Europe',
    'Adventure',
    'Asia',
    'Africa',
    'North America',
    'South America'
  ];

  selectedCategory = 'All';
  currentPage = 1;
  postsPerPage = 6;
  totalPages = 1;
  isLoading = false;

  ngOnInit(): void {
    this.fetchPosts();
  }


  // =========================================================
  // Fetch Posts
  // =========================================================

  private fetchPosts(): void {

    this.isLoading = true;

    this.http
      .get<Post[]>(
        'https://raw.githubusercontent.com/abdosakoury78/my-json-files/refs/heads/master/posts.json'
      )
      .subscribe({
        next: (posts) => {

          this.allPosts = posts;

          this.applyFiltersAndPagination();

          this.isLoading = false;
        },

        error: (error) => {

          console.error('Failed to load posts:', error);

          this.isLoading = false;
        }
      });
  }


  // =========================================================
  // Category Filter
  // =========================================================

  filterCategories(category: string): void {

    this.selectedCategory = category;
    this.currentPage = 1;

    this.applyFiltersAndPagination();
  }


  // =========================================================
  // Filter + Pagination
  // =========================================================

  private applyFiltersAndPagination(): void {

    let filteredPosts = this.allPosts;

    if (this.selectedCategory !== 'All') {

      filteredPosts = this.allPosts.filter(
        post => post.category === this.selectedCategory
      );

    }

    this.totalPages = Math.ceil(
      filteredPosts.length / this.postsPerPage
    );

    if (this.totalPages === 0) {
      this.totalPages = 1;
    }

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }


    // Pagination

    const startIndex =
      (this.currentPage - 1) * this.postsPerPage;

    const endIndex =
      startIndex + this.postsPerPage;


    this.data = filteredPosts.slice(
      startIndex,
      endIndex
    );
  }

  changePage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.currentPage = page;

    this.applyFiltersAndPagination();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  get pages(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );

  }

}