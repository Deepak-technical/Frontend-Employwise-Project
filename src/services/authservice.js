import axios from 'axios';

// Base API URL (update if needed)
const API_URL = 'https://reqres.in/api';

// Login Service
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Returns the token
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Get Users Service
export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Returns the list of users
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};
export const updateUser = async (token, id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update user.');
  }
};

// Delete user
export const deleteUser = async (token, id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete user.');
  }
};
