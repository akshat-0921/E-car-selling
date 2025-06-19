import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get all showrooms with optional filters (e.g., by brand)
export const getAllShowrooms = async (filters) => {
    try {
        const response = await API.get('/showroom/get-all', { params: filters });
        return response.data.showrooms;
    } catch (error) {
        console.error('Error fetching showrooms:', error);
        throw error;
    }
};

// Get showroom by ID
export const getShowroomById = async (id) => {
    try {
        const response = await API.get(`/showroom/${id}`);
        return response.data.showroom;
    } catch (error) {
        console.error(`Error fetching showroom ${id}:`, error);
        throw error;
    }
};

// Find nearby showrooms using coordinates
export const getNearbyShowrooms = async (lat, lon, radius = 10) => {
    try {
        const response = await API.get('/showroom/nearby', {
            params: { lat, lon, radius },
        });
        return response.data.showrooms;
    } catch (error) {
        console.error('Error fetching nearby showrooms:', error);
        throw error;
    }
};
