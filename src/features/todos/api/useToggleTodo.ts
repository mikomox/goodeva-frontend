import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { Todo } from './useTodos';

export const useToggleTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
            const { data } = await api.patch<Todo>(`/todos/${id}`, { completed });
            return data;
        },
        onMutate: async ({ id, completed }) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const previousTodos = queryClient.getQueriesData<Todo[]>({ queryKey: ['todos'] });
            queryClient.setQueriesData<Todo[]>({ queryKey: ['todos'] }, (old) => {
                if (!old) return [];
                return old.map((todo) =>
                    todo.id === id ? { ...todo, completed } : todo
                );
            });

            return { previousTodos };
        },
        onError: (_err, _variables, context) => {
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
