'use client';

import { useTask } from '@/contexts/TaskContext';
import { loadSampleData } from '@/utils/taskUtils';

export default function SampleDataLoader() {
  const { state, dispatch } = useTask();

  const handleLoadSampleData = () => {
    const sampleTasks = loadSampleData();
    dispatch({ type: 'SET_TASKS', payload: sampleTasks });
  };

  const handleClearAllTasks = () => {
    localStorage.removeItem('tasks');
    dispatch({ type: 'SET_TASKS', payload: [] });
  };

  if (state.tasks.length > 0) {
    return (
      <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              You have {state.tasks.length} task(s) in your list.
            </p>
          </div>
          <button
            onClick={handleClearAllTasks}
            className="text-sm bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-3 py-1 rounded-md hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
          >
            Clear All Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Welcome to Task Manager!
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
            Start by adding your first task or load some sample data to explore the features.
          </p>
        </div>
        <button
          onClick={handleLoadSampleData}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
        >
          Load Sample Data
        </button>
      </div>
    </div>
  );
}
