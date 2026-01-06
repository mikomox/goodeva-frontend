import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth, AuthProvider } from '@/features/auth/AuthContext';
import { AuthScreen } from '@/features/auth/AuthScreen';
import { TodoListScreen } from './features/todos/TodoListScreen';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <main className="min-h-screen font-sans">
      {isAuthenticated ? <TodoListScreen /> : <AuthScreen />}
      <Toaster position="top-center" richColors />
    </main>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}
