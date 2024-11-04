import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center space-y-4">
      <input type="file" (change)="onFileSelected($event)" class="cursor-pointer" />
      <button
        *ngIf="selectedFile"
        (click)="uploadImage()"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload Image
      </button>
    </div>
  `,
})
export class UploadImageComponent {
  selectedFile: File | null = null;
  @Output() imageSelected = new EventEmitter<File>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      this.imageSelected.emit(this.selectedFile);
    }
  }
}
