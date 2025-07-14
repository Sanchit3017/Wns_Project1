# 🚀 WNS Bangalore Travel Management System - Complete Setup Guide

Welcome to the complete setup guide for the WNS Bangalore Travel Management System! This guide will help you get the entire system running on your local machine.

## 📋 System Overview

The WNS Bangalore Travel Management System is a comprehensive platform consisting of:

- **Microservices Backend** (Python/FastAPI)
  - API Gateway (Port 8000)
  - Auth Service (Port 8001)
  - User Service (Port 8002)
  - Trip Service (Port 8003)
  - Notification Service (Port 8004)

- **Modern Frontend** (React)
  - Web Application (Port 3000)
  - Role-based dashboards (Admin, Driver, Employee)
  - Bangalore-specific features and zones

## 🏗️ Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │
│   (React)       │◄──►│   (Port 8000)   │
│   Port 3000     │    └─────────┬───────┘
└─────────────────┘              │
                                 ├─── Auth Service (8001)
                                 ├─── User Service (8002)
                                 ├─── Trip Service (8003)
                                 └─── Notification Service (8004)
```

## 🔧 Prerequisites

Before starting, ensure you have:

### Required Software
- **Python 3.8+** - Backend microservices
- **Node.js 16+** - Frontend React application
- **npm or yarn** - Package manager for JavaScript
- **Git** - Version control (if cloning from repository)

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18+)

### Check Your Installation
```bash
# Check Python version
python3 --version

# Check Node.js version
node --version

# Check npm version
npm --version

# Check pip version
pip3 --version
```

## 📥 Installation Methods

### Method 1: Quick Start (Recommended)

1. **Clone/Download the project**
2. **Run the automatic setup script**:
   ```bash
   chmod +x start_complete_system.sh
   ./start_complete_system.sh
   ```
3. **Open your browser** to `http://localhost:3000`

### Method 2: Manual Setup

#### Step 1: Backend Setup

1. **Install Python dependencies**:
   ```bash
   pip3 install -r requirements.txt
   # or if using virtual environment:
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Start the backend services**:
   ```bash
   python3 run_microservices.py
   ```

3. **Verify backend is running**:
   - API Gateway: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

#### Step 2: Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   # Create .env file
   echo "REACT_APP_API_URL=http://localhost:8000" > .env
   ```

4. **Start the frontend**:
   ```bash
   npm start
   ```

5. **Access the application**:
   - Frontend: http://localhost:3000

## 🔑 Demo Credentials

The system comes with pre-configured demo accounts:

| Role | Email | Password | Features |
|------|-------|----------|----------|
| **Admin** | admin@wns.com | admin123 | Full system management, analytics, user management |
| **Driver** | driver@wns.com | driver123 | Trip assignments, status updates, navigation |
| **Employee** | employee@wns.com | employee123 | Trip requests, personal dashboard, history |

## 🎯 Quick Testing Guide

### Test Admin Features
1. Login as Admin (`admin@wns.com` / `admin123`)
2. View comprehensive dashboard with analytics
3. Navigate to "Trips" to see all system trips
4. Check "Drivers" and "Employees" for user management
5. Explore "Analytics" for detailed reports

### Test Driver Features
1. Login as Driver (`driver@wns.com` / `driver123`)
2. View assigned trips on dashboard
3. Test "Start Trip" and "Complete Trip" actions
4. Check zone-based route information

### Test Employee Features
1. Login as Employee (`employee@wns.com` / `employee123`)
2. View personal trip dashboard
3. Click "Request Trip" to create new trip
4. Check upcoming trips and history

## 🗺️ Bangalore-Specific Features

The system includes real Bangalore transportation data:

### Transport Zones
- **East Zone**: Whitefield, Electronic City, Hoskote, ITPL
- **West Zone**: Kengeri, Nagarbhavi, Raja-Rajeshwari Nagar
- **North Zone**: Laggere, Hesarghatta, Mathikere, Yeshwanthpur
- **South Zone**: JP Nagar, Hulimavu, Konanakunte, Girinagar
- **Central Zone**: Hebbagodi, Central Jail, Hosar Road

### WNS Office Location
- **Primary Office**: WNS Vuram, Whitefield (ITPL Main Road)
- **Zone**: East
- **Coordinates**: 12.9698°N, 77.7500°E

### Operating Hours
- **Sociable Hours**: 06:30 - 20:30 (All employees)
- **Unsociable Hours**: 20:30 - 06:30 (All employees)
- **Booking Buffer**: 15 minutes before, 20 minutes after

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check which process is using the port
lsof -i :8000  # or :3000

