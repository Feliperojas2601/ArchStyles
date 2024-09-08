import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../types/task.type';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  updateTask() {
    this.taskService.updateTask(this.task).subscribe(); 
  }

  delete() {
    this.taskService.deleteTask(this.task.id).subscribe(() => {
      this.deleteTask.emit(this.task); 
    });
  }
}
