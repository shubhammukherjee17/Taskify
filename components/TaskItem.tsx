'use client';

import { motion } from 'framer-motion';
import { Task } from '@/types/task';
import { useTask } from '@/contexts/TaskContext';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onEdit }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTask();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const isOverdue = (dueDate: string | null) => {
    if (!dueDate || task.completed) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <motion.div 
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-l-4 transition-all hover:shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 ${
        task.completed 
          ? 'border-green-500 opacity-75' 
          : isOverdue(task.dueDate)
          ? 'border-red-500'
          : 'border-blue-500'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="mt-1"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
            />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3 
              layout
              className={`text-lg font-semibold transition-all duration-300 ${
                task.completed 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {task.title}
            </motion.h3>
            
            {task.description && (
              <motion.p 
                layout
                className={`mt-2 text-sm leading-relaxed ${
                  task.completed 
                    ? 'text-gray-400 dark:text-gray-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {task.description}
              </motion.p>
            )}
            
            <motion.div 
              layout
              className="mt-3 flex flex-wrap items-center gap-2"
            >
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </motion.span>
              
              {task.category && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  {task.category}
                </motion.span>
              )}
              
              {task.dueDate && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    isOverdue(task.dueDate)
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  📅 {formatDate(task.dueDate)}
                </motion.span>
              )}
            </motion.div>
            
            {task.tags.length > 0 && (
              <motion.div 
                layout
                className="mt-3 flex flex-wrap gap-2"
              >
                {task.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex items-center px-2 py-1 rounded-lg text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 font-medium"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            title="Edit task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => deleteTask(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Delete task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
