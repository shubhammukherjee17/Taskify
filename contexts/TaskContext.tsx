'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useState } from 'react';
import { Task, TaskAction, TaskState, TaskFilter, TaskSort } from '@/types/task';
import * as api from '@/lib/api';
import sampleTasks from '@/data/sampleTasks';

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  setFilter: (filter: Partial<TaskFilter>) => void;
  setSort: (sort: TaskSort) => void;
  filteredAndSortedTasks: Task[];
  loading: boolean;
  error: string | null;
  refetchTasks: () => Promise<void>;
} | null>(null);

const initialState: TaskState = {
  tasks: [],
  filter: {
    status: 'all',
    priority: 'all',
    category: '',
    dueDate: 'all',
    tags: [],
  },
  sort: {
    field: 'createdAt',
    direction: 'desc',
  },
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASKS': {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    case 'ADD_TASK': {
      const newTask: Task = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }
    case 'UPDATE_TASK': {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : task
        ),
      };
    }
    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    }
    case 'TOGGLE_TASK': {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
            : task
        ),
      };
    }
    case 'SET_FILTER': {
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };
    }
    case 'SET_SORT': {
      return {
        ...state,
        sort: action.payload,
      };
    }
    default:
      return state;
  }
}

// Helper functions for filtering and sorting
function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  return tasks.filter(task => {
    // Status filter
    if (filter.status === 'completed' && !task.completed) return false;
    if (filter.status === 'pending' && task.completed) return false;

    // Priority filter
    if (filter.priority !== 'all' && task.priority !== filter.priority) return false;

    // Category filter
    if (filter.category && task.category !== filter.category) return false;

    // Due date filter
    if (filter.dueDate !== 'all' && task.dueDate) {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      switch (filter.dueDate) {
        case 'today':
          if (dueDate.toDateString() !== today.toDateString()) return false;
          break;
        case 'thisWeek':
          if (dueDate > oneWeekFromNow) return false;
          break;
        case 'overdue':
          if (dueDate >= today || task.completed) return false;
          break;
      }
    }

    // Tags filter
    if (filter.tags.length > 0) {
      const hasMatchingTag = filter.tags.some(tag => task.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }

    return true;
  });
}

function sortTasks(tasks: Task[], sort: TaskSort): Task[] {
  return [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sort.field) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) comparison = 0;
        else if (!a.dueDate) comparison = 1;
        else if (!b.dueDate) comparison = -1;
        else comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case 'priority':
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
    }

    return sort.direction === 'asc' ? comparison : -comparison;
  });
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from localStorage first, then try to sync with MongoDB
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load from localStorage first
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        try {
          const tasks = JSON.parse(savedTasks);
          dispatch({ type: 'SET_TASKS', payload: tasks });
        } catch (parseError) {
          console.error('Error parsing localStorage tasks:', parseError);
        }
      } else {
        // If no saved tasks, load sample data
        dispatch({ type: 'SET_TASKS', payload: sampleTasks });
        localStorage.setItem('tasks', JSON.stringify(sampleTasks));
      }
      
      // Try to sync with API as an enhancement (don't block if it fails)
      try {
        const tasks = await api.fetchTasks();
        dispatch({ type: 'SET_TASKS', payload: tasks });
      } catch (apiErr) {
        // Silent fail - localStorage is our primary storage
        console.log('API not available, using localStorage. Error:', apiErr);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load tasks';
      setError(errorMessage);
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Save tasks to localStorage as backup whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      
      // Always update local state first
      dispatch({ type: 'ADD_TASK', payload: task });
      
      // Try to sync with API as enhancement
      try {
        await api.createTask(task);
      } catch (apiErr) {
        console.log('API sync failed for new task, continuing with localStorage:', apiErr);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      setError(errorMessage);
      console.error('Error creating task:', err);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      setError(null);
      
      // Always update local state first
      dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
      
      // Try to sync with API as enhancement
      try {
        await api.updateTask(id, updates);
      } catch (apiErr) {
        console.log('API sync failed for task update, continuing with localStorage:', apiErr);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      
      // Always update local state first
      dispatch({ type: 'DELETE_TASK', payload: id });
      
      // Try to sync with API as enhancement
      try {
        await api.deleteTask(id);
      } catch (apiErr) {
        console.log('API sync failed for task deletion, continuing with localStorage:', apiErr);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      setError(errorMessage);
      console.error('Error deleting task:', err);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      setError(null);
      const task = state.tasks.find((t: Task) => t.id === id);
      if (!task) return;
      
      // Always update local state first
      dispatch({ type: 'TOGGLE_TASK', payload: id });
      
      // Try to sync with API as enhancement
      try {
        await api.toggleTaskCompletion(id, !task.completed);
      } catch (apiErr) {
        console.log('API sync failed for task toggle, continuing with localStorage:', apiErr);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle task';
      setError(errorMessage);
      console.error('Error toggling task:', err);
    }
  };

  const setFilter = (filter: Partial<TaskFilter>) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSort = (sort: TaskSort) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  const refetchTasks = async () => {
    await fetchTasks();
  };

  const filteredAndSortedTasks = sortTasks(filterTasks(state.tasks, state.filter), state.sort);

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        setFilter,
        setSort,
        filteredAndSortedTasks,
        loading,
        error,
        refetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
