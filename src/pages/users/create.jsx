import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DynamicForm } from '@/components/forms/dynamic-form';
import { userFormConfig } from '@/lib/form-configs.jsx';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CreateUser() {
  const navigate = useNavigate();
  const { addUser, loading } = useUserStore();

  const handleSubmit = async (formData) => {
    try {
      const response = await addUser(formData);
      if (response.success) {
        toast.success('User created successfully!');
        navigate('/users');
      } else {
        toast.error(response.message || 'Failed to create user');
      }
    } catch (error) {
      toast.error('An error occurred while creating the user');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/users')}
          className="p-0 h-auto"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New User</h1>
          <p className="text-muted-foreground">
            Add a new user to your system with appropriate permissions
          </p>
        </div>
      </div>

      {/* User Form */}
      <DynamicForm
        config={userFormConfig}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Create User"
        showActions={true}
      />
    </div>
  );
}
