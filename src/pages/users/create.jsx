import React from "react";
import { FormDialog } from "@/components/dialogs/form-dialog";
import { userFormConfig } from '@/lib/form-configs.jsx';
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { useUserStore } from '@/store/userStore';
import { toast } from 'sonner';

function CreateUser({ onUserAdded }) {
  const { addUser } = useUserStore();

  const handleSubmit = async (formData) => {
    try {
      const response = await addUser(formData);
      if (response.success) {
        toast.success('User created successfully!');
        if (onUserAdded) {
          onUserAdded(formData);
        }
      } else {
        toast.error(response.message || 'Failed to create user');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <FormDialog
      formConfig={userFormConfig}
      onSubmit={handleSubmit}
      title="Add New User"
      description="Fill in the user information below. Fields marked with * are required."
      submitLabel="Save"
      cancelLabel="Cancel"
      size="lg"
      trigger={
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <UserIcon className="size-4 mr-2" />
          Add User
        </Button>
      }
    />
  );
}

export default CreateUser;
