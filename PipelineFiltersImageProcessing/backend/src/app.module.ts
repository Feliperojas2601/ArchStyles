/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidModule } from './valid/valid.module';
import { GrayModule } from './gray/gray.module';
import { ResizeModule } from './resize/resize.module';
import { SaveModule } from './save/save.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ValidModule, GrayModule, ResizeModule, SaveModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'tasksdb',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, 
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
