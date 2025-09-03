import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus } from 'lucide-react';
import DataTable from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { toast } from 'sonner';
import { PageLayout } from '@/shared/layout';
import CreateUser from './create';
import UpdateUser from './update';
import DeleteUser from './delete';
import UserDetail from './detail-dialog';

export default function UserList() {
  const { users, loading, error, fetchUsers, deleteUser } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle user deletion
  const handleDeleteUser = async (user) => {
    try {
      const response = await deleteUser(user.id);
      if (response.success) {
        toast.success('User deleted successfully!', {
          description: `${user.username} has been removed from your database.`,
        });
        // Refresh the users list to reflect the changes
        fetchUsers();
      } else {
        toast.error(response.message || 'Failed to delete user');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the user');
      console.error('Delete user error:', error);
    }
  }

  // Handle user creation
  const handleUserAdded = (newUser) => {
    // Refresh the users list
    fetchUsers();
  };

  // Handle user editing
  const handleEditUser = (updatedUser) => {
    // The store already updates the local state automatically
    // No need to refresh the data as it's already updated in the store
    console.log('User updated:', updatedUser);
  };

  // Table columns configuration
  const userColumns = [
    {
      key: 'username',
      header: 'Username',
      cell: ({ row }) => (
        <div className="font-medium">{row.username}</div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.email}</div>
      ),
    },
    {
      key: 'first_name',
      header: 'First Name',
      cell: ({ row }) => (
        <div className="font-medium">{row.first_name || '-'}</div>
      ),
    },
    {
      key: 'last_name',
      header: 'Last Name',
      cell: ({ row }) => (
        <div className="font-medium">{row.last_name || '-'}</div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <div className="capitalize">{row.role || 'user'}</div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      cell: ({ row }) => (
        <div className="capitalize">{row.department || '-'}</div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          row.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : row.status === 'inactive'
            ? 'bg-gray-100 text-gray-800'
            : row.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status || 'active'}
        </div>
      ),
    },

  ];

  // Action buttons configuration
  const userActions = [
    {
      type: 'view',
      component: UserDetail,
    },
    {
      type: 'edit',
      component: UpdateUser,
      onEdit: handleEditUser,
    },
    {
      type: 'delete',
      component: DeleteUser,
      onDelete: handleDeleteUser,
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  // Page actions - Add User button
  const pageActions = (
    <CreateUser onUserAdded={handleUserAdded} />
  );

  return (
    <PageLayout
      title="Users"
      actions={pageActions}
    >
      <div className="space-y-6">
        {/* Users Table */}
        <div className="bg-card rounded-lg border">
          <div className="p-6">
            <DataTable
              data={users}
              columns={userColumns}
              striped={true}
              hover={true}
              emptyMessage="No users found. Add your first user to get started!"
              filterableColumns={['username', 'email', 'first_name', 'last_name', 'role', 'department', 'status']}
              itemsPerPage={10}
              showPagination={true}
              actions={userActions}
              actionsColumnHeader="Actions"
              actionsColumnClassName="w-32"
            />
          </div>
        </div>


      </div>
    </PageLayout>
  );
}
