import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { ImageProcessingComponent } from './components/image-processing/image-processing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImageProcessingComponent, UploadImageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
