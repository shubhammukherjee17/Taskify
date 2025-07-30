'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Task, TaskAction, TaskState, TaskFilter, TaskSort } from '@/types/task';

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: Partial<TaskFilter>) => void;
  setSort: (sort: TaskSort) => void;
  filteredAndSortedTasks: Task[];
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
    case 'SET_TASKS': {
      return {
        ...state,
        tasks: action.payload,
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

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const tasks = JSON.parse(savedTasks);
        dispatch({ type: 'SET_TASKS', payload: tasks });
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const setFilter = (filter: Partial<TaskFilter>) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSort = (sort: TaskSort) => {
    dispatch({ type: 'SET_SORT', payload: sort });
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
