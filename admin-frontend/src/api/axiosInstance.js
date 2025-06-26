import axios from "axios";
import { store } from "../store";
import { setAdminLogin, setAdminLogout } from "../slices/adminSlice";

const API = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
   baseURL: API,
   withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
   failedQueue.forEach(prom => {
      if (error) {
         prom.reject(error);
      } else {
         prom.resolve(token);
      }
   });
   failedQueue = [];
};

axiosInstance.interceptors.response.use(
   response => response,
   async (error) => {
      const originalRequest = error.config;
      if (
         error.response &&
         error.response.status === 401 &&
         !originalRequest._retry
      ) {
         if (isRefreshing) {
            return new Promise(function (resolve, reject) {
               failedQueue.push({ resolve, reject });
            })
               .then(token => {
                  originalRequest.headers['Authorization'] = 'Bearer ' + token;
                  return axiosInstance(originalRequest);
               })
               .catch(err => {
                  return Promise.reject(err);
               });
         }

         originalRequest._retry = true;
         isRefreshing = true;
         try {
            // Call refresh token endpoint
            const res = await axios.post(`${API}/admin/refresh-token`, {}, { withCredentials: true });
            const newAccessToken = res.data.accessToken || res.data.tokens?.accessToken;

            // Update Redux store
            store.dispatch(setAdminLogin({
               admin: res.data.admin, // or fetch /admin/profile if needed
               accessToken: newAccessToken,
            }));

            // Process queued requests
            processQueue(null, newAccessToken);

            // Set header and retry original request
            originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
            return axiosInstance(originalRequest);
         } catch (refreshError) {
            processQueue(refreshError, null);
            store.dispatch(setAdminLogout());
            // Optionally redirect to login
            return Promise.reject(refreshError);
         } finally {
            isRefreshing = false;
         }
      }
      return Promise.reject(error);
   }
);

export default axiosInstance;
