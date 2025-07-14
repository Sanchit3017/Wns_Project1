import axios from 'axios';
import { toast } from 'react-hot-toast';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    const message = error.response?.data?.detail || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  validate: (token) => api.post('/auth/validate', { token }),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  
  // Driver APIs
  getAllDrivers: () => api.get('/drivers'),
  createDriver: (data) => api.post('/drivers', data),
  updateDriver: (id, data) => api.put(`/drivers/${id}`, data),
  deleteDriver: (id) => api.delete(`/drivers/${id}`),
  getDriverTrips: (driverId) => api.get(`/trips/driver/${driverId}`),
  
  // Employee APIs
  getAllEmployees: () => api.get('/employees'),
  createEmployee: (data) => api.post('/employees', data),
  updateEmployee: (id, data) => api.put(`/employees/${id}`, data),
  deleteEmployee: (id) => api.delete(`/employees/${id}`),
  getEmployeeTrips: (employeeId) => api.get(`/trips/employee/${employeeId}`),
  
  // Admin APIs
  getSystemStats: () => api.get('/admin/stats'),
  getAllUsers: () => api.get('/admin/users'),
  toggleUserStatus: (userId, status) => api.put(`/admin/users/${userId}/status`, { is_active: status }),
};

// Trip API
export const tripAPI = {
  getAllTrips: () => api.get('/trips'),
  getTripById: (id) => api.get(`/trips/${id}`),
  createTrip: (data) => api.post('/trips', data),
  updateTrip: (id, data) => api.put(`/trips/${id}`, data),
  deleteTrip: (id) => api.delete(`/trips/${id}`),
  startTrip: (id) => api.post(`/trips/${id}/start`),
  completeTrip: (id) => api.post(`/trips/${id}/complete`),
  getTripsByStatus: (status) => api.get(`/trips/status/${status}`),
  getTripAnalytics: () => api.get('/trips/analytics'),
};

// Notification API
export const notificationAPI = {
  getAllNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  sendNotification: (data) => api.post('/notifications', data),
};

// Enhanced Features API (for Bangalore-specific features)
export const enhancedAPI = {
  calculateETA: (pickup, destination) => api.post('/enhanced/eta', { pickup, destination }),
  getOptimalDriver: (location, shiftTime) => api.post('/enhanced/optimal-driver', { location, shiftTime }),
  getTrafficInfo: (route) => api.post('/enhanced/traffic', { route }),
  getDashboardData: () => api.get('/enhanced/dashboard'),
};

export default api;