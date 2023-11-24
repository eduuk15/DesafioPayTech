import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../post.model';
import { User } from '../../users/user.model';
import { UsersApiService } from '../../services/users-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-insert-post',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './insert-post.component.html',
  styleUrls: ['./insert-post.component.scss'],
  providers: [UsersApiService]
})
export class InsertPostComponent {
  data: { post: Post };
  users: User[] = [];
  searchText = '';
  userId = 0;
  filteredUsers: User[] = [];

  constructor(
    private usersApiService: UsersApiService,
    @Optional() public dialogRef: MatDialogRef<InsertPostComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) incomingData: { post: Post }
  ) {
    this.data = incomingData ? incomingData : { post: { id: 0, user_id: 0, title: '', body: '' } };
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersApiService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    this.dialogRef.close(this.data.post);
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => user.name.includes(this.searchText));
    if (this.filteredUsers.length === 1) {
      this.onUserSelected(this.filteredUsers[0]);
    }
  }

  onUserSelected(user: User) {
    this.searchText = user.name;
    this.userId = user.id;
    this.data.post.user_id = user.id;
  }
}
