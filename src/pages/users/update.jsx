import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DynamicForm } from '@/components/forms/dynamic-form';
import { userFormConfig } from '@/lib/form-configs.jsx';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUser, updateUser, loading } = useUserStore();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(id);
        if (user) {
          setUserData(user);
        } else {
          toast.error('User not found');
          navigate('/users');
        }
      } catch (error) {
        toast.error('Failed to fetch user data');
        navigate('/users');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, getUser, navigate]);

  const handleSubmit = async (formData) => {
    try {
      const response = await updateUser(id, formData);
      if (response.success) {
        toast.success('User updated successfully!');
        navigate('/users');
      } else {
        toast.error(response.message || 'Failed to update user');
      }
    } catch (error) {
      toast.error('An error occurred while updating the user');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading user data...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">User not found</div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
          <p className="text-muted-foreground">
            Update user information and permissions
          </p>
        </div>
      </div>

      {/* User Form */}
      <DynamicForm
        config={userFormConfig}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Update User"
        showActions={true}
        initialData={userData}
      />
    </div>
  );
}
