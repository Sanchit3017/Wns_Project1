import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Car, Building2, Shield, User } from 'lucide-react';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [activeDemo, setActiveDemo] = useState('admin');
  
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  // Demo credentials for easy testing
  const demoCredentials = {
    admin: { email: 'admin@wns.com', password: 'admin123' },
    driver: { email: 'driver@wns.com', password: 'driver123' },
    employee: { email: 'employee@wns.com', password: 'employee123' }
  };

  useEffect(() => {
    // Auto-fill demo credentials when activeDemo changes
    setCredentials(demoCredentials[activeDemo]);
  }, [activeDemo]);

  if (isAuthenticated()) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(credentials);
    if (result.success) {
      // Redirect will be handled by the Navigate component above
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleDemoLogin = (role) => {
    setActiveDemo(role);
    setCredentials(demoCredentials[role]);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 text-white flex-col justify-center px-12">
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <Building2 className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-3xl font-bold">WNS Bangalore</h1>
              <p className="text-primary-200">Travel Management System</p>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">
            Streamline Your Corporate Transportation
          </h2>
          
          <p className="text-lg text-primary-100 mb-8">
            Efficiently manage employee transportation with our comprehensive platform 
            designed specifically for Bangalore's corporate mobility needs.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-3 text-primary-300" />
              <span>Secure role-based access control</span>
            </div>
            <div className="flex items-center">
              <Car className="w-6 h-6 mr-3 text-primary-300" />
              <span>Real-time trip tracking & management</span>
            </div>
            <div className="flex items-center">
              <User className="w-6 h-6 mr-3 text-primary-300" />
              <span>Integrated driver & employee management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary-900">Welcome Back</h2>
            <p className="text-secondary-600 mt-2">Please sign in to your account</p>
          </div>

          {/* Demo User Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-secondary-700 mb-3">Demo Login As:</p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(demoCredentials).map(([role, creds]) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleDemoLogin(role)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeDemo === role
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center py-3 text-lg"
            >
              {loading ? (
                <>
                  <div className="spinner mr-2"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Demo Credentials:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Admin:</strong> admin@wns.com / admin123</p>
              <p><strong>Driver:</strong> driver@wns.com / driver123</p>
              <p><strong>Employee:</strong> employee@wns.com / employee123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;