/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: string): Promise<Task> {
    return this.tasksRepository.findOneBy({ id: +id });
  }

  create(task: Task): Promise<Task> {
    return this.tasksRepository.save(task);
  }

  async update(id: string, task: Task): Promise<Task> {
    await this.tasksRepository.update(id, task);
    return this.tasksRepository.findOneBy({ id: +id });
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
