export interface Todo {
  id: string;
  done: boolean;
  content: string;
}

export type TodoFilterTypes = 'all' | 'incomplete' | 'complete';
