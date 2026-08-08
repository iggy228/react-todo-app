import type { Todo } from '../types';
import { TodoListRow } from './TodoListRow';

export interface TodoListProps {
  todoList: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, val: string) => void;
}

export function TodoList(props: TodoListProps) {
  if (props.todoList.length === 0) {
    return (
      <div
        className="flex items-center justify-center py-10 rounded-xl text-sm"
        style={{ border: '1px dashed var(--border)', color: 'var(--text)' }}
      >
        No tasks here.
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      {props.todoList.map((todo) => (
        <TodoListRow
          key={todo.id}
          todo={todo}
          onDelete={props.onDelete}
          onToggle={props.onToggle}
          onEdit={props.onEdit}
        />
      ))}
    </div>
  );
}
