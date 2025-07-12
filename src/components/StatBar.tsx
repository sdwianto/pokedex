// src/components/StatBar.tsx
import React from 'react';

interface StatBarProps {
  value: number;
}

const StatBar: React.FC<StatBarProps> = ({ value }) => {
  let barColor = '';

  if (value <= 40) {
    barColor = 'bg-red-500';
  } else if (value <= 69) {
    barColor = 'bg-yellow-400';
  } else {
    barColor = 'bg-green-500';
  }

  return (
    <div className='h-3 gap-4 overflow-hidden rounded bg-gray-200'>
      <div
        className={`${barColor} h-3 rounded transition-all duration-300`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
};

export default StatBar;
