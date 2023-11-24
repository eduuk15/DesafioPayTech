import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-post',
  standalone: true,
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.scss'
})
export class DeletePostComponent {
  constructor(
    @Optional() public dialogRef: MatDialogRef<DeletePostComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { postId: number }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close(this.data.postId);
  }
}
