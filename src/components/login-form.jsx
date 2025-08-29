import { DynamicForm } from "@/components/forms/dynamic-form"
import { loginFormConfig } from "@/lib/form-configs.jsx"

export function LoginForm({
  className,
  ...props
}) {
  const handleLogin = (data) => {
    console.log('Login form submitted:', data);
    // Handle login logic here
    // You can add authentication logic, API calls, etc.
  };

  return (
    <DynamicForm 
      config={loginFormConfig}
      onSubmit={handleLogin}
      submitLabel="Login"
      showActions={true}
      className={className}
      {...props}
    />
  );
}
