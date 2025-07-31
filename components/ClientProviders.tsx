'use client';

import { TaskProvider } from '@/contexts/TaskContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <TaskProvider>
      {children}
    </TaskProvider>
  );
}
