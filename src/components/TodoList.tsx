import type { Todo } from '../types';

export function TodoList(props: { todoList: Todo[] }) {
  return (
    <div className="flex flex-col">
      {props.todoList.map((todo) => (
        <div className="flex">
          <input className="mr-2" type="checkbox" name={`todo-${todo.id}`} value={todo.done ? 1 : 0} />
          <p>{todo.content}</p>
        </div>
      ))}
    </div>
  );
}
