import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus } from 'lucide-react';
import DataTable from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { toast } from 'sonner';

export default function UserList() {
  const { users, loading, error, fetchUsers, deleteUser } = useUserStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.success) {
        toast.success('User deleted successfully');
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
      } else {
        toast.error(response.message || 'Failed to delete user');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the user');
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (user) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  // Table columns configuration
  const userColumns = [
    {
      key: 'firstName',
      header: 'First Name',
      cell: ({ row }) => (
        <div className="font-medium">{row.firstName}</div>
      ),
    },
    {
      key: 'lastName',
      header: 'Last Name',
      cell: ({ row }) => (
        <div className="font-medium">{row.lastName}</div>
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
      key: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <div className="capitalize">{row.role}</div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      cell: ({ row }) => (
        <div className="capitalize">{row.department}</div>
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
            : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={`/users/${row.id}`}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
          <Link to={`/users/${row.id}/edit`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => openDeleteDialog(row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your system users and their permissions
          </p>
        </div>
        <Link to="/users/create">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4 mr-2" />
            Add User
          </Button>
        </Link>
      </div>

      {/* Users Table */}
      <DataTable
        data={users}
        columns={userColumns}
        striped={true}
        hover={true}
        emptyMessage="No users found. Add your first user to get started!"
        filterableColumns={['firstName', 'lastName', 'email', 'role', 'department']}
        itemsPerPage={10}
        showPagination={true}
      />

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete user <strong>{userToDelete.firstName} {userToDelete.lastName}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setUserToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleDeleteUser(userToDelete.id)}
              >
                Delete User
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
