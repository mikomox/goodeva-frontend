import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/axios';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    created_at?: string;
}

export const useTodos = (search?: string) => {
    const [data, setData] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchTodos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await api.get<Todo[]>('/todos', {
                params: { search },
            });
            setData(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, [search]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return { data, isLoading, error, refetch: fetchTodos };
};
