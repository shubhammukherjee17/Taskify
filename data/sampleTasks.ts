import { Task } from '@/types/task';

// Sample data for localStorage
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the new features",
    completed: false,
    priority: "high" as const,
    category: "Work",
    tags: ["documentation", "project"],
    dueDate: "2025-08-05",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2", 
    title: "Buy groceries",
    description: "Get milk, bread, eggs, and vegetables",
    completed: false,
    priority: "medium" as const,
    category: "Personal",
    tags: ["shopping", "food"],
    dueDate: "2025-08-01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Exercise routine",
    description: "30 minutes of cardio and strength training",
    completed: true,
    priority: "medium" as const,
    category: "Health",
    tags: ["fitness", "health"],
    dueDate: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Review quarterly reports",
    description: "Analyze Q2 performance metrics and prepare presentation",
    completed: false,
    priority: "high" as const,
    category: "Work",
    tags: ["analysis", "reports", "presentation"],
    dueDate: "2025-08-03",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Plan weekend trip",
    description: "Research destinations and book accommodations",
    completed: false,
    priority: "low" as const,
    category: "Personal",
    tags: ["travel", "planning"],
    dueDate: "2025-08-10",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

console.log('Sample tasks ready to be loaded:', sampleTasks);

// Save to localStorage if running in browser
if (typeof window !== 'undefined' && window.localStorage) {
  localStorage.setItem('tasks', JSON.stringify(sampleTasks));
  console.log('Sample tasks saved to localStorage');
}

export default sampleTasks;
