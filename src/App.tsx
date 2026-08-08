import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import { TodoList } from './components/TodoList';
import type { Todo } from './types';

function App() {
  const [id, setId] = useState(2);
  const [tasks, setTasks] = useState<Todo[]>([
    {
      id: 1,
      done: false,
      content: 'Ahoj som tvoj prvy task',
    },
  ]);
  const [newTaskVal, setNewTaskVal] = useState<string>('');

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setNewTaskVal(val);
  };

  const createNewTodo = () => {
    if (!newTaskVal.trim()) return;

    setTasks((prev) => [...prev, { id: id, content: newTaskVal, done: false }]);
    setId((prevId) => prevId + 1);
    setNewTaskVal('');
  };

  const onToggle = (id: number) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const onDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div className="min-w-md flex flex-col ">
          <TodoList todoList={tasks} onToggle={onToggle} onDelete={onDelete} />
          <input className="border-blue bg-white mt-4" type="text" value={newTaskVal} onChange={onInputChanged} />
          <button
            type="button"
            className="counter mt-4 text-center"
            onClick={createNewTodo}
            disabled={!newTaskVal.trim()}
          >
            Add task
          </button>
        </div>
      </section>

      <div className="ticks"></div>
    </>
  );
}

export default App;
