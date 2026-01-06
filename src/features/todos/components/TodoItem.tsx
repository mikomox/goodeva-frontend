import type { Todo } from '../api/useTodos';
import { useToggleTodo } from '../api/useToggleTodo';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface TodoItemProps {
    todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
    const { mutate: toggleTodo } = useToggleTodo();

    const handleToggle = () => {
        toggleTodo({ id: todo.id, completed: !todo.completed });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group flex items-center gap-3 rounded-lg border border-zinc-100 bg-white p-3 shadow-sm transition-all hover:border-zinc-200 hover:shadow-md"
        >
            <button
                onClick={handleToggle}
                className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                    todo.completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-zinc-300 bg-transparent hover:border-primary"
                )}
            >
                {todo.completed && <Check className="h-3.5 w-3.5" />}
            </button>

            <span
                className={cn(
                    "flex-1 text-sm font-medium transition-all",
                    todo.completed ? "text-zinc-400 line-through" : "text-zinc-700"
                )}
            >
                {todo.title}
            </span>
        </motion.div>
    );
}
