'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Taskify: Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.log('Taskify: Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
}
