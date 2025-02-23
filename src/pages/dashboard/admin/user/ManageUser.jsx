import React, { useState, useEffect } from 'react';
import UserTable from '../../../../components/UserTable';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteUserMutation, useFetchAllUsersQuery } from '../../../../redux/features/auth/authApi';


const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const { data: userResponse, isLoading: isUsersLoading, isError: isUserError, refetch } = useFetchAllUsersQuery();
  const [deleteUser]=useDeleteUserMutation();

  useEffect(() => {
    if (userResponse) {
      setUsers(userResponse.data);
    }
  }, [userResponse]);

  useEffect(()=>{
    refetch();
  },[refetch])

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success('The User has been successfully deleted!');
      refetch();
    } catch (error) {
      toast.error('Failed to delete user:', error);
      console.error('Failed to delete user:', error);
    }
  };

  if (isUsersLoading) {
    return <div>Loading users...</div>;
  }

  if (isUserError) {
    return <div>Error fetching users. Please try again later.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-black mb-6">Manage Users</h1>
      <UserTable users={users} handleDelete={handleDelete} />
    </div>
  );
};

export default ManageUsers;