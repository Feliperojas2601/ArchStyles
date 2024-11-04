/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './models/image.model';
import { Repository } from 'typeorm';

@Injectable()
export class SaveService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  
  async processImage(response: any): Promise<any> {
    try {
      if (!response || !response.data) {
        throw new Error('No image data found to save');
      }
      const newImage = this.imageRepository.create({
        data: response.data,
        filename: response.filename + '_processed_' + new Date().getTime(),
      });
      await this.imageRepository.save(newImage);
      console.log('Image saved successfully');
      return newImage;
    } catch (error) {
      console.error('Error in save service processImage:', error);
      throw error;
    }
  }
}
