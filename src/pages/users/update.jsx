import React from 'react'
import { FormDialog } from '@/components/dialogs/form-dialog'
import { userFormConfig } from '@/lib/form-configs.jsx'
import { Button } from '@/components/ui/button'
import { EditIcon } from 'lucide-react'
import { useUserStore } from '@/store/userStore';
import { toast } from 'sonner';

function UpdateUser({ data: user, onEdit }) {
  const { updateUser } = useUserStore();

  const handleSubmit = async (formData) => {
    try {
      const response = await updateUser(user.id, formData);
      if (response.success) {
        toast.success('User updated successfully!');
        if (onEdit) {
          // Pass the complete updated user data
          const updatedUser = { ...user, ...formData };
          onEdit(updatedUser);
        }
      } else {
        toast.error(response.message || 'Failed to update user');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <FormDialog 
      formConfig={userFormConfig}
      initialData={user}
      onSubmit={handleSubmit}
      title="Edit User"
      description="Update the user information below. Fields marked with * are required."
      submitLabel="Update User"
      cancelLabel="Cancel"
      size="lg"
      trigger={
        <Button 
          size="sm" 
          variant="outline"
        >
          <EditIcon className="size-3" />
        </Button>
      }
    />
  )
}

export default UpdateUser
