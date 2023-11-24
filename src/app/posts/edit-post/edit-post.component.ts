import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Post } from '../post.model';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {
  data: { post: Post };

  constructor(
    @Optional() public dialogRef: MatDialogRef<EditPostComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) incomingData: { post: Post }
    ) {
      this.data = incomingData ? incomingData : { post: { id: 0, user_id: 0, title: '', body: '' } };
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    this.dialogRef.close(this.data.post);
  }
}
