import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  data: { user: User };

  constructor(
    @Optional() public dialogRef: MatDialogRef<EditUserComponent>,
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
