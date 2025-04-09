'use client';

import { useEffect, useRef } from 'react';

const TreeFractal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawTree = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    len: number,
    angle: number,
    depth: number
  ) => {
    if (depth === 0) return;

    const endX = startX + len * Math.cos(angle);
    const endY = startY - len * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = `hsl(${120 + depth * 20}, 100%, ${30 + depth * 3}%)`;
    ctx.lineWidth = depth * 0.5;
    ctx.stroke();

    // Recursive branches
    drawTree(ctx, endX, endY, len * 0.7, angle + 0.5, depth - 1);
    drawTree(ctx, endX, endY, len * 0.7, angle - 0.5, depth - 1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the tree
    const startX = canvas.width / 2;
    const startY = canvas.height - 50;
    const length = 120;
    const angle = Math.PI / 2; // 90 degrees
    const depth = 9;

    drawTree(ctx, startX, startY, length, angle, depth);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <canvas
        ref={canvasRef}
        className="border border-gray-700 rounded-lg shadow-lg"
      />
    </div>
  );
};

export default TreeFractal; 