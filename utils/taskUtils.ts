import { Task } from '@/types/task';

export const sampleTasks: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Complete project proposal',
    description: 'Write and review the project proposal for the new client',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    category: 'Work',
    tags: ['urgent', 'client', 'proposal'],
  },
  {
    title: 'Buy groceries',
    description: 'Get milk, bread, eggs, and fruits from the supermarket',
    completed: false,
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0], // Today
    category: 'Personal',
    tags: ['shopping', 'food'],
  },
  {
    title: 'Review code changes',
    description: 'Review the pull request for the authentication module',
    completed: true,
    priority: 'medium',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    category: 'Work',
    tags: ['development', 'review'],
  },
  {
    title: 'Exercise workout',
    description: '30 minutes cardio and strength training',
    completed: false,
    priority: 'low',
    dueDate: null,
    category: 'Health',
    tags: ['fitness', 'health'],
  },
  {
    title: 'Team meeting preparation',
    description: 'Prepare agenda and materials for weekly team meeting',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago (overdue)
    category: 'Work',
    tags: ['meeting', 'preparation', 'team'],
  },
];

export const loadSampleData = () => {
  const existingTasks = localStorage.getItem('tasks');
  if (!existingTasks || JSON.parse(existingTasks).length === 0) {
    const tasksWithIds = sampleTasks.map(task => ({
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasksWithIds));
    return tasksWithIds;
  }
  return JSON.parse(existingTasks);
};

export const formatDate = (date: string | null): string => {
  if (!date) return 'No due date';
  
  const today = new Date();
  const targetDate = new Date(date);
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1) return `In ${diffDays} days`;
  if (diffDays < -1) return `${Math.abs(diffDays)} days overdue`;
  
  return targetDate.toLocaleDateString();
};

export const getPriorityWeight = (priority: 'low' | 'medium' | 'high'): number => {
  switch (priority) {
    case 'low': return 1;
    case 'medium': return 2;
    case 'high': return 3;
    default: return 0;
  }
};

export const isTaskOverdue = (task: Task): boolean => {
  if (!task.dueDate || task.completed) return false;
  return new Date(task.dueDate) < new Date();
};

export const getTasksStats = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const overdue = tasks.filter(isTaskOverdue).length;
  
  const byPriority = tasks.reduce((acc, task) => {
    if (!task.completed) {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const byCategory = tasks.reduce((acc, task) => {
    if (task.category) {
      acc[task.category] = (acc[task.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total,
    completed,
    pending,
    overdue,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    byPriority,
    byCategory,
  };
};
