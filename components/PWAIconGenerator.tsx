'use client';

import { useEffect } from 'react';

export default function PWAIconGenerator() {
  useEffect(() => {
    const generateIcon = (size: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#8b5cf6');
      
      // Background with rounded corners
      const radius = size * 0.2;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, radius);
      ctx.fill();

      // Draw clipboard icon
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.lineWidth = size * 0.02;
      
      // Clipboard body
      const bodyWidth = size * 0.5;
      const bodyHeight = size * 0.625;
      const bodyX = (size - bodyWidth) / 2;
      const bodyY = size * 0.1875;
      
      ctx.beginPath();
      ctx.roundRect(bodyX, bodyY, bodyWidth, bodyHeight, size * 0.05);
      ctx.stroke();
      
      // Clipboard top
      const topWidth = size * 0.3125;
      const topHeight = size * 0.125;
      const topX = (size - topWidth) / 2;
      const topY = size * 0.125;
      
      ctx.fillRect(topX, topY, topWidth, topHeight);
      
      // Checkmarks
      ctx.lineWidth = size * 0.025;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const checkY1 = size * 0.34375;
      const checkY2 = size * 0.4375;
      const checkY3 = size * 0.53125;
      const checkX1 = size * 0.34375;
      const checkX2 = size * 0.390625;
      const checkX3 = size * 0.46875;
      
      // First checkmark
      ctx.beginPath();
      ctx.moveTo(checkX1, checkY1);
      ctx.lineTo(checkX2, checkY1 + size * 0.046875);
      ctx.lineTo(checkX3, checkY1 - size * 0.078125);
      ctx.stroke();
      
      // Second checkmark
      ctx.beginPath();
      ctx.moveTo(checkX1, checkY2);
      ctx.lineTo(checkX2, checkY2 + size * 0.046875);
      ctx.lineTo(checkX3, checkY2 - size * 0.078125);
      ctx.stroke();
      
      // Third checkmark
      ctx.beginPath();
      ctx.moveTo(checkX1, checkY3);
      ctx.lineTo(checkX2, checkY3 + size * 0.046875);
      ctx.lineTo(checkX3, checkY3 - size * 0.078125);
      ctx.stroke();

      return canvas.toDataURL('image/png');
    };

    // Generate icons and store in localStorage for fallback
    const icon192 = generateIcon(192);
    const icon512 = generateIcon(512);
    const icon180 = generateIcon(180);
    
    if (icon192) localStorage.setItem('pwa-icon-192', icon192);
    if (icon512) localStorage.setItem('pwa-icon-512', icon512);
    if (icon180) localStorage.setItem('pwa-icon-180', icon180);
    
  }, []);

  return null;
}

// Extend CanvasRenderingContext2D to include roundRect if not available
declare global {
  interface CanvasRenderingContext2D {
    roundRect(x: number, y: number, width: number, height: number, radius: number): void;
  }
}

// Polyfill for roundRect if not available
if (typeof window !== 'undefined' && typeof CanvasRenderingContext2D !== 'undefined') {
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x: number, y: number, width: number, height: number, radius: number) {
      this.beginPath();
      this.moveTo(x + radius, y);
      this.lineTo(x + width - radius, y);
      this.quadraticCurveTo(x + width, y, x + width, y + radius);
      this.lineTo(x + width, y + height - radius);
      this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      this.lineTo(x + radius, y + height);
      this.quadraticCurveTo(x, y + height, x, y + height - radius);
      this.lineTo(x, y + radius);
      this.quadraticCurveTo(x, y, x + radius, y);
    };
  }
}
