/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SaveService } from './save.service';
import { Image } from './models/image.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [SaveService], 
  exports: [SaveService],
})
export class SaveModule {}
