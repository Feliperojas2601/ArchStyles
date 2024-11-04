// image-processing.component.ts
import { Component } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-processing',
  standalone: true,
  imports: [UploadImageComponent, CommonModule],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center space-y-8">
      <h1 class="text-2xl font-bold">Image Processing Pipeline</h1>
      
      <app-upload-image (imageSelected)="handleImageUpload($event)"></app-upload-image>
      
      <div *ngIf="loading" class="flex items-center justify-center">
        <div class="loader">Loading...</div>
      </div>

      <div *ngIf="processedImageUrl" class="mt-4">
        <h2 class="text-xl font-semibold mb-2">Processed Image:</h2>
        <img [src]="processedImageUrl" alt="Processed Image" class="w-1/2 h-auto rounded border" />
      </div>
    </div>
  `,
  styles: [`
    .loader {
      border: 4px solid #f3f3f3;
      border-radius: 50%;
      border-top: 4px solid #3498db;
      width: 40px;
      height: 40px;
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class ImageProcessingComponent {
  loading = false;
  processedImageUrl: string | null = null;

  constructor(private imageService: ImageService) {}

  handleImageUpload(file: File) {
    this.loading = true;
    this.imageService.processImage(file).subscribe({
      next: (response: { data: any | null; }) => {
        this.processedImageUrl = response.data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error processing image:', error);
        this.loading = false;
      },
    });
  }
}
