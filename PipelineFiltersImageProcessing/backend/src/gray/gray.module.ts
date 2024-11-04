/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GrayService } from './gray.service';

@Module({
  providers: [GrayService], 
  exports: [GrayService],
})
export class GrayModule {}
