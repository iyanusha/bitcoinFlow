"use client";
import { useState } from 'react';
interface Stake_optimizerP1Props { title?: string; data?: Record<string, number>; onAction?: () => void; }
export function Stake_optimizerP1({ title = 'Add stake optimization tools', data, onAction }: Stake_optimizerP1Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <button onClick={() => setExpanded(!expanded)} className="text-xs text-primary-600 hover:text-primary-700">
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {expanded && data && <pre className="text-xs text-gray-500 mt-2">{JSON.stringify(data, null, 2)}</pre>}
      {onAction && <button onClick={onAction} className="mt-3 text-xs px-3 py-1 bg-primary-600 text-white rounded-lg">Action</button>}
    </div>
  );
}
