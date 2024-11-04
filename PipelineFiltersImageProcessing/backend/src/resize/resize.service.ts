/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ResizeService {
  async processImage(imageBuffer: Buffer): Promise<Buffer> {
    try {
      const resizedImageBuffer = await sharp(imageBuffer)
        .resize({ width: 300 }) 
        .toBuffer();
      return resizedImageBuffer;
    } catch (error) {
      console.error('Error in resize service processImage:', error);
      throw error;
    }
  }
}
