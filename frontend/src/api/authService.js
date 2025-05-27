import axios from 'axios';

const API = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api',
   headers: {
      'Content-Type': 'application/json',
   },
});

export const getCurrentUser = async () => {
   try {
      const response = await API.get('/user/me', { withCredentials: true })
      return response.data.user
   } catch (error) {
      console.log('Error fetching current user', error)
      throw error
   }
}

export const updateUserProfile = async (updatedData) => {
   try {
      const response = await API.put('/user/update', updatedData, { withCredentials: true })
      return response.data.user
   } catch (error) {
      console.log('Error updating user', error)
      throw error
   }
}

