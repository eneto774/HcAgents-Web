import { useAuth } from '@/hooks/useAuth';
import LoadingScreen from '@/pages/LoadingScreen';
import Login from '@/pages/Login';
import { type ReactNode } from 'react';

type AuthGuardProps = {
    children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isInitialized } = useAuth();

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <Login />;
    }

    return <>{children}</>;
}
