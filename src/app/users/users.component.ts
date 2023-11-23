import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { User } from './user.model';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UsersApiService } from '../services/users-api.service';
import { ViewUserComponent } from './view-user/view-user.component';
import { InsertUserComponent } from './insert-user/insert-user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    FormsModule,
    MatDialogModule,
    ViewUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    InsertUserComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  searchValue = '';
  searchOption: 'email' | 'name' = 'email';
  users: User[] = [];
  pageSize = 5;
  currentPage = 0;
  pages: number[] = [];

  constructor(
    private dialog: MatDialog,
    private usersApiService: UsersApiService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersApiService.getUsers().subscribe(users => {
      this.users = users;
      this.pages = Array(Math.ceil(this.users.length / this.pageSize)).fill(0).map((x, i) => i);
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  get usersOnCurrentPage(): User[] {
    const start = this.currentPage * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

  onActionSelect(event: Event, userId: number): void {
    const target = event.target as HTMLSelectElement;
    const action = target.value;
    switch (action) {
      case 'view':
        const userView = this.users.find(user => user.id === userId);
        const userToView = { ...userView };
        this.dialog.open(ViewUserComponent, {
          data: { user: userToView },
          width: '250px'
        });

        break;
      case 'edit':
        const user = this.users.find(user => user.id === userId);
        const userToEdit = { ...user };
        const editDialogRef = this.dialog.open(EditUserComponent, {
          data: { user: userToEdit },
          width: '250px'
        });

        editDialogRef.afterClosed().subscribe(user => {
          if (user) {
            this.usersApiService.updateUser(user).subscribe(() => {
              this.clearFilters()
            });
          }
        });

        break;
      case 'delete':
        const deleteDialogRef = this.dialog.open(DeleteUserComponent, {
          data: { userId: userId },
          width: '250px'
        });

        deleteDialogRef.afterClosed().subscribe(userId => {
          if (userId) {
            this.usersApiService.deleteUser(userId).subscribe(() => {
              this.clearFilters()
            });
          }
        });

        break;
    }
  }

  onSearch(): void {
    this.usersApiService.searchUsers(this.searchValue, this.searchOption).subscribe(users => {
      this.users = users;
      this.pages = Array(Math.ceil(this.users.length / this.pageSize)).fill(0).map((x, i) => i);
    });
  }

  insertUser(): void {
    const insertDialogRef = this.dialog.open(InsertUserComponent, {
      data: { user: {} },
      width: '250px'
    })
    insertDialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
      if (result) {
        this.usersApiService.insertUser(result).subscribe(() => {
          this.clearFilters()
        });
      }
    });
  }

  clearFilters(): void {
    this.searchValue = '';
    this.searchOption = 'email';
    this.loadUsers();
  }
}

