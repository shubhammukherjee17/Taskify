export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  status: 'all' | 'completed' | 'pending';
  priority: 'all' | 'low' | 'medium' | 'high';
  category: string;
  dueDate: 'all' | 'today' | 'thisWeek' | 'overdue';
  tags: string[];
}

export interface TaskSort {
  field: 'createdAt' | 'dueDate' | 'priority' | 'title';
  direction: 'asc' | 'desc';
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'SET_FILTER'; payload: Partial<TaskFilter> }
  | { type: 'SET_SORT'; payload: TaskSort };

export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  sort: TaskSort;
}
