import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    created_at?: string;
}

export const useTodos = (search?: string) => {
    return useQuery({
        queryKey: ['todos', { search }],
        queryFn: async () => {
            const { data } = await api.get<Todo[]>('/todos', {
                params: { search },
            });
            return data;
        },
    });
};
