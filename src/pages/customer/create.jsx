import React from "react";
import { FormDialog } from "@/components/dialogs/form-dialog";
import { customerFormConfig } from '@/lib/form-configs.jsx'
import { Button } from "@/components/ui/button";
import { UsersIcon } from "lucide-react";
import { z } from "zod";

function CreateCustomer({ onCustomerAdded }) {
  return (
    <FormDialog
      formConfig={customerFormConfig}
      onSubmit={(formData) => onCustomerAdded(formData)}
      title="Add New Customer"
      description="Fill in the customer information below. Fields marked with * are required."
      submitLabel="Save"
      cancelLabel="Cancel"
      size="lg"
      trigger={
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <UsersIcon className="size-4 mr-2" />
          Add Customer
        </Button>
      }
    />
  );
}

export default CreateCustomer;
