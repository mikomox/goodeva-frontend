import type { Todo } from '../api/useTodos';

import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number, completed: boolean) => void;
}

export function TodoItem({ todo, onToggle }: TodoItemProps) {
    const [loading, isLoading] = useState(false);
    const handleToggle = () => {
        onToggle(todo.id, !todo.completed);
        isLoading(true);
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
                disabled={loading}
                className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                    todo.completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-zinc-300 bg-transparent hover:border-primary"
                )}
            >
                {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                    todo.completed && <Check className="h-3.5 w-3.5" />
                )}
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
