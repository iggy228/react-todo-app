import { useEffect, useState } from 'react';
import { PersistentStorage } from '../services/persistent-storage';
import type { Todo } from '../types';

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

  return {
    todos,
    newTodo,
    setNewTodo,
    createTodo,
    onToggle,
    onDelete,
  };
}
