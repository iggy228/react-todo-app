import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import type { TodoFilterTypes } from './types';

const FILTER_LABELS: Record<TodoFilterTypes, string> = {
  all: 'All',
  incomplete: 'Incomplete',
  complete: 'Completed',
};

function App() {
  const {
    onDelete,
    onToggle,
    createTodo,
    setNewTodo,
    newTodo,
    filter,
    setFilter,
    filteredTodos,
    onEdit,
    clearDoneTodos,
  } = useTodos();

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <div className="flex flex-col gap-3" style={{ width: '420px', maxWidth: '100%' }}>
          {/* Filter tabs */}
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--code-bg)' }}>
            {(Object.keys(FILTER_LABELS) as TodoFilterTypes[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="flex-1 py-1.5 px-3 rounded-md text-sm transition-all cursor-pointer"
                style={
                  filter === f
                    ? {
                        background: 'var(--bg)',
                        color: 'var(--text-h)',
                        fontWeight: 600,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }
                    : { color: 'var(--text)' }
                }
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>

          {/* Todo list */}
          <TodoList todoList={filteredTodos} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />

          {/* Input row */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createTodo()}
              placeholder="New task..."
              className="flex-1 px-3 py-2 rounded-lg text-sm transition-colors"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                color: 'var(--text-h)',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <button
              type="button"
              onClick={createTodo}
              disabled={!newTodo.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              style={{ background: 'var(--accent)' }}
            >
              Add
            </button>

            <button
              type="button"
              onClick={clearDoneTodos}
              className="px-4 pb-2 pt-4 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              style={{ background: 'var(--accent)' }}
            >
              Clear done todos
            </button>
          </div>
        </div>
      </section>

      <div className="ticks" />
    </>
  );
}

export default App;
