import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  private headers = new HttpHeaders().set('Authorization', `Bearer ${environment.apiToken}`);

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get('https://gorest.co.in/public/v2/posts?per_page=50', { headers: this.headers }).pipe(
      map((response: any) => response)
    );
  }

  searchPosts(searchValue: string, searchType: 'title' | 'user_id'): Observable<Post[]> {
    return this.http.get(`https://gorest.co.in/public/v2/posts?${searchType}=${searchValue}`, {headers: this.headers}).pipe(
      map((response: any) => response)
    );
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(`https://gorest.co.in/public/v2/posts/${post.id}`, post, { headers: this.headers });
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(`https://gorest.co.in/public/v2/posts/${postId}`, { headers: this.headers });
  }

  insertPost(post: Post): Observable<any> {
    return this.http.post(`https://gorest.co.in/public/v2/posts`, post, { headers: this.headers });
  }
}

