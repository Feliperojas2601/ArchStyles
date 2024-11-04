/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ResizeService } from './resize.service';

@Module({
  providers: [ResizeService], 
  exports: [ResizeService],
})
export class ResizeModule {}