# Kill the process
kill -9 <PID>
```

#### Backend Services Not Starting
```bash
# Check Python installation
python3 --version

# Install missing dependencies
pip3 install -r requirements.txt

# Check for detailed error logs
python3 run_microservices.py
```

#### Frontend Build Errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try starting with verbose output
npm start --verbose
```

#### Database Connection Issues
```bash
# Check if PostgreSQL is running (if using PostgreSQL)
sudo service postgresql status

# For SQLite (default), check file permissions
ls -la *.db
```

### Environment-Specific Issues

#### Windows
- Use `python` instead of `python3`
- Use `Scripts\activate` instead of `bin/activate` for virtual environment
- Install Visual Studio Build Tools if node-gyp fails

#### macOS
- Install Xcode Command Line Tools: `xcode-select --install`
- Use Homebrew for dependencies: `brew install python3 node`

#### Linux
- Install build essentials: `sudo apt-get install build-essential`
- For Ubuntu/Debian: `sudo apt-get install python3-pip nodejs npm`

## 📊 System Monitoring

### Health Checks
- **API Gateway**: http://localhost:8000/health
- **Auth Service**: http://localhost:8001/health
- **User Service**: http://localhost:8002/health
- **Trip Service**: http://localhost:8003/health
- **Notification Service**: http://localhost:8004/health

### Log Monitoring
```bash
# Backend logs (in terminal running microservices)
tail -f logs/app.log

# Frontend logs (browser developer console)
F12 -> Console tab
```

### Performance Monitoring
- **Backend**: FastAPI auto-docs at http://localhost:8000/docs
- **Frontend**: React DevTools browser extension
- **Database**: Monitor query performance in logs

## 🔐 Security Configuration

### Development Environment
- JWT tokens with 24-hour expiry
- CORS enabled for localhost:3000
- Debug mode enabled for detailed error messages

### Production Deployment
```bash
# Set environment variables
export ENVIRONMENT=production
export JWT_SECRET_KEY=your-secret-key
export DATABASE_URL=your-production-db

# Disable debug mode
export DEBUG=False

# Configure CORS for production domain
export ALLOWED_ORIGINS=https://your-domain.com
```

## 📈 Advanced Configuration

### Customizing Bangalore Data
Edit `frontend/src/utils/bangaloreData.js` to:
- Add new zones or areas
- Modify transport timings
- Update distance matrices
- Configure WNS office locations

### API Customization
Edit backend service configurations:
- `shared/config.py` - Global settings
- Service-specific `main.py` files - Individual service config

### Frontend Theming
Edit `frontend/tailwind.config.js` to:
- Customize color schemes
- Modify typography
- Add new component styles

## 🚀 Deployment Options

### Development
- Local development server (current setup)
- Docker containers for isolation
- Virtual machines for team development

### Staging
- Docker Compose deployment
- Cloud development environments
- CI/CD pipeline integration

### Production
- Kubernetes cluster deployment
- Cloud platform deployment (AWS, GCP, Azure)
- Load balancer configuration

## 📚 Additional Resources

### Documentation
- [Backend API Documentation](http://localhost:8000/docs) - Interactive API docs
- [Frontend Component Library](frontend/src/components/) - React components
- [Database Schema](shared/database/) - Data models and relationships

### Support Channels
- **Email**: support@wns.com
- **Internal Slack**: #travel-management
- **Documentation Wiki**: Internal knowledge base

## 🤝 Contributing

### Development Workflow
1. Create feature branch from main
2. Implement changes with tests
3. Submit pull request for review
4. Deploy to staging for testing
5. Merge to main and deploy to production

### Code Standards
- **Python**: PEP 8 formatting, type hints
- **JavaScript**: ESLint configuration, Prettier formatting
- **Git**: Conventional commit messages

## 📝 License

This project is proprietary software owned by WNS Bangalore.

---

## 🎉 Success!

If you've followed this guide successfully, you should now have:

✅ **Backend Services** running on ports 8001-8004  
✅ **API Gateway** accessible at http://localhost:8000  
✅ **Frontend Application** running at http://localhost:3000  
✅ **Demo Accounts** ready for testing  
✅ **Bangalore-specific Features** configured and working  

**Next Steps:**
1. Explore each user role dashboard
2. Test trip creation and management
3. Review zone-based routing features
4. Check analytics and reporting
5. Customize for your specific needs

**Happy coding! 🚀**

---

*Built with ❤️ for WNS Bangalore Transportation Team*