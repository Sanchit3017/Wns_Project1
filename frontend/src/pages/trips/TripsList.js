import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  Car,
  Clock,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { tripAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusBadge from '../../components/common/StatusBadge';
import { getZoneForLocation, getZoneColor, BANGALORE_ZONES } from '../../utils/bangaloreData';
import { toast } from 'react-hot-toast';

const TripsList = () => {
  const { user, isAdmin, isDriver, isEmployee } = useAuth();
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    loadTrips();
  }, []);

  useEffect(() => {
    filterTrips();
  }, [trips, searchTerm, statusFilter, zoneFilter, dateFilter]);

  const loadTrips = async () => {
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
          employee_name: "Rajesh Kumar",
          driver_name: "Ravi Kumar",
          vehicle_plate_number: "KA-01-HH-1234",
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          pickup_location: "Koramangala",
          destination: "Whitefield",
          scheduled_time: new Date(Date.now() + 24 * 3600000).toISOString(),
          status: "scheduled",
          employee_name: "Priya Sharma",
          driver_name: "Suresh Reddy",
          vehicle_plate_number: "KA-01-HH-5678",
          created_at: new Date().toISOString()
        },
        {
          id: 3,
          pickup_location: "Indiranagar",
          destination: "Whitefield",
          scheduled_time: new Date(Date.now() - 1 * 3600000).toISOString(),
          status: "in-progress",
          employee_name: "Amit Patel",
          driver_name: "Amit Singh",
          vehicle_plate_number: "KA-01-HH-9012",
          created_at: new Date().toISOString()
        },
        {
          id: 4,
          pickup_location: "Whitefield",
          destination: "JP Nagar",
          scheduled_time: new Date(Date.now() - 2 * 3600000).toISOString(),
          status: "completed",
          employee_name: "Sneha Reddy",
          driver_name: "Rajesh Patel",
          vehicle_plate_number: "KA-01-HH-3456",
          created_at: new Date().toISOString()
        },
        {
          id: 5,
          pickup_location: "Malleswaram",
          destination: "Whitefield",
          scheduled_time: new Date(Date.now() - 24 * 3600000).toISOString(),
          status: "cancelled",
          employee_name: "Vikram Singh",
          driver_name: null,
          vehicle_plate_number: null,
          created_at: new Date().toISOString()
        }
      ];

      setTrips(mockTrips);
      setFilteredTrips(mockTrips);
      
    } catch (error) {
      console.error('Failed to load trips:', error);
      toast.error('Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  const filterTrips = () => {
    let filtered = trips;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(trip =>
        trip.pickup_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.driver_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(trip => trip.status === statusFilter);
    }

    // Zone filter
    if (zoneFilter !== 'all') {
      filtered = filtered.filter(trip => 
        getZoneForLocation(trip.pickup_location) === zoneFilter ||
        getZoneForLocation(trip.destination) === zoneFilter
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(trip => {
        const tripDate = new Date(trip.scheduled_time);
        switch (dateFilter) {
          case 'today':
            return tripDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return tripDate >= weekAgo;
          case 'month':
            return tripDate.getMonth() === now.getMonth() && tripDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    setFilteredTrips(filtered);
  };

  const handleDeleteTrip = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await tripAPI.deleteTrip(tripId);
        toast.success('Trip deleted successfully');
        loadTrips();
      } catch (error) {
        toast.error('Failed to delete trip');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading trips..." />;
  }

  const TripRow = ({ trip }) => {
    const pickupZone = getZoneForLocation(trip.pickup_location);
    const destinationZone = getZoneForLocation(trip.destination);
    const pickupColor = getZoneColor(pickupZone);
    const destinationColor = getZoneColor(destinationZone);

    return (
      <tr className="hover:bg-secondary-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: pickupColor }}
                title={`${pickupZone} Zone`}
              ></div>
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: destinationColor }}
                title={`${destinationZone} Zone`}
              ></div>
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-900">
                {trip.pickup_location}
              </p>
              <p className="text-xs text-secondary-500">→ {trip.destination}</p>
            </div>
          </div>
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-secondary-900">
            {new Date(trip.scheduled_time).toLocaleDateString()}
          </div>
          <div className="text-xs text-secondary-500">
            {new Date(trip.scheduled_time).toLocaleTimeString()}
          </div>
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap">
          <StatusBadge status={trip.status} />
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
          {trip.employee_name || '-'}
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
          {trip.driver_name || 'Not assigned'}
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
          {trip.vehicle_plate_number || '-'}
        </td>
        
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end space-x-2">
            <Link
              to={`/trips/${trip.id}`}
              className="text-primary-600 hover:text-primary-900"
            >
              <Eye className="w-4 h-4" />
            </Link>
            
            {(isAdmin() || (isEmployee() && trip.status === 'scheduled')) && (
              <button className="text-blue-600 hover:text-blue-900">
                <Edit className="w-4 h-4" />
              </button>
            )}
            
            {isAdmin() && (
              <button
                onClick={() => handleDeleteTrip(trip.id)}
                className="text-red-600 hover:text-red-900"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">
            {isAdmin() ? 'All Trips' : isDriver() ? 'My Assigned Trips' : 'My Trips'}
          </h1>
          <p className="text-secondary-600 mt-1">
            {filteredTrips.length} trips found
          </p>
        </div>
        
        {(isAdmin() || isEmployee()) && (
          <Link
            to="/trips/create"
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Trip
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search trips, employees, drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 form-input"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Zone Filter */}
          <div>
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="form-input"
            >
              <option value="all">All Zones</option>
              {Object.keys(BANGALORE_ZONES)
                .filter(zone => zone !== 'Non_Hiring')
                .map(zone => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="form-input"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trips Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Scheduled Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredTrips.length > 0 ? (
                filteredTrips.map(trip => (
                  <TripRow key={trip.id} trip={trip} />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Car className="w-12 h-12 text-secondary-400 mb-4" />
                      <h3 className="text-lg font-medium text-secondary-900 mb-2">No trips found</h3>
                      <p className="text-secondary-600 mb-4">
                        {searchTerm || statusFilter !== 'all' || zoneFilter !== 'all' || dateFilter !== 'all'
                          ? 'Try adjusting your filters'
                          : 'No trips have been created yet'}
                      </p>
                      {(isAdmin() || isEmployee()) && (
                        <Link to="/trips/create" className="btn-primary">
                          Create First Trip
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      {filteredTrips.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-secondary-900">
              {filteredTrips.filter(t => t.status === 'scheduled').length}
            </p>
            <p className="text-sm text-secondary-600">Scheduled</p>
          </div>
          
          <div className="card p-4 text-center">
            <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-secondary-900">
              {filteredTrips.filter(t => t.status === 'in-progress').length}
            </p>
            <p className="text-sm text-secondary-600">In Progress</p>
          </div>
          
          <div className="card p-4 text-center">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-secondary-900">
              {filteredTrips.filter(t => t.status === 'completed').length}
            </p>
            <p className="text-sm text-secondary-600">Completed</p>
          </div>
          
          <div className="card p-4 text-center">
            <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-secondary-900">
              {new Set(filteredTrips.flatMap(t => [
                getZoneForLocation(t.pickup_location),
                getZoneForLocation(t.destination)
              ])).size}
            </p>
            <p className="text-sm text-secondary-600">Zones Covered</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsList;