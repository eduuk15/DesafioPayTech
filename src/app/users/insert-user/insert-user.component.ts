import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insert-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insert-user.component.html',
  styleUrl: './insert-user.component.scss'
})
export class InsertUserComponent {
  constructor(
    public dialogRef: MatDialogRef<InsertUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    this.dialogRef.close(this.data.user);
  }
}
