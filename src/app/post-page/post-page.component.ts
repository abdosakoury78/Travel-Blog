import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoginService } from '../login.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent implements OnInit {
  @Input() pid: any;
  http = inject(HttpClient);
  loginser = inject(LoginService);
  post: any;
  number = Math.floor(Math.random() * 10);
  isClicked = false;
  isReply = false;
  comment = 3;

  comments = [
    {
      id: 1,
      name: "John Doe",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      replies: [] as string[],
      replyVisible: false
    },
    {
      id: 2,
      name: "Emma Johnson",
      comment: "Consectetur adipiscing elit.",
      replies: [] as string[],
      replyVisible: false
    },
    {
      id: 3,
      name: "Sam Brin",
      comment: "Quisque at magna ut ante eleifend eleifend.",
      replies: [] as string[],
      replyVisible: false
    }
  ];

  // Fetch data based on the provided pid
  fetchData() {
    this.http.get<any[]>('https://raw.githubusercontent.com/abdosakoury78/my-json-files/refs/heads/master/posts.json')
      .subscribe(response => {
        const foundPost = response.find(singlePost => singlePost.id === Number(this.pid));
        if (foundPost) {
          this.post = foundPost;
        }
      });
  }

  ngOnInit(): void {
    this.fetchData();
    window.scrollTo(0, 0);
  }

  addLike() {
    if(this.isClicked) {
      this.number--;
    } else {
      this.number++;
    }
    this.isClicked = !this.isClicked;
  }
  name = "";
  addComment(commentValue : any) {
    let comment = commentValue.value.trim();
    const username = JSON.parse(localStorage.getItem("user") || '{}')?.username;
    this.name = username;
    if(comment !== '') {
      this.comments.push({
        id: this.comment + 1,
        name: username || "UnKnown",
        comment: comment,
        replies: [] as string[],
        replyVisible: false
      })
      commentValue.value = "";
      this.comment++;
    }
  }

  goToComment() {
    window.scrollTo(0, 1000);
  }

  showReplyText(id : any) {
    for(let person of this.comments) {
      if(person.id === id) person.replyVisible = !person.replyVisible;
    }
    const username = JSON.parse(localStorage.getItem("user") || '{}')?.username;
    this.name = username;
  }

  makeReply(id: number, replyInput: HTMLInputElement) {
    const replyContent = replyInput.value.trim();
    if (replyContent) {
      const comment = this.comments.find(c => c.id === id);
      if (comment) {
        comment.replies.push(replyContent);
        replyInput.value = "";
        comment.replyVisible = false;
      }
    }
  }
}
