import { useAuth } from '@/hooks/useAuth';
import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type GuestGuardProps = {
    children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return <>{children}</>;
}
