import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <button type="button" className="counter" onClick={() => setTasks((count) => count + 1)}>
          Count is {tasks}
        </button>
      </section>

      <div className="ticks"></div>
    </>
  );
}

export default App;
