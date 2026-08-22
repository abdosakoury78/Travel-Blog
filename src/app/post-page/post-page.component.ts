import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


interface Comment {
  id: number;
  name: string;
  comment: string;
  replies: string[];
  replyNames: string[];
  replyVisible: boolean;
}


@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent implements OnInit {

  @Input() pid: any;

  @ViewChild('commentsSection')
  commentsSection!: ElementRef;

  private http = inject(HttpClient);

  post: any = null;

  number = Math.floor(Math.random() * 10);

  isClicked = false;

  comments: Comment[] = [

    {
      id: 1,
      name: 'John Doe',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      replies: [],
      replyNames: [],
      replyVisible: false
    },

    {
      id: 2,
      name: 'Emma Johnson',
      comment: 'Consectetur adipiscing elit.',
      replies: [],
      replyNames: [],
      replyVisible: false
    },

    {
      id: 3,
      name: 'Sam Brin',
      comment: 'Quisque at magna ut ante eleifend eleifend.',
      replies: [],
      replyNames: [],
      replyVisible: false
    }

  ];


  commentForm = new FormGroup({
    comment: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    })
  });

  replyForms: {
    [key: number]: FormGroup<{
      reply: FormControl<string>
    }>
  } = {};

  ngOnInit(): void {

    this.createReplyForms();

    this.fetchData();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }


  fetchData(): void {

    this.http
      .get<any[]>(
        'https://raw.githubusercontent.com/abdosakoury78/my-json-files/refs/heads/master/posts.json'
      )
      .subscribe({

        next: (posts) => {

          this.post = posts.find(
            post => post.id === Number(this.pid)
          );

        },

        error: (error) => {
          console.error('Failed to load post:', error);
        }

      });

  }


  /* =========================================================
     Create Reply Forms
     ========================================================= */

  createReplyForms(): void {

    this.comments.forEach(comment => {

      this.replyForms[comment.id] = new FormGroup({
        reply: new FormControl('', {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(2)
          ]
        })
      });

    });

  }


  addLike(): void {

    if (this.isClicked) {
      this.number--;
    } else {
      this.number++;
    }

    this.isClicked = !this.isClicked;

  }


  addComment(): void {

    if (this.commentForm.invalid) {

      this.commentForm.markAllAsTouched();

      return;

    }


    const commentText =
      this.commentForm.controls.comment.value.trim();


    const username =
      this.getUsername();


    const newComment: Comment = {

      id: this.getNextCommentId(),

      name: username || 'Unknown',

      comment: commentText,

      replies: [],

      replyNames: [],

      replyVisible: false

    };


    this.comments.push(newComment);

    this.replyForms[newComment.id] = new FormGroup({

      reply: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(2)
        ]
      })

    });


    /* Reset form */

    this.commentForm.reset();


  }


  /* =========================================================
     Show / Hide Reply
     ========================================================= */

  showReplyText(id: number): void {

    const comment = this.comments.find(
      person => person.id === id
    );

    if (!comment) {
      return;
    }


    comment.replyVisible = !comment.replyVisible;

  }


  /* =========================================================
     Add Reply
     ========================================================= */

  makeReply(id: number): void {

    const form = this.replyForms[id];

    if (!form || form.invalid) {

      form?.markAllAsTouched();

      return;

    }


    const replyContent =
      form.controls.reply.value.trim();


    if (!replyContent) {
      return;
    }


    const comment =
      this.comments.find(
        person => person.id === id
      );


    if (!comment) {
      return;
    }


    const username =
      this.getUsername();


    comment.replies.push(replyContent);

    comment.replyNames.push(
      username || 'Unknown'
    );


    form.reset();

    comment.replyVisible = false;

  }


  goToComment(): void {

    this.commentsSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  }


  private getUsername(): string {

    try {

      const user =
        JSON.parse(
          localStorage.getItem('user') || '{}'
        );

      return user?.username || '';

    } catch {

      return '';

    }

  }


  private getNextCommentId(): number {

    if (this.comments.length === 0) {
      return 1;
    }

    return Math.max(
      ...this.comments.map(comment => comment.id)
    ) + 1;

  }

}