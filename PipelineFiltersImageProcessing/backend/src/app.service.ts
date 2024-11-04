/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { GrayService } from './gray/gray.service';
import { ResizeService } from './resize/resize.service';
import { SaveService } from './save/save.service';
import { ValidService } from './valid/valid.service';

@Injectable()
export class AppService {
  constructor(
    private readonly validService: ValidService,
    private readonly grayService: GrayService,
    private readonly resizeService: ResizeService,
    private readonly saveService: SaveService,
  ) {}

  async processImage(file: Express.Multer.File): Promise<any> {
    try {
      let response; 
      response = await this.validService.processImage(file);
      response = await this.grayService.processImage(response);
      response = await this.resizeService.processImage(response);
      response = await this.saveService.processImage({
        ...response,
        filename: file.originalname,
      });
      return {
        status: 200,
        message: 'Image processed successfully',
        data: response,
      }
    } catch (error) {
      console.error('Error in processImage:', error);
      return {
        status: 500,
        message: 'Internal server error' + error,
      };
    }
  }
}
