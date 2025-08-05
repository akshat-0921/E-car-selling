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
   login: (credentials) => API.post("/auth/login", credentials),
   signup: (userData) => API.post("/auth/signup", userData),
   verifyOtp: (data) => API.post("/auth/verify-otp", data),
   sendOtp: (email) => API.post("/auth/send-otp", { email }),
   logout: () => API.post("/auth/logout"),
   getProfile: () => API.get("/auth/profile"),
   updateProfile: (userData) => API.put("/auth/profile", userData),
}

export const vehicleAPI = {
   getAllVehicles: (filters) => API.get("/vehicle/get-all", { params: filters }),
   getVehicleById: (id) => API.get(`/vehicle/${id}`),
   getVehiclesByBrand: (brand) => API.get("/vehicle/by-brand", { params: { brand } }),
   addToFavorites: (vehicleId) => API.post("/vehicle/favorites", { vehicleId }),
   removeFromFavorites: (vehicleId) => API.delete(`/vehicle/favorites/${vehicleId}`),
   getFavorites: () => API.get("/vehicle/favorites"),
}

export const brandAPI = {
   getAllBrands: () => API.get("/brand/get-all"),
   getBrandDetails: (brandName) => API.get(`/brand/${brandName}`),
}

export const showroomAPI = {
   getAllShowrooms: (filters) => API.get("/showroom/get-all", { params: filters }),
   getShowroomById: (id) => API.get(`/showroom/${id}`),
   getNearbyShowrooms: ({ lat, lon, radius }) => API.get("/showroom/find-nearby", { params: { lat, lon, radius } }),
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

