import { Component } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  processedImageUrl: SafeUrl | null = null;

  constructor(private imageService: ImageService, private domSanitizer: DomSanitizer) {}

  handleImageUpload(file: File) {
    this.loading = true;
    this.imageService.processImage(file).subscribe({
      next: (response: any) => {
        const processedImageBuffer = response.data.data.data;
        console.log('Processed image buffer:', processedImageBuffer);
        if (!processedImageBuffer) {
          console.error('Error processing image: No data returned');
          this.loading = false;
          return;
        }
        const typedArray = new Uint8Array(processedImageBuffer);
        const stringChar = typedArray.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');
        const base64String = btoa(stringChar);
        this.processedImageUrl = this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64String}`);
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error processing image:', error);
        this.loading = false;
      },
    });
  }
}
