/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidService {
  async processImage(file: Express.Multer.File): Promise<any> {
    try {
        if (!file) {
            throw new Error('No file found');
        }
        return file;
    } catch (error) {
        console.error('Error in valid service processImage:', error);
        throw error;
    }
  }
}
