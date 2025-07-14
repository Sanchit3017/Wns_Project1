import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Users, 
  Route, 
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { tripAPI, userAPI } from '../../services/api';
import { BANGALORE_ZONES, getZoneColor } from '../../utils/bangaloreData';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusBadge from '../../components/common/StatusBadge';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [trips, setTrips] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, tripsResponse, analyticsResponse] = await Promise.all([
        userAPI.getSystemStats(),
        tripAPI.getAllTrips(),
        tripAPI.getTripAnalytics()
      ]);

      setStats(statsResponse.data);
      setTrips(tripsResponse.data.slice(0, 10)); // Latest 10 trips
      setAnalytics(analyticsResponse.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  // Mock data for demo purposes
  const mockStats = stats || {
    drivers: { total: 45, active: 38, available: 12 },
    employees: { total: 234, active: 224 },
    vehicles: { total: 48, available: 35, in_use: 13 },
    system: { uptime: '99.8%', total_trips_today: 67 }
  };

  const mockAnalytics = analytics || {
    total_trips: 1247,
    completed_trips: 1156,
    pending_trips: 34,
    in_progress_trips: 13,
    cancelled_trips: 44,
    completion_rate: 92.7
  };

  // Mock chart data
  const weeklyTripsData = [
    { day: 'Mon', trips: 45, completed: 42 },
    { day: 'Tue', trips: 52, completed: 48 },
    { day: 'Wed', trips: 48, completed: 44 },
    { day: 'Thu', trips: 61, completed: 58 },
    { day: 'Fri', trips: 55, completed: 51 },
    { day: 'Sat', trips: 28, completed: 26 },
    { day: 'Sun', trips: 22, completed: 20 }
  ];

  const zoneDistribution = Object.entries(BANGALORE_ZONES)
    .filter(([zone]) => zone !== 'Non_Hiring')
    .map(([zone, data]) => ({
      name: zone,
      value: Math.floor(Math.random() * 100) + 20,
      color: data.color
    }));

  const hourlyDistribution = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    trips: Math.floor(Math.random() * 20) + (i >= 7 && i <= 20 ? 15 : 5)
  }));

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-600">{title}</p>
          <p className="text-2xl font-bold text-secondary-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Admin Dashboard</h1>
          <p className="text-secondary-600 mt-1">Welcome back! Here's what's happening with your transport system.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-secondary-600">Today</p>
            <p className="text-lg font-semibold text-secondary-900">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Drivers"
          value={mockStats.drivers.total}
          change={8.2}
          icon={UserCheck}
          color="blue"
        />
        <StatCard
          title="Active Employees"
          value={mockStats.employees.active}
          change={3.1}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Available Vehicles"
          value={mockStats.vehicles.available}
          change={-2.4}
          icon={Car}
          color="purple"
        />
        <StatCard
          title="Today's Trips"
          value={mockStats.system.total_trips_today}
          change={12.5}
          icon={Route}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trips Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Weekly Trips Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyTripsData}>
              <defs>
                <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="trips" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorTrips)" 
              />
              <Area 
                type="monotone" 
                dataKey="completed" 
                stroke="#10b981" 
                fillOpacity={0.6} 
                fill="#10b981" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Zone Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Trip Distribution by Zone</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={zoneDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {zoneDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Summary and Recent Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trip Analytics */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Trip Analytics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-secondary-600">Completion Rate</span>
              <span className="font-semibold text-green-600">{mockAnalytics.completion_rate}%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${mockAnalytics.completion_rate}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{mockAnalytics.completed_trips}</p>
                <p className="text-xs text-secondary-600">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{mockAnalytics.in_progress_trips}</p>
                <p className="text-xs text-secondary-600">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{mockAnalytics.pending_trips}</p>
                <p className="text-xs text-secondary-600">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{mockAnalytics.cancelled_trips}</p>
                <p className="text-xs text-secondary-600">Cancelled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trips */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-secondary-900">Recent Trips</h3>
            <button className="text-primary-600 text-sm hover:text-primary-700">View All</button>
          </div>
          <div className="space-y-3">
            {trips.length > 0 ? trips.map((trip) => (
              <div key={trip.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">
                      {trip.pickup_location} → {trip.destination}
                    </p>
                    <p className="text-xs text-secondary-600">
                      {new Date(trip.scheduled_time).toLocaleString()}
                    </p>
                  </div>
                </div>
                <StatusBadge status={trip.status} size="small" />
              </div>
            )) : (
              // Mock data for demo
              Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-secondary-900">
                        Whitefield → Electronic City
                      </p>
                      <p className="text-xs text-secondary-600">
                        {new Date(Date.now() - i * 3600000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={['completed', 'in-progress', 'pending'][i % 3]} size="small" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Hourly Distribution */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Trip Distribution by Hour</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={hourlyDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="trips" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;