import axios from "axios"

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
    login: (credentials) => API.post("/api/auth/login", credentials),
    signup: (userData) => API.post("/api/auth/signup", userData),
    verifyOtp: (data) => API.post("/api/auth/verify-otp", data),
    sendOtp: (email) => API.post("/api/auth/send-otp", { email }),
    logout: () => API.post("/api/auth/logout"),
    getProfile: () => API.get("/api/auth/profile"),
    updateProfile: (userData) => API.put("/api/auth/profile", userData),
}

export const vehicleAPI = {
    getAllVehicles: (filters) => API.get("/api/vehicle/get-all", { params: filters }),
    getVehicleById: (id) => API.get(`/api/vehicle/${id}`),
    getVehiclesByBrand: (brand) => API.get("/api/vehicle/by-brand", { params: { brand } }),
    addToFavorites: (vehicleId) => API.post("/api/vehicle/favorites", { vehicleId }),
    removeFromFavorites: (vehicleId) => API.delete(`/api/vehicle/favorites/${vehicleId}`),
    getFavorites: () => API.get("/api/vehicle/favorites"),
}

export const brandAPI = {
    getAllBrands: () => API.get("/api/brand/get-all"),
    getBrandDetails: (brandName) => API.get(`/api/brand/${brandName}`),
}

export const showroomAPI = {
    getAllShowrooms: (filters) => API.get("/api/showroom/get-all", { params: filters }),
    getShowroomById: (id) => API.get(`/api/showroom/${id}`),
    getNearbyShowrooms: (location) => API.get("/api/showroom/nearby", { params: location }),
}

export const serviceAPI = {
    bookService: (serviceData) => API.post("/api/service/book", serviceData),
    getServiceHistory: () => API.get("/api/service/history"),
    cancelService: (bookingId) => API.delete(`/api/service/${bookingId}`),
}

export const testDriveAPI = {
    bookTestDrive: (bookingData) => API.post("/api/test-drive/book", bookingData),
    getTestDriveBookings: () => API.get("/api/test-drive/bookings"),
    cancelTestDrive: (bookingId) => API.delete(`/api/test-drive/${bookingId}`),
    rescheduleTestDrive: (bookingId, newData) => API.put(`/api/test-drive/${bookingId}`, newData),
}

export default API
