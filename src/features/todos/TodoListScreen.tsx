import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useTodos } from './api/useTodos';
import { useCreateTodo } from './api/useCreateTodo';
import { TodoList } from './components/TodoList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/features/auth/AuthContext';
import { LogOut, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'active' | 'completed';

export function TodoListScreen() {
    const { logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch] = useDebounce(searchTerm, 500);
    const [filter, setFilter] = useState<FilterType>('all');
    const { data: todos = [], isLoading } = useTodos(debouncedSearch);
    const { mutate: createTodo } = useCreateTodo();
    const [newTodo, setNewTodo] = useState('');

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim()) {
            createTodo(newTodo.trim());
            setNewTodo('');
        }
    };
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });
    return (
        <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
            <div className="mx-auto max-w-2xl space-y-6">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                            Todo List
                        </h1>
                        <p className="text-zinc-500">Goodeva Test Project</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                        <LogOut className="h-5 w-5 text-zinc-500" />
                    </Button>
                </header>

                <Card className="border-zinc-200 bg-white/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Add Task</CardTitle>
                        <CardDescription>Create a new task</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreate} className="flex gap-3">
                            <Input
                                placeholder="What needs to be done?"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                className="bg-white"
                            />
                            <Button type="submit" disabled={!newTodo.trim()}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white pl-9"
                        />
                    </div>
                    <div className="flex gap-2 rounded-lg bg-zinc-100 p-1">
                        {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                                    filter === f
                                        ? "bg-white text-zinc-900 shadow-sm"
                                        : "text-zinc-500 hover:text-zinc-900"
                                )}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <TodoList todos={filteredTodos} isLoading={isLoading} />
            </div>
        </div>
    );
}
