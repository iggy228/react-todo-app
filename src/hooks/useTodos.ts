import { useEffect, useMemo, useReducer, useState } from 'react';
import { PersistentStorage } from '../services/persistent-storage';
import type { Todo, TodoFilterTypes } from '../types';

const storage = new PersistentStorage();
const STORAGE_KEY = 'todos';

export function useTodos() {
  // reducers
  type Action =
    | { type: 'ADD'; content: string }
    | { type: 'TOGGLE'; id: string }
    | { type: 'DELETE'; id: string }
    | { type: 'EDIT'; id: string; content: string }
    | { type: 'CLEAR_DONE' };

  const todosReducer = (state: Todo[], action: Action) => {
    switch (action.type) {
      case 'ADD':
        return [...state, { id: crypto.randomUUID(), content: newTodo, done: false }];
      case 'DELETE':
        return state.filter((task) => task.id !== action.id);
      case 'TOGGLE':
        return state.map((task) => (task.id === action.id ? { ...task, done: !task.done } : task));
      case 'EDIT':
        return state.map((task) => (task.id === action.id ? { ...task, content: action.content } : task));
      case 'CLEAR_DONE':
        return state.filter((task) => !task.done);
    }
  };

  const getInitialTodos = () => {
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
  };

  const [todos, dispatch] = useReducer(todosReducer, getInitialTodos());
  const [newTodo, setNewTodo] = useState<string>('');
  const [filter, setFilter] = useState<TodoFilterTypes>('all');

  useEffect(() => {
    storage.setData(STORAGE_KEY, todos);
  }, [todos]);

  const createTodo = () => {
    if (!newTodo.trim()) return;

    dispatch({
      type: 'ADD',
      content: newTodo,
    });
    setNewTodo('');
  };

  const onToggle = (id: string) => {
    dispatch({
      type: 'TOGGLE',
      id: id,
    });
  };

  const onDelete = (id: string) => {
    dispatch({
      type: 'DELETE',
      id: id,
    });
  };

  const onEdit = (id: string, content: string) => {
    dispatch({
      type: 'EDIT',
      id: id,
      content: content,
    });
  };

  const clearDoneTodos = () => {
    dispatch({
      type: 'CLEAR_DONE',
    });
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
