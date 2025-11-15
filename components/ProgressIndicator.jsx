'use client';

export default function ProgressIndicator({ completed = 0, total = 5 }) {
  const percentage = (completed / total) * 100;

  return (
    <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-40">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-mono text-pink-300">
          Progress: {completed}/{total}
        </span>
        <span className="text-xs text-pink-400/60">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-1 bg-black/30 rounded-full border border-pink-500/30 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
