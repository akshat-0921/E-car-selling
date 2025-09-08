import axios from 'axios';

const API = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api',
   headers: {
      'Content-Type': 'application/json',
   },
});

export const getAllVehicles = async (filters = {}) => {
   try {
      const response = await API.get('/filter', { params: filters });
      // console.log(response.data)
      return response.data.vehicles;
   } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
   }
};



export const getVehicleById = async (vehicleId) => {
   try {
      const response = await API.get(`/vehicle/get/${vehicleId}`);
      console.log(response.data.vehicle)
      return response.data.vehicle;
   } catch (error) {
      console.error(`Error fetching vehicle ${vehicleId}:`, error);
      throw error;
   }
};

// export const getAllVehicles = async () => {
//    try {
//       const response = await API.get('/vehicle/get-all');
//       console.log(response.data)
//       return response.data.vehicles;
//    } catch (error) {
//       console.error('Error fetching vehicles:', error);
//       throw error;
//    }
// };
