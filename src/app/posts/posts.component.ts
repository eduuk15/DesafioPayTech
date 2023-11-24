import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewPostComponent } from './view-post/view-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { InsertPostComponent } from './insert-post/insert-post.component';
import { Post } from './post.model';
import { PostsApiService } from '../services/posts-api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    ViewPostComponent,
    EditPostComponent,
    DeletePostComponent,
    InsertPostComponent
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  searchValue = '';
  searchOption: 'title' | 'user_id' = 'title';
  posts: Post[] = [];
  pageSize = 10;
  currentPage = 0;
  pages: number[] = [];

  constructor(
    private dialog: MatDialog,
    private postsApiService: PostsApiService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postsApiService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.pages = Array(Math.ceil(this.posts.length / this.pageSize)).fill(0).map((x, i) => i);
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  get postsOnCurrentPage(): Post[] {
    const start = this.currentPage * this.pageSize;
    return this.posts.slice(start, start + this.pageSize);
  }

  onActionSelect(event: Event, postId: number): void {
    const target = event.target as HTMLSelectElement;
    const action = target.value;
    switch (action) {
      case 'view':
        target.value = '';
        const postView = this.posts.find(post => post.id === postId);
        const postToView = postView ? { ...postView } : {
          id: 0,
          user_id: 0,
          title: '',
          body: ''
        };
        this.dialog.open(ViewPostComponent, {
          data: { post: postToView },
          width: '600px'
        });

        break;
      case 'edit':
        target.value = '';
        const postEdit = this.posts.find(post => post.id === postId);
        const postToEdit = postEdit ? { ...postEdit } : {
          id: 0,
          user_id: 0,
          title: '',
          body: ''
        };
        const editDialogRef = this.dialog.open(EditPostComponent, {
          data: { post: postToEdit },
          width: '600px'
        });

        editDialogRef.afterClosed().subscribe(post => {
          if (post) {
            this.postsApiService.updatePost(post).subscribe(() => {
              this.clearFilters()
            });
          }
        });

        break;
      case 'delete':
        target.value = '';
        const deleteDialogRef = this.dialog.open(DeletePostComponent, {
          data: { postId: postId },
          width: '400px'
        });

        deleteDialogRef.afterClosed().subscribe(postId => {
          if (postId) {
            this.postsApiService.deletePost(postId).subscribe(() => {
              this.clearFilters()
            });
          }
        });

        break;
    }
  }

  onSearch(): void {
    this.postsApiService.searchPosts(this.searchValue, this.searchOption).subscribe(posts => {
      this.posts = posts;
      this.pages = Array(Math.ceil(this.posts.length / this.pageSize)).fill(0).map((x, i) => i);
    });
  }

  insertPost(): void {
    const insertDialogRef = this.dialog.open(InsertPostComponent, {
      data: { post: {
        id: 0,
        user_id: 0,
        title: '',
        body: ''
      } },
      width: '600px'
    })
    insertDialogRef.afterClosed().subscribe(post => {
      if (post) {
        this.postsApiService.insertPost(post).subscribe(() => {
          this.clearFilters()
        });
      }
    });
  }

  clearFilters(): void {
    this.searchValue = '';
    this.searchOption = 'title';
    this.loadPosts();
  }
}

