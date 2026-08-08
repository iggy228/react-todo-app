import { useEffect, useMemo, useState } from 'react';
import { PersistentStorage } from '../services/persistent-storage';
import type { Todo, TodoFilterTypes } from '../types';

const storage = new PersistentStorage();
const STORAGE_KEY = 'todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const data = storage.getData<Todo[]>(STORAGE_KEY);
    if (data !== null) {
      return data;
    }
    return [
      {
        id: '1',
        done: false,
        content: 'Ahoj som tvoj prvy task. Odklikni ma a vymaz ma :)',
      },
    ];
  });
  const [newTodo, setNewTodo] = useState<string>('');
  const [filter, setFilter] = useState<TodoFilterTypes>('all');

  useEffect(() => {
    storage.setData(STORAGE_KEY, todos);
  }, [todos]);

  const createTodo = () => {
    if (!newTodo.trim()) return;

    setTodos((prev) => [...prev, { id: crypto.randomUUID(), content: newTodo, done: false }]);
    setNewTodo('');
  };

  const onToggle = (id: string) => {
    setTodos((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const onDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const onEdit = (id: string, content: string) => {
    setTodos((prev) => prev.map((task) => (task.id === id ? { ...task, content: content } : task)));
  };

  const clearDoneTodos = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'complete') {
      return todos.filter((t) => t.done);
    }
    if (filter === 'incomplete') {
      return todos.filter((t) => !t.done);
    }
    return todos;
  }, [filter, todos]);

  return {
    todos,
    newTodo,
    setNewTodo,
    createTodo,
    onToggle,
    onDelete,
    filteredTodos,
    filter,
    setFilter,
    onEdit,
    clearDoneTodos,
  };
}
