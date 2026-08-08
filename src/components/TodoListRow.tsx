import { useState } from 'react';
import type { Todo } from '../types';

export interface TodoRowProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, val: string) => void;
}

export function TodoListRow(props: TodoRowProps) {
  const [inlineEdit, setInlineEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.todo.content);

  const confirm = () => {
    const trimmed = editValue.trim();
    if (trimmed) {
      props.onEdit(props.todo.id, trimmed);
    } else {
      setEditValue(props.todo.content);
    }
    setInlineEdit(false);
  };

  const cancel = () => {
    setEditValue(props.todo.content);
    setInlineEdit(false);
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
              autoFocus
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirm();
                if (e.key === 'Escape') cancel();
              }}
              onBlur={confirm}
              className="flex-1 px-3 py-2 rounded-lg text-sm transition-colors"
              style={{
                border: '1px solid var(--accent)',
                background: 'var(--bg)',
                color: 'var(--text-h)',
                outline: 'none',
              }}
            />
            <button
              className="ml-4 text-sm cursor-pointer"
              style={{ color: 'var(--text)' }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={cancel}
            >
              Cancel
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
            onDoubleClick={() => {
              setEditValue(props.todo.content);
              setInlineEdit(true);
            }}
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
