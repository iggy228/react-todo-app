# My Todo App

A todo list app built with React 19, TypeScript, and Tailwind CSS 4.

## Features

- Add, edit (double-click), and delete todos
- Check off todos to mark them as done
- Filter by All / Incomplete / Completed
- Clear all completed todos
- Persisted to `localStorage` — survives page refresh
- Dark mode support

## Tech stack

- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Vite 8](https://vitejs.dev)

## Project structure

```
src/
├── components/
│   ├── TodoList.tsx       # List container, empty state
│   └── TodoListRow.tsx    # Single todo row with inline edit
├── hooks/
│   └── useTodos.ts        # All todo state and logic
├── services/
│   └── persistent-storage.ts  # localStorage wrapper
├── types/
│   └── index.ts           # Todo, TodoFilterTypes
└── App.tsx                # Layout, filter tabs, input
```

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server                    |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview production build locally    |
| `npm run lint`    | Run Oxlint                          |
