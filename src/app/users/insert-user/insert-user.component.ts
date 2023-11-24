import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
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
  data: { user: User };

  constructor(
    @Optional() public dialogRef: MatDialogRef<InsertUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) incomingData: { user: User }
  ) {
    this.data = incomingData ? incomingData : { user: { id: 0, name: '', email: '', gender: 'male', status: 'active' } };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    this.dialogRef.close(this.data.user);
  }
}
