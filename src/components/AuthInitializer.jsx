import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthInitializer({ children }) {
  const { checkAuth, isInitializing } = useAuth();

  useEffect(() => {
    // Check authentication status on app startup
    checkAuth();
  }, [checkAuth]);

  // Show loading state while checking authentication
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  return children;
}
