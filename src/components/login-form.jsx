import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DynamicForm } from "@/components/forms/dynamic-form";
import { loginFormConfig } from "@/lib/form-configs.jsx";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (data) => {
    try {
      setIsSubmitting(true);
      clearError();
      
      console.log('Login attempt with data:', data);
      
      const result = await login(data);
      
      console.log('Login result:', result);
      
      if (result.success) {
        toast.success('Login successful!');
        // Redirect to dashboard or intended page
        navigate('/');
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className} {...props}>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <DynamicForm 
        config={loginFormConfig}
        onSubmit={handleLogin}
        submitLabel={isSubmitting ? "Logging in..." : "Login"}
        showActions={true}
        disabled={isSubmitting}
      />
    </div>
  );
}
