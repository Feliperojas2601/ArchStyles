export interface Task {
    id: number;
    name: string;
    completed: boolean;
}

export interface CreateTaskInput {
    name: string;
    completed: boolean;
}
  