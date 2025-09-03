import React from 'react';
import { DetailDialog } from '@/components/dialogs/detail-dialog';
import { userDetailConfig } from '@/lib/detail-configs';
import { Button } from '@/components/ui/button';
import { EyeIcon } from 'lucide-react';

function UserDetail({ data: user }) {
  return (
    <DetailDialog
      config={userDetailConfig}
      data={user}
      title="User Details"
      description="View detailed user information"
      size="lg"
      trigger={
        <Button variant="outline" size="sm">
          <EyeIcon className="size-3" />
        </Button>
      }
    />
  );
}

export default UserDetail;
