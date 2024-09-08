/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../types/task.type';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}*/

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../types/task.type';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, name: 'Task 1', completed: false },
    { id: 2, name: 'Task 2', completed: true },
    { id: 3, name: 'Task 3', completed: false }
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  updateTask(task: Task): Observable<Task> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
    return of(task);
  }

  deleteTask(id: number): Observable<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of();
  }

  addTask(taskName: string): Observable<Task> {
    const newTask: Task = {
      id: this.tasks.length + 1,
      name: taskName,
      completed: false
    };
    this.tasks.push(newTask);
    return of(newTask);
  }

  removeAllTasks(): Observable<void> {
    this.tasks = [];
    return of();
  }
}
