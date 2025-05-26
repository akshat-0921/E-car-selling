import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllVehicles = async () => {
    try {
        const response = await API.get('/vehicle/get-all');
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

export const getVehicleById = async (vehicleId) => {
    try {
        const response = await API.get(`/vehicle/${vehicleId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching vehicle ${vehicleId}:`, error);
        throw error;
    }
};
