import type { Todo } from '../types';

export interface TodoListProps {
  todoList: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList(props: TodoListProps) {
  return (
    <div className="flex flex-col">
      {props.todoList.map((todo) => (
        <div key={todo.id} className="flex justify-between">
          <div className="flex">
            <input
              className="mr-2"
              type="checkbox"
              id={`todo-${todo.id}`}
              value={todo.id}
              checked={todo.done}
              onChange={() => props.onToggle(todo.id)}
            />
            <label htmlFor={`todo-${todo.id}`} className={todo.done ? 'line-through' : ''}>
              {todo.content}
            </label>
          </div>

          {todo.done ? (
            <button className="text-red-500 cursor-pointer" onClick={() => props.onDelete(todo.id)}>
              Delete
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
