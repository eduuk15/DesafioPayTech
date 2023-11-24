import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private headers = new HttpHeaders().set('Authorization', `Bearer ${environment.apiToken}`);

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get('https://gorest.co.in/public/v2/users?per_page=50', { headers: this.headers }).pipe(
      map((response: any) => response)
    );
  }

  searchUsers(searchValue: string, searchType: 'name' | 'email'): Observable<User[]> {
    return this.http.get(`https://gorest.co.in/public/v2/users?${searchType}=${searchValue}`, {headers: this.headers}).pipe(
      map((response: any) => response)
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`https://gorest.co.in/public/v2/users/${user.id}`, user, { headers: this.headers });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`https://gorest.co.in/public/v2/users/${userId}`, { headers: this.headers });
  }

  insertUser(user: User): Observable<any> {
    console.log('oi')
    console.log('user', user);
    return this.http.post(`https://gorest.co.in/public/v2/users`, user, { headers: this.headers });
  }
}

