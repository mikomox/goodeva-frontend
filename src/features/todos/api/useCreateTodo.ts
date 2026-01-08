import { useState } from 'react';
import { api } from '@/lib/axios';
import type { Todo } from './useTodos';

export const useCreateTodo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (title: string, options?: { onSuccess?: () => void }) => {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await api.post<Todo>('/todos', { title });
            options?.onSuccess?.();
            return data;
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { mutate, isLoading, error };
};
