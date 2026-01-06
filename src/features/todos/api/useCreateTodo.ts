import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { Todo } from './useTodos';

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (title: string) => {
            const { data } = await api.post<Todo>('/todos', { title });
            return data;
        },
        onMutate: async (newTitle) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });

            const previousTodos = queryClient.getQueriesData<Todo[]>({ queryKey: ['todos'] });

            queryClient.setQueriesData<Todo[]>({ queryKey: ['todos'] }, (old) => [
                ...(old || []),
                {
                    id: Date.now(),
                    title: newTitle,
                    completed: false,
                    created_at: new Date().toISOString(),
                },
            ]);

            return { previousTodos };
        },
        onError: (_err, _newTodo, context) => {
            if (context?.previousTodos) {
                context.previousTodos.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
};
