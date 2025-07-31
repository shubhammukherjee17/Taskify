import { Task } from '@/types/task';

const API_BASE_URL = '/api/tasks';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Get all tasks
export async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch(API_BASE_URL);
    const result: ApiResponse<Task[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch tasks');
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

// Create a new task
export async function createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    const result: ApiResponse<Task> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create task');
    }
    
    return result.data!;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// Update a task
export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    const result: ApiResponse<Task> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update task');
    }
    
    return result.data!;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

// Delete a task
export async function deleteTask(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    const result: ApiResponse<null> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

// Toggle task completion
export async function toggleTaskCompletion(id: string, completed: boolean): Promise<Task> {
  return updateTask(id, { completed });
}
