'use client';

import { motion } from 'framer-motion';
import { useTask } from '@/contexts/TaskContext';
import { TaskFilter, TaskSort } from '@/types/task';

export default function TaskFilters() {
  const { state, setFilter, setSort } = useTask();

  const handleFilterChange = (key: keyof TaskFilter, value: string | string[]) => {
    setFilter({ [key]: value });
  };

  const handleSortChange = (field: TaskSort['field']) => {
    const direction = state.sort.field === field && state.sort.direction === 'asc' ? 'desc' : 'asc';
    setSort({ field, direction });
  };

  const clearFilters = () => {
    setFilter({
      status: 'all',
      priority: 'all',
      category: '',
      dueDate: 'all',
      tags: [],
    });
  };

  const getSortIcon = (field: TaskSort['field']) => {
    if (state.sort.field !== field) return '↕️';
    return state.sort.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-80 mb-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-4 sm:gap-6 items-end">
        {/* Status Filter */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col"
        >
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Status</label>
          <select
            value={state.filter.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 w-full sm:min-w-[120px] touch-manipulation"
          >
            <option value="all">📋 All</option>
            <option value="pending">⏳ Pending</option>
            <option value="completed">✅ Completed</option>
          </select>
        </motion.div>

        {/* Priority Filter */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Priority</label>
          <select
            value={state.filter.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 w-full sm:min-w-[120px] touch-manipulation"
          >
            <option value="all">🎯 All</option>
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </motion.div>

        {/* Due Date Filter */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col"
        >
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Due Date</label>
          <select
            value={state.filter.dueDate}
            onChange={(e) => handleFilterChange('dueDate', e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 w-full sm:min-w-[140px] touch-manipulation"
          >
            <option value="all">📅 All</option>
            <option value="today">📍 Today</option>
            <option value="thisWeek">📆 This Week</option>
            <option value="overdue">⚠️ Overdue</option>
          </select>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col"
        >
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Category</label>
          <input
            type="text"
            value={state.filter.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            placeholder="🏷️ Filter by category"
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 min-w-[160px]"
          />
        </motion.div>

        {/* Clear Filters */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="px-6 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium shadow-sm"
          >
            🔄 Clear Filters
          </motion.button>
        </motion.div>
      </div>

      {/* Sort Options */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">🔍 Sort by:</span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSortChange('createdAt')}
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 font-medium ${
              state.sort.field === 'createdAt'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            📅 Created {getSortIcon('createdAt')}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSortChange('dueDate')}
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 font-medium ${
              state.sort.field === 'dueDate'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            ⏰ Due Date {getSortIcon('dueDate')}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSortChange('priority')}
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 font-medium ${
              state.sort.field === 'priority'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🎯 Priority {getSortIcon('priority')}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSortChange('title')}
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 font-medium ${
              state.sort.field === 'title'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🔤 Title {getSortIcon('title')}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
