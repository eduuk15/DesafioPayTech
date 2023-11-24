import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Post } from '../post.model';


@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})

export class ViewPostComponent {
  data: { post: Post };

  constructor(
    @Optional() public dialogRef: MatDialogRef<ViewPostComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) incomingData: { post: Post }
    ) {
      this.data = incomingData ? incomingData : { post: { id: 0, user_id: 0, title: '', body: '' } };
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
