import React, { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser } from '../services/authservice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {


  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 
  const [usersUpdated, setUsersUpdated] = useState(false); // For edit mode
  useEffect(() => {
    fetchUsers();
  }, [currentPage, usersUpdated]);
 
  

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const data = await getUsers(token, currentPage);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
     const data= await deleteUser(token, id);
      toast.success('User deleted successfully!');
     // Refresh the list
    } catch (err) {
      toast.error(err.message || 'Failed to delete user.');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Set user for editing
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
     const data= await updateUser(token, editingUser.id, {
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
        email: editingUser.email,
      });
      toast.success('User updated successfully!');
      setEditingUser(null);
 
      console.log(data);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.first_name=== data.first_name ? { ...user, ...data } : user
        ))
        setUsersUpdated(true);
      // navigate(`/users/${data.id}`); // Exit edit mode
    } catch (err) {
      toast.error(err.message || 'Failed to update user.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Users List</h2>

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded shadow">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-center">{`${user.first_name} ${user.last_name}`}</h3>
              <p className="text-gray-600 text-center">{user.email}</p>
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? 'bg-gray-300' : 'bg-indigo-500 text-white'
          }`}
        >
          Prev
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? 'bg-gray-300' : 'bg-indigo-500 text-white'
          }`}
        >
          Next
        </button>
      </div>

      {/* Edit Form */}
      {editingUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={editingUser.first_name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, first_name: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={editingUser.last_name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, last_name: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default UsersList;
