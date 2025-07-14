# WNS Bangalore Travel Management System - Frontend

A modern, professional React frontend for the WNS Bangalore Travel Management System. This application provides role-based dashboards for administrators, drivers, and employees to efficiently manage corporate transportation.

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication with secure token management
- Role-based access control (Admin, Driver, Employee)
- Protected routes with automatic redirects
- Demo credentials for easy testing

### 👨‍💼 Admin Dashboard
- Comprehensive system overview with real-time analytics
- Trip management with full CRUD operations
- Driver and employee management
- Interactive charts and visualizations
- Bangalore zone-based trip distribution
- System performance metrics

### 🚗 Driver Dashboard
- Real-time trip assignments and schedule
- Trip status management (Start/Complete trips)
- Contact information for employees
- Navigation integration
- Zone-based route optimization
- Performance tracking

### 👥 Employee Dashboard
- Trip request submission
- Personal trip history and tracking
- Upcoming trip notifications
- Transportation guidelines
- Zone-aware booking system

### 🗺️ Bangalore-Specific Features
- **Zone-based System**: East, West, North, South, Central zones
- **WNS Policy Integration**: Operating hours, distance matrices
- **Location Intelligence**: Automatic zone detection
- **Time Optimization**: Peak hour traffic calculations
- **Route Planning**: ETA calculations based on distance and traffic

### 📱 Modern UI/UX
- Responsive design for all devices
- Professional color scheme and typography
- Smooth animations and transitions
- Intuitive navigation and user experience
- Real-time notifications and feedback

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and context
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API communication
- **Recharts** - Interactive charts and visualizations
- **Lucide React** - Modern icon library
- **React Hot Toast** - Elegant notifications
- **Date manipulation** - Moment.js integration

## 📋 Prerequisites

Before running this application, ensure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- The backend services running (see backend documentation)

## 🚀 Quick Start

1. **Clone and Setup**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Demo Credentials

The application includes pre-configured demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@wns.com | admin123 |
| Driver | driver@wns.com | driver123 |
| Employee | employee@wns.com | employee123 |

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── StatusBadge.js
│   │   └── layout/
│   │       ├── Header.js
│   │       ├── MainLayout.js
│   │       └── Sidebar.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.js
│   │   │   └── UnauthorizedPage.js
│   │   ├── dashboards/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── DriverDashboard.js
│   │   │   └── EmployeeDashboard.js
│   │   ├── trips/
│   │   │   ├── TripsList.js
│   │   │   ├── TripDetails.js
│   │   │   └── CreateTrip.js
│   │   └── users/
│   │       ├── DriversList.js
│   │       └── EmployeesList.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── bangaloreData.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3b82f6 (Professional, trustworthy)
- **Secondary Gray**: #64748b (Neutral, readable)
- **Success Green**: #10b981 (Positive actions)
- **Warning Orange**: #f59e0b (Attention required)
- **Error Red**: #ef4444 (Critical issues)

### Typography
- **Headings**: Roboto (Bold, clean)
- **Body Text**: Inter (Readable, modern)
- **UI Elements**: System fonts for performance

### Components
- **Cards**: Consistent shadowing and border radius
- **Buttons**: Role-specific styling with hover states
- **Forms**: Floating labels and validation feedback
- **Status Badges**: Color-coded for trip statuses

## 🗺️ Bangalore Integration

### Transportation Zones
```javascript
const BANGALORE_ZONES = {
  "East": ["Whitefield", "Electronic City", "Hoskote", ...],
  "West": ["Kengeri", "Nagarbhavi", "Raja-Rajeshwari Nagar", ...],
  "North": ["Laggere", "Hesarghatta", "Mathikere", ...],
  "South": ["JP Nagar", "Hulimavu", "Konanakunte", ...],
  "Central": ["Hebbagodi", "Central Jail", "Hosar Road", ...]
};
```

### Operating Hours
- **Sociable Hours**: 06:30 - 20:30 (All employees)
- **Unsociable Hours**: 20:30 - 06:30 (All employees)
- **ETA Buffers**: 15 mins before login, 20 mins after logout

### Distance & Time Matrix
- **0-10km**: 0-60 minutes (Base: 30 mins)
- **11-20km**: 60-90 minutes (Base: 75 mins)
- **21-30km**: 90-120 minutes (Base: 105 mins)
- **30km+**: 120-150 minutes (Base: 135 mins)

## 🔄 API Integration

The frontend integrates with the following backend services:

### Authentication Service (Port 8001)
- User login and token validation
- Role-based access control

### User Service (Port 8002)
- Driver and employee management
- Profile operations

### Trip Service (Port 8003)
- Trip CRUD operations
- Status updates and tracking

### Notification Service (Port 8004)
- Real-time notifications
- System alerts

### API Gateway (Port 8000)
- Centralized routing
- Authentication middleware

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px (Collapsible sidebar, stacked layout)
- **Tablet**: 768px - 1024px (Adaptive grid system)
- **Desktop**: > 1024px (Full sidebar, multi-column layouts)

## 🔧 Available Scripts

```bash
# Development
npm start              # Start development server
npm run build         # Build for production
npm test              # Run test suite
npm run eject         # Eject from Create React App

# Linting and Formatting
npm run lint          # Run ESLint
npm run format        # Format with Prettier
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_VERSION=1.0.0
```

### Deployment Options
- **Netlify**: Automatic deployments from Git
- **Vercel**: Optimized for React applications
- **AWS S3 + CloudFront**: Scalable static hosting
- **Docker**: Containerized deployment

## 🔒 Security Considerations

- JWT tokens stored in localStorage with automatic cleanup
- Protected routes prevent unauthorized access
- API requests include proper authentication headers
- XSS protection through React's built-in sanitization
- HTTPS enforcement in production environments

## 🎯 Performance Optimization

- Code splitting with React.lazy()
- Optimized bundle size with Tree Shaking
- Image optimization and lazy loading
- Efficient re-renders with React.memo()
- Caching strategies for API responses

## 🧪 Testing Strategy

- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for API calls
- E2E testing with Cypress (planned)

## 📈 Future Enhancements

- **Real-time Updates**: WebSocket integration
- **Mobile App**: React Native version
- **Offline Support**: Progressive Web App features
- **Advanced Analytics**: More detailed reporting
- **Map Integration**: Google Maps for route visualization
- **Push Notifications**: Browser and mobile notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For technical support or questions:
- Email: support@wns.com
- Internal Slack: #travel-management
- Documentation: Internal Wiki

## 📄 License

This project is proprietary software owned by WNS Bangalore.

---

**Built with ❤️ for WNS Bangalore Transportation Team**