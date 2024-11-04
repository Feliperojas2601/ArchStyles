/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class GrayService {
  async processImage(file: Express.Multer.File): Promise<Buffer> {
    try {
      const imageBuffer = file.buffer;
      const grayImageBuffer = await sharp(imageBuffer)
        .grayscale()
        .toBuffer();
      return grayImageBuffer;
    } catch (error) {
      console.error('Error in gray service processImage:', error);
      throw error;
    }
  }
}
