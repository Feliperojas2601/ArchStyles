import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../types/task.type';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask(taskName: string) {
    const newTask: Task = { id: this.tasks.length + 1, name: taskName, completed: false };
    this.taskService.updateTask(newTask).subscribe(task => this.tasks.push(task));
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  removeAllTasks() {
    this.tasks.forEach(task => this.taskService.deleteTask(task.id).subscribe());
    this.tasks = [];
  }
}
