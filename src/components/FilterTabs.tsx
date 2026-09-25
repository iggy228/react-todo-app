import type { TodoFilterTypes } from '../types';

const FILTER_LABELS: Record<TodoFilterTypes, string> = {
  all: 'All',
  incomplete: 'Incomplete',
  complete: 'Completed',
};

interface FilterTabsProps {
  filter: TodoFilterTypes;
  onFilterChange: (filter: TodoFilterTypes) => void;
}

export function FilterTabs({ filter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--code-bg)' }}>
      {(Object.keys(FILTER_LABELS) as TodoFilterTypes[]).map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className="flex-1 py-1.5 px-3 rounded-md text-sm transition-all cursor-pointer"
          style={
            filter === f
              ? {
                  background: 'var(--bg)',
                  color: 'var(--text-h)',
                  fontWeight: 600,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }
              : { color: 'var(--text)' }
          }
        >
          {FILTER_LABELS[f]}
        </button>
      ))}
    </div>
  );
}
