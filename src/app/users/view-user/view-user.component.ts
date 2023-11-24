import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
  data: { user: User };

  constructor(
    @Optional() public dialogRef: MatDialogRef<ViewUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) incomingData: { user: User }
  ) {
    this.data = incomingData ? incomingData : { user: { id: 0, name: '', email: '', gender: 'male', status: 'active' } };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
