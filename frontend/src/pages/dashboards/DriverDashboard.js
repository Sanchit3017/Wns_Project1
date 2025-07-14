import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  CheckCircle, 
  PlayCircle,
  Calendar,
  Route,
  AlertCircle,
  Phone,
  User
} from 'lucide-react';
import { tripAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusBadge from '../../components/common/StatusBadge';
import { formatTime, getZoneForLocation, getZoneColor } from '../../utils/bangaloreData';
import { toast } from 'react-hot-toast';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [todayTrips, setTodayTrips] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadDriverData();
    // Set up polling for real-time updates
    const interval = setInterval(loadDriverData, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDriverData = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll use mock data since we don't have the driver ID
      // In a real app, you'd get this from the user context or API
      const mockTrips = [
        {
          id: 1,
          pickup_location: "Whitefield",
          destination: "Electronic City",
          scheduled_time: new Date(Date.now() + 2 * 3600000).toISOString(),
          status: "scheduled",
          employee_name: "Rajesh Kumar",
          employee_phone: "+91 9876543210",
          notes: "Office pickup at Gate 2"
        },
        {
          id: 2,
          pickup_location: "Koramangala",
          destination: "Whitefield",
          scheduled_time: new Date(Date.now() + 4 * 3600000).toISOString(),
          status: "scheduled",
          employee_name: "Priya Sharma",
          employee_phone: "+91 9876543211",
          notes: "Metro station pickup"
        },
        {
          id: 3,
          pickup_location: "Indiranagar",
          destination: "Whitefield",
          scheduled_time: new Date(Date.now() - 1 * 3600000).toISOString(),
          status: "in-progress",
          employee_name: "Amit Patel",
          employee_phone: "+91 9876543212",
          notes: ""
        }
      ];

      setTrips(mockTrips);
      setTodayTrips(mockTrips.filter(trip => 
        new Date(trip.scheduled_time).toDateString() === new Date().toDateString()
      ));
      setActiveTrip(mockTrips.find(trip => trip.status === 'in-progress'));
      
    } catch (error) {
      console.error('Failed to load driver data:', error);
      toast.error('Failed to load trip data');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTrip = async (tripId) => {
    setActionLoading(tripId);
    try {
      await tripAPI.startTrip(tripId);
      toast.success('Trip started successfully!');
      loadDriverData();
    } catch (error) {
      toast.error('Failed to start trip');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCompleteTrip = async (tripId) => {
    setActionLoading(tripId);
    try {
      await tripAPI.completeTrip(tripId);
      toast.success('Trip completed successfully!');
      loadDriverData();
    } catch (error) {
      toast.error('Failed to complete trip');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading your trips..." />;
  }

  const TripCard = ({ trip, isActive = false }) => {
    const zone = getZoneForLocation(trip.pickup_location);
    const zoneColor = getZoneColor(zone);
    
    return (
      <div className={`card p-6 ${isActive ? 'ring-2 ring-primary-500 bg-primary-50' : ''}`}>
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
          <StatusBadge status={trip.status} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <User className="w-4 h-4 text-secondary-400" />
            <span className="text-sm text-secondary-700">{trip.employee_name}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-secondary-400" />
            <a 
              href={`tel:${trip.employee_phone}`}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {trip.employee_phone}
            </a>
          </div>

          {trip.notes && (
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-4 h-4 text-secondary-400 mt-0.5" />
              <span className="text-sm text-secondary-700">{trip.notes}</span>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-2">
            <MapPin className="w-4 h-4 text-secondary-400" />
            <span className="text-sm text-secondary-600">{zone} Zone</span>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          {trip.status === 'scheduled' && (
            <button
              onClick={() => handleStartTrip(trip.id)}
              disabled={actionLoading === trip.id}
              className="btn-primary flex items-center text-sm"
            >
              {actionLoading === trip.id ? (
                <div className="spinner mr-2"></div>
              ) : (
                <PlayCircle className="w-4 h-4 mr-2" />
              )}
              Start Trip
            </button>
          )}
          
          {trip.status === 'in-progress' && (
            <button
              onClick={() => handleCompleteTrip(trip.id)}
              disabled={actionLoading === trip.id}
              className="btn-success flex items-center text-sm"
            >
              {actionLoading === trip.id ? (
                <div className="spinner mr-2"></div>
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              Complete Trip
            </button>
          )}

          <button className="btn-secondary flex items-center text-sm">
            <Navigation className="w-4 h-4 mr-2" />
            Navigate
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Driver Dashboard</h1>
          <p className="text-secondary-600 mt-1">
            Welcome back! You have {todayTrips.length} trips scheduled for today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-secondary-600">Current Time</p>
          <p className="text-lg font-semibold text-secondary-900">
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <Route className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-secondary-900">{todayTrips.length}</p>
          <p className="text-sm text-secondary-600">Today's Trips</p>
        </div>
        
        <div className="card p-4 text-center">
          <PlayCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-secondary-900">
            {todayTrips.filter(t => t.status === 'in-progress').length}
          </p>
          <p className="text-sm text-secondary-600">In Progress</p>
        </div>
        
        <div className="card p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-secondary-900">
            {todayTrips.filter(t => t.status === 'completed').length}
          </p>
          <p className="text-sm text-secondary-600">Completed</p>
        </div>
        
        <div className="card p-4 text-center">
          <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-secondary-900">
            {todayTrips.filter(t => t.status === 'scheduled').length}
          </p>
          <p className="text-sm text-secondary-600">Upcoming</p>
        </div>
      </div>

      {/* Active Trip */}
      {activeTrip && (
        <div>
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Active Trip</h2>
          <TripCard trip={activeTrip} isActive={true} />
        </div>
      )}

      {/* Today's Schedule */}
      <div>
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Today's Schedule</h2>
        {todayTrips.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {todayTrips
              .filter(trip => trip.id !== activeTrip?.id)
              .sort((a, b) => new Date(a.scheduled_time) - new Date(b.scheduled_time))
              .map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <Route className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No trips scheduled</h3>
            <p className="text-secondary-600">You don't have any trips scheduled for today.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn-secondary flex flex-col items-center p-4">
            <MapPin className="w-6 h-6 mb-2" />
            <span className="text-sm">View Routes</span>
          </button>
          
          <button className="btn-secondary flex flex-col items-center p-4">
            <Phone className="w-6 h-6 mb-2" />
            <span className="text-sm">Contact Support</span>
          </button>
          
          <button className="btn-secondary flex flex-col items-center p-4">
            <Calendar className="w-6 h-6 mb-2" />
            <span className="text-sm">View Schedule</span>
          </button>
          
          <button className="btn-secondary flex flex-col items-center p-4">
            <AlertCircle className="w-6 h-6 mb-2" />
            <span className="text-sm">Report Issue</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;