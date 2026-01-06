import type { Todo } from '../api/useTodos';
import { TodoItem } from './TodoItem';
import { AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';

interface TodoListProps {
    todos: Todo[];
    isLoading: boolean;
}

export function TodoList({ todos, isLoading }: TodoListProps) {
    if (isLoading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 animate-pulse rounded-lg bg-zinc-100" />
                ))}
            </div>
        );
    }

    if (todos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50">
                    <FileText className="h-8 w-8 text-zinc-300" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900">No tasks yet</h3>
                <p className="mt-1 text-sm text-zinc-500">
                    Add a new task to get started on your day.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <AnimatePresence mode='popLayout'>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </AnimatePresence>
        </div>
    );
}
