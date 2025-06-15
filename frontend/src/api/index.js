import axios from "axios"
import { bookingAPI } from "./bookingService"

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
})

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

export const authAPI = {
    login: (credentials) => API.post("/auth/login", credentials),//1
    signup: (userData) => API.post("/auth/signup", userData),//1
    verifyOtp: (data) => API.post("/auth/verify-otp", data),//1
    sendOtp: (email) => API.post("/auth/send-otp", { email }),//1
    logout: () => API.post("/auth/logout"),//1
    getProfile: () => API.get("/auth/profile"),//1
    updateProfile: (userData) => API.put("/auth/profile", userData),//1
}

export const vehicleAPI = {
    getAllVehicles: (filters) => API.get("/vehicle/get-all", { params: filters }),//1
    getVehicleById: (id) => API.get(`/vehicle/${id}`),//1
    getVehiclesByBrand: (brand) => API.get("/vehicle/by-brand", { params: { brand } }),//1
    addToFavorites: (vehicleId) => API.post("/vehicle/favorites", { vehicleId }),//1
    removeFromFavorites: (vehicleId) => API.delete(`/vehicle/favorites/${vehicleId}`),//1
    getFavorites: () => API.get("/vehicle/favorites"),
}

export const brandAPI = {
    getAllBrands: () => API.get("/brand/get-all"),//1
    getBrandDetails: (brandName) => API.get(`/brand/${brandName}`),//1
}

export const showroomAPI = {
    getAllShowrooms: (filters) => API.get("/showroom/get-all", { params: filters }),//1
    getShowroomById: (id) => API.get(`/showroom/${id}`),//1
    getNearbyShowrooms: ({ lat, lon, radius }) => API.get("/showroom/nearby", { params: { lat, lon, radius } }),//1
}

export const serviceAPI = {
    bookService: (serviceData) => API.post("/service/book", serviceData),
    getServiceHistory: () => API.get("/service/history"),
    cancelService: (bookingId) => API.delete(`/service/${bookingId}`),
}

export const testDriveAPI = {
    bookTestDrive: (bookingData) => API.post("/test-drive/book", bookingData),
    getTestDriveBookings: () => API.get("/test-drive/bookings"),
    cancelTestDrive: (bookingId) => API.delete(`/test-drive/${bookingId}`),
    rescheduleTestDrive: (bookingId, newData) => API.put(`/test-drive/${bookingId}`, newData),
}

export default API
export * from "./bookingService";

