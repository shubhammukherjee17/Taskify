'use client';

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
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Status Filter */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</label>
          <select
            value={state.filter.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-1">Priority</label>
          <select
            value={state.filter.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Due Date Filter */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-1">Due Date</label>
          <select
            value={state.filter.dueDate}
            onChange={(e) => handleFilterChange('dueDate', e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-1">Category</label>
          <input
            type="text"
            value={state.filter.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            placeholder="Filter by category"
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Clear Filters */}
        <div className="flex flex-col justify-end">
          <button
            onClick={clearFilters}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
          
          <button
            onClick={() => handleSortChange('createdAt')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              state.sort.field === 'createdAt'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Created {getSortIcon('createdAt')}
          </button>
          
          <button
            onClick={() => handleSortChange('dueDate')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              state.sort.field === 'dueDate'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Due Date {getSortIcon('dueDate')}
          </button>
          
          <button
            onClick={() => handleSortChange('priority')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              state.sort.field === 'priority'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Priority {getSortIcon('priority')}
          </button>
          
          <button
            onClick={() => handleSortChange('title')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              state.sort.field === 'title'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Title {getSortIcon('title')}
          </button>
        </div>
      </div>
    </div>
  );
}
