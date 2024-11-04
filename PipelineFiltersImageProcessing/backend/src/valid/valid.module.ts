/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ValidService } from './valid.service';

@Module({
  providers: [ValidService], 
  exports: [ValidService],
})
export class ValidModule {}
