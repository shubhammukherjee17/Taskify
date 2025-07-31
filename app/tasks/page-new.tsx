/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTask } from '@/contexts/TaskContext';
import { TasksLoading, TasksError } from '@/components/LoadingSpinner';
import TaskForm from '@/components/TaskForm';
import TaskFilters from '@/components/TaskFilters';
import TaskStats from '@/components/TaskStats';
import DarkModeToggle from '@/components/DarkModeToggle';

function TasksPage() {
  const { 
    state, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleTask, 
    filteredAndSortedTasks,
    loading,
    error,
    refetchTasks
  } = useTask();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tasks by search query
  const searchFilteredTasks = filteredAndSortedTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddTask = async (taskData: any) => {
    await addTask(taskData);
    setShowAddForm(false);
  };

  const handleUpdateTask = async (id: string, updates: any) => {
    await updateTask(id, updates);
    setEditingTask(null);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  const handleToggleTask = async (id: string) => {
    await toggleTask(id);
  };

  const categories = ['Work', 'Personal', 'Health', 'Learning', 'Development', 'Other'];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Work: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      Personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      Health: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      Learning: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      Development: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
      Other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    };
    return colors[category as keyof typeof colors] || colors.Other;
  };

  const isOverdue = (dueDate: string): boolean => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  // Computed values
  const completedCount = state.tasks.filter(t => t.completed).length;
  const pendingCount = state.tasks.filter(t => !t.completed).length;
  const highPriorityCount = state.tasks.filter(t => t.priority === 'high' && !t.completed).length;

  if (loading && state.tasks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        <TasksLoading />
      </div>
    );
  }

  if (error && state.tasks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        <TasksError error={error} onRetry={refetchTasks} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </motion.div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 dark:from-white dark:to-blue-100 bg-clip-text text-transparent">
                  Taskify
                </h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar - Desktop */}
              <div className="hidden sm:block relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-64 pl-10 pr-4 py-2 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <DarkModeToggle />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add Task</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="mt-4 sm:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Task Stats */}
        <TaskStats />

        {/* Task Filters */}
        <TaskFilters />

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-red-800 dark:text-red-200 text-sm">{error}</span>
              <button
                onClick={refetchTasks}
                className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm underline"
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}

        {/* Tasks List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 overflow-hidden"
        >
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                Your Tasks {searchFilteredTasks.length > 0 && (
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                    ({searchFilteredTasks.length} {searchFilteredTasks.length === 1 ? 'task' : 'tasks'})
                  </span>
                )}
              </h2>
              
              {loading && (
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <div className="w-4 h-4 border-2 border-slate-300 dark:border-slate-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
                  <span className="text-sm">Syncing...</span>
                </div>
              )}
            </div>

            {searchFilteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">No tasks found</h3>
                <p className="text-slate-500 dark:text-slate-500 mb-4">
                  {searchQuery ? 'Try adjusting your search or filters' : 'Create your first task to get started'}
                </p>
                {!searchQuery && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddForm(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Create your first task
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {searchFilteredTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`group p-4 lg:p-5 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer ${
                        task.completed
                          ? 'bg-green-50/80 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30'
                          : 'bg-slate-50/80 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-700/80'
                      }`}
                      onDoubleClick={() => editingTask !== task.id && setEditingTask(task.id)}
                    >
                      <div className="flex items-start space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleToggleTask(task.id)}
                          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            task.completed
                              ? 'bg-green-500 border-green-500 shadow-lg'
                              : 'border-slate-300 dark:border-slate-500 hover:border-green-400 group-hover:border-green-500'
                          }`}
                        >
                          {task.completed && (
                            <motion.svg 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 text-white" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </motion.button>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className={`font-semibold text-lg transition-all duration-300 ${
                                task.completed
                                  ? 'text-green-700 dark:text-green-300 line-through opacity-75'
                                  : 'text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                              }`}>
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className={`text-sm mt-1 transition-all duration-300 leading-relaxed ${
                                  task.completed
                                    ? 'text-green-600 dark:text-green-400 line-through opacity-75'
                                    : 'text-slate-600 dark:text-slate-400'
                                }`}>
                                  {task.description}
                                </p>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingTask(task.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteTask(task.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </motion.button>
                            </div>
                          </div>
                          
                          <div className="flex items-center flex-wrap gap-2 mt-3">
                            <motion.span 
                              whileHover={{ scale: 1.05 }}
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                task.priority === 'high'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800'
                                  : task.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                task.priority === 'high' ? 'bg-red-500' : 
                                task.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`} />
                              {task.priority} priority
                            </motion.span>
                            
                            {task.category && (
                              <motion.span 
                                whileHover={{ scale: 1.05 }}
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}
                              >
                                {task.category}
                              </motion.span>
                            )}
                            
                            {task.dueDate && (
                              <motion.span 
                                whileHover={{ scale: 1.05 }}
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  isOverdue(task.dueDate) && !task.completed
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800'
                                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                                }`}
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {isOverdue(task.dueDate) && !task.completed ? 'Overdue' : 'Due'}: {new Date(task.dueDate).toLocaleDateString()}
                              </motion.span>
                            )}

                            {task.tags && task.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {task.tags.map((tag, tagIndex) => (
                                  <motion.span
                                    key={tagIndex}
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                  >
                                    #{tag}
                                  </motion.span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Task Form Modals */}
      <AnimatePresence>
        {showAddForm && (
          <TaskForm
            onClose={() => setShowAddForm(false)}
          />
        )}
        
        {editingTask && (
          <TaskForm
            task={state.tasks.find(t => t.id === editingTask)}
            onClose={() => setEditingTask(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default TasksPage;
