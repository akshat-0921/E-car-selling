import axios from 'axios';

const API = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api',
   headers: {
      'Content-Type': 'application/json',
   },
});

export const getAllBrands = async () => {
   try {
      const response = await API.get('/brand/get-all')
      return response.data.brands
   } catch (error) {
      console.log('Error fetching brands', error)
      throw error
   }
}
