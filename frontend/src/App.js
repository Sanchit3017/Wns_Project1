import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth Components
import LoginPage from './pages/auth/LoginPage';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';

// Dashboard Components
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DriverDashboard from './pages/dashboards/DriverDashboard';
import EmployeeDashboard from './pages/dashboards/EmployeeDashboard';

// Trip Components
import TripsList from './pages/trips/TripsList';
import TripDetails from './pages/trips/TripDetails';
import CreateTrip from './pages/trips/CreateTrip';

// User Management Components
import UsersList from './pages/users/UsersList';
import DriversList from './pages/users/DriversList';
import EmployeesList from './pages/users/EmployeesList';

// Analytics Components
import Analytics from './pages/analytics/Analytics';

// Layout Components
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-secondary-50">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
            }}
          />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* Protected Routes with Layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              {/* Dashboard Routes */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="driver-dashboard" element={
                <ProtectedRoute allowedRoles={['driver']}>
                  <DriverDashboard />
                </ProtectedRoute>
              } />
              <Route path="employee-dashboard" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } />
              
              {/* Trip Management Routes */}
              <Route path="trips" element={<TripsList />} />
              <Route path="trips/:id" element={<TripDetails />} />
              <Route path="trips/create" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <CreateTrip />
                </ProtectedRoute>
              } />
              
              {/* User Management Routes */}
              <Route path="users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UsersList />
                </ProtectedRoute>
              } />
              <Route path="drivers" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DriversList />
                </ProtectedRoute>
              } />
              <Route path="employees" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <EmployeesList />
                </ProtectedRoute>
              } />
              
              {/* Analytics Routes */}
              <Route path="analytics" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Analytics />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;