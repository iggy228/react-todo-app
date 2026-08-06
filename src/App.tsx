import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import { TodoList } from './components/TodoList';
import type { Todo } from './types';

function App() {
  let id = 2;
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
    const newTasks = [...tasks, { id: id++, content: newTaskVal, done: false }];
    setTasks(newTasks);
    setNewTaskVal('');
  };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <TodoList todoList={tasks} />
        <input className="border-blue bg-white" type="text" value={newTaskVal} onChange={onInputChanged} />
        <button type="button" className="counter" onClick={createNewTodo}>
          Add task
        </button>
      </section>

      <div className="ticks"></div>
    </>
  );
}

export default App;
