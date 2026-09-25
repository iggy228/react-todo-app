import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import { TodoList } from './components/TodoList';
import { FilterTabs } from './components/FilterTabs';
import { useTodos } from './hooks/useTodos';

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

        <div className="flex flex-col gap-3" style={{ width: '640px', maxWidth: '100%' }}>
          {/* Filter tabs */}
          <FilterTabs filter={filter} onFilterChange={setFilter} />

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
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
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
