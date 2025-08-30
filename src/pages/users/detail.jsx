import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUser, deleteUser, loading } = useUserStore();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(id);
      if (response.success) {
        toast.success('User deleted successfully');
        navigate('/users');
      } else {
        toast.error(response.message || 'Failed to delete user');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the user');
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'suspended':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'manager':
        return 'default';
      case 'user':
        return 'secondary';
      case 'viewer':
        return 'outline';
      default:
        return 'outline';
    }
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
      <div className="flex items-center justify-between">
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
            <h1 className="text-3xl font-bold tracking-tight">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-muted-foreground">
              User Details and Information
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/users/${id}/edit`}>
            <Button variant="outline">
              <Pencil className="size-4 mr-2" />
              Edit User
            </Button>
          </Link>
          <Button 
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="size-4 mr-2" />
            Delete User
          </Button>
        </div>
      </div>

      {/* User Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">First Name</label>
                <p className="text-sm">{userData.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                <p className="text-sm">{userData.lastName}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-sm">{userData.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="text-sm">{userData.phone || 'Not provided'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Account & Role */}
        <Card>
          <CardHeader>
            <CardTitle>Account & Role</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <p className="text-sm">{userData.username || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Role</label>
              <div className="mt-1">
                <Badge variant={getRoleBadgeVariant(userData.role)}>
                  {userData.role}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <Badge variant={getStatusBadgeVariant(userData.status)}>
                  {userData.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department & Location */}
        <Card>
          <CardHeader>
            <CardTitle>Department & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Department</label>
              <p className="text-sm capitalize">{userData.department || 'Not assigned'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Location</label>
              <p className="text-sm">{userData.location || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Manager</label>
              <p className="text-sm">{userData.manager || 'Not assigned'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Hire Date</label>
              <p className="text-sm">
                {userData.hireDate 
                  ? new Date(userData.hireDate).toLocaleDateString()
                  : 'Not specified'
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Created At</label>
              <p className="text-sm">
                {userData.createdAt 
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : 'Not available'
                }
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
              <p className="text-sm">
                {userData.updatedAt 
                  ? new Date(userData.updatedAt).toLocaleDateString()
                  : 'Not available'
                }
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Login</label>
              <p className="text-sm">
                {userData.lastLogin 
                  ? new Date(userData.lastLogin).toLocaleDateString()
                  : 'Never logged in'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete user <strong>{userData.firstName} {userData.lastName}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteUser}
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
