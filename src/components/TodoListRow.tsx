import React, { useState } from 'react';
import type { Todo } from '../types';

export interface TodoRowProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, val: string) => void;
}

export function TodoListRow(props: TodoRowProps) {
  const [inlineEdit, setInlineEdit] = useState(false);
  const toggleLabeltoInput = () => {
    setInlineEdit((prev) => !prev);
  };

  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onEdit(props.todo.id, e.target.value);
  };

  return (
    <div
      className="flex items-center justify-between px-4 py-3 transition-colors group"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          aria-label={props.todo.content}
          checked={props.todo.done}
          onChange={() => props.onToggle(props.todo.id)}
          className="w-4 h-4 shrink-0 cursor-pointer"
          style={{ accentColor: 'var(--accent)' }}
        />
        {inlineEdit ? (
          <div className="flex flex-1">
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-lg text-sm transition-colors"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                color: 'var(--text-h)',
                outline: 'none',
              }}
              autoFocus
              value={props.todo.content}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={toggleLabeltoInput}
              onKeyDown={(e) => e.key === 'Enter' && toggleLabeltoInput()}
              onChange={onContentChanged}
            />
            <button className="ml-4" onClick={toggleLabeltoInput}>
              Confirm
            </button>
          </div>
        ) : (
          <label
            className="cursor-pointer select-none text-sm truncate transition-all"
            style={
              props.todo.done
                ? { textDecoration: 'line-through', color: 'var(--text)', opacity: 0.5 }
                : { color: 'var(--text-h)' }
            }
            onDoubleClick={toggleLabeltoInput}
          >
            {props.todo.content}
          </label>
        )}
      </div>

      {props.todo.done && !inlineEdit && (
        <button
          onClick={() => props.onDelete(props.todo.id)}
          className="ml-3 shrink-0 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          style={{ color: '#ef4444' }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
