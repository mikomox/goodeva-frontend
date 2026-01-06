import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/lib/axios';
import { toast } from 'sonner';

export function AuthScreen() {
    const { login } = useAuth();
    const [key, setKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!key.trim()) return;

        setIsLoading(true);
        try {
            await api.get('/todos', {
                params: { search: 'test' },
                headers: { 'x-api-key': key.trim() }
            });

            toast.success('Access Granted');
            login(key.trim());
        } catch (error) {
            console.error(error);
            toast.error('Invalid API Key', {
                description: 'Please check your key and try again.'
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-zinc-200">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <KeyRound className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Welcome Back</CardTitle>
                        <CardDescription>
                            Enter your API Key to access your personal Todo List.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Enter API Key..."
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                autoFocus
                                disabled={isLoading}
                            />
                            <Button type="submit" className="w-full" disabled={!key.trim() || isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    'Access Dashboard'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
