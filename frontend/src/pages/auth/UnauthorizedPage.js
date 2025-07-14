import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, ArrowLeft } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="max-w-md w-full mx-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <ShieldX className="w-24 h-24 text-red-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Access Denied
          </h1>
          
          <p className="text-lg text-secondary-600 mb-8">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          
          <Link
            to="/dashboard"
            className="inline-flex items-center btn-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;