import React, { useState, useEffect } from 'react';
import { 
  Plus,
  Clock, 
  MapPin, 
  Calendar,
  Route,
  Car,
  History,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { tripAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusBadge from '../../components/common/StatusBadge';
import { getZoneForLocation, getZoneColor, formatTime } from '../../utils/bangaloreData';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [recentTrips, setRecentTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const loadEmployeeData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demo purposes
      const mockTrips = [
        {
          id: 1,
          pickup_location: "Whitefield",
          destination: "Electronic City",
          scheduled_time: new Date(Date.now() + 2 * 3600000).toISOString(),
          status: "scheduled",
          driver_name: "Ravi Kumar",
          vehicle_number: "KA-01-HH-1234",
          notes: "Please wait at main gate"
        },
        {
          id: 2,
          pickup_location: "Koramangala",
          destination: "Whitefield",
          scheduled_time: new Date(Date.now() + 24 * 3600000).toISOString(),
          status: "scheduled",
          driver_name: "Suresh Reddy",
          vehicle_number: "KA-01-HH-5678",
          notes: ""
        },
        {
          id: 3,
          pickup_location: "Indiranagar",
          destination: "Whitefield",
          scheduled_time: new Date(Date.now() - 2 * 3600000).toISOString(),
          status: "completed",
          driver_name: "Amit Singh",
          vehicle_number: "KA-01-HH-9012",
          notes: ""
        },
        {
          id: 4,
          pickup_location: "Whitefield",
          destination: "JP Nagar",
          scheduled_time: new Date(Date.now() - 24 * 3600000).toISOString(),
          status: "completed",
          driver_name: "Rajesh Patel",
          vehicle_number: "KA-01-HH-3456",
          notes: ""
        }
      ];

      setTrips(mockTrips);
      setUpcomingTrips(mockTrips.filter(trip => 
        new Date(trip.scheduled_time) > new Date() && trip.status !== 'cancelled'
      ));
      setRecentTrips(mockTrips.filter(trip => 
        new Date(trip.scheduled_time) <= new Date()
      ).slice(0, 5));
      
    } catch (error) {
      console.error('Failed to load employee data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading your trips..." />;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'in-progress':
        return <Car className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const TripCard = ({ trip, showActions = false }) => {
    const zone = getZoneForLocation(trip.pickup_location);
    const zoneColor = getZoneColor(zone);
    const isUpcoming = new Date(trip.scheduled_time) > new Date();
    
    return (
      <div className="card p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: zoneColor }}
            ></div>
            <div>
              <h3 className="font-semibold text-secondary-900">
                {trip.pickup_location} → {trip.destination}
              </h3>
              <p className="text-sm text-secondary-600 flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(trip.scheduled_time).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(trip.status)}
            <StatusBadge status={trip.status} size="small" />
          </div>
        </div>

        <div className="space-y-3">
          {trip.driver_name && (
            <div className="flex items-center space-x-3">
              <Car className="w-4 h-4 text-secondary-400" />
              <span className="text-sm text-secondary-700">
                {trip.driver_name} - {trip.vehicle_number}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <MapPin className="w-4 h-4 text-secondary-400" />
            <span className="text-sm text-secondary-600">{zone} Zone</span>
          </div>

          {trip.notes && (
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-4 h-4 text-secondary-400 mt-0.5" />
              <span className="text-sm text-secondary-700">{trip.notes}</span>
            </div>
          )}
        </div>

        {showActions && isUpcoming && (
          <div className="flex space-x-2 mt-4 pt-4 border-t border-secondary-200">
            <button className="btn-secondary text-sm">
              Modify
            </button>
            <button className="btn-danger text-sm">
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', description }) => (
    <div className="card p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg bg-${color}-100 mr-4`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-secondary-900">{value}</p>
          <p className="text-sm font-medium text-secondary-600">{title}</p>
          {description && (
            <p className="text-xs text-secondary-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );

  const nextTrip = upcomingTrips[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Employee Dashboard</h1>
          <p className="text-secondary-600 mt-1">
            Welcome back! Manage your transportation requests and view trip history.
          </p>
        </div>
        <Link
          to="/trips/create"
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Trip
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Upcoming Trips"
          value={upcomingTrips.length}
          icon={Calendar}
          color="blue"
          description="Scheduled for next 7 days"
        />
        <StatCard
          title="This Month"
          value={trips.filter(t => 
            new Date(t.scheduled_time).getMonth() === new Date().getMonth()
          ).length}
          icon={Route}
          color="green"
          description="Total trips this month"
        />
        <StatCard
          title="Completed"
          value={trips.filter(t => t.status === 'completed').length}
          icon={CheckCircle}
          color="purple"
          description="Successfully completed"
        />
        <StatCard
          title="Total Distance"
          value="347 km"
          icon={MapPin}
          color="orange"
          description="This month"
        />
      </div>

      {/* Next Trip Alert */}
      {nextTrip && (
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Next Trip Coming Up
              </h3>
              <div className="flex items-center space-x-4 text-primary-700">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {nextTrip.pickup_location} → {nextTrip.destination}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {new Date(nextTrip.scheduled_time).toLocaleString()}
                  </span>
                </div>
              </div>
              {nextTrip.driver_name && (
                <p className="text-sm text-primary-600 mt-2">
                  Driver: {nextTrip.driver_name} - {nextTrip.vehicle_number}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button className="btn-primary text-sm">
                View Details
              </button>
              <button className="btn-secondary text-sm">
                Contact Driver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Trips */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-secondary-900">Upcoming Trips</h2>
            <Link to="/trips" className="text-primary-600 text-sm hover:text-primary-700">
              View All
            </Link>
          </div>
          
          {upcomingTrips.length > 0 ? (
            <div className="space-y-4">
              {upcomingTrips.slice(0, 3).map(trip => (
                <TripCard key={trip.id} trip={trip} showActions={true} />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No upcoming trips</h3>
              <p className="text-secondary-600 mb-4">You don't have any trips scheduled.</p>
              <Link to="/trips/create" className="btn-primary">
                Request Your First Trip
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentTrips.map(trip => (
              <div key={trip.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-secondary-200">
                {getStatusIcon(trip.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary-900 truncate">
                    {trip.pickup_location} → {trip.destination}
                  </p>
                  <p className="text-xs text-secondary-600">
                    {new Date(trip.scheduled_time).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={trip.status} size="small" />
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-secondary-900">Quick Actions</h4>
            <div className="space-y-2">
              <Link 
                to="/trips/create"
                className="w-full btn-primary flex items-center justify-center text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Request New Trip
              </Link>
              <Link 
                to="/trips"
                className="w-full btn-secondary flex items-center justify-center text-sm"
              >
                <History className="w-4 h-4 mr-2" />
                View Trip History
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Transportation Guidelines */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Transportation Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-secondary-900 mb-1">Booking Window</h4>
            <p className="text-sm text-secondary-600">Book trips at least 2 hours in advance</p>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium text-secondary-900 mb-1">Service Areas</h4>
            <p className="text-sm text-secondary-600">All Bangalore zones covered</p>
          </div>
          <div className="text-center">
            <Car className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-medium text-secondary-900 mb-1">Operating Hours</h4>
            <p className="text-sm text-secondary-600">6:30 AM - 8:30 PM (Sociable hours)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;