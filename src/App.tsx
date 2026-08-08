import React from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, onDelete, onToggle, createTodo, setNewTodo, newTodo } = useTodos();

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setNewTodo(val);
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
          <TodoList todoList={todos} onToggle={onToggle} onDelete={onDelete} />
          <input
            className="border-blue bg-white mt-4"
            type="text"
            value={newTodo}
            onChange={onInputChanged}
            placeholder="type here your task :)"
          />
          <button type="button" className="counter mt-4 text-center" onClick={createTodo} disabled={!newTodo.trim()}>
            Add task
          </button>
        </div>
      </section>

      <div className="ticks"></div>
    </>
  );
}

export default App;
