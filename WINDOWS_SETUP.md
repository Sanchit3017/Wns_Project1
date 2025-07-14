# WNS Bangalore Travel Management System - Windows Setup Guide

## 🎯 Quick Start for Windows Users

### Prerequisites
Before running the application, ensure you have:

1. **Python 3.8+** - Download from [python.org](https://python.org)
   - ⚠️ **IMPORTANT**: Check "Add Python to PATH" during installation
2. **Node.js 16+** - Download from [nodejs.org](https://nodejs.org)
   - npm will be installed automatically with Node.js

### 🚀 Running the Application

You have **2 options** to start the system:

#### Option 1: Full Setup (Recommended for first time)
```batch
start_wns_system.bat
```
**Features:**
- ✅ Complete prerequisite checking
- ✅ Automatic dependency installation
- ✅ Detailed status information
- ✅ Comprehensive error handling
- ✅ Auto-opens browser
- ✅ Service management

#### Option 2: Quick Start (For subsequent runs)
```batch
quick_start.bat
```
**Features:**
- ✅ Fast startup (30-60 seconds)
- ✅ Basic error checking
- ✅ Auto-opens browser
- ✅ Simple service management

## 📁 File Structure
```
project-root/
├── start_wns_system.bat    ← Full setup script
├── quick_start.bat         ← Quick start script
├── WINDOWS_SETUP.md        ← This guide
├── run_microservices.py    ← Backend services
├── frontend/               ← React application
└── ...
```

## 🔧 How to Use

### Step 1: Download/Extract Project
- Extract the project to a folder (e.g., `C:\WNS_Travel_System\`)
- Open Windows Explorer and navigate to the project folder

### Step 2: Run the Application
- **Double-click** `start_wns_system.bat` (first time)
- **OR Double-click** `quick_start.bat` (subsequent runs)

### Step 3: Access the Application
- Browser will open automatically to `http://localhost:3000`
- If not, manually open: `http://localhost:3000`

### Step 4: Login
Use any of these demo credentials:
- **Admin**: `admin@wns.com` / `admin123`
- **Driver**: `driver@wns.com` / `driver123`
- **Employee**: `employee@wns.com` / `employee123`

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main application interface |
| **Backend API** | http://localhost:8000 | REST API endpoints |
| **Health Check** | http://localhost:8000/health | Service status |

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### ❌ "Python is not recognized"
**Solution:**
1. Reinstall Python from [python.org](https://python.org)
2. ✅ Check "Add Python to PATH" during installation
3. Restart Command Prompt/PowerShell

#### ❌ "Node is not recognized"
**Solution:**
1. Install Node.js from [nodejs.org](https://nodejs.org)
2. Restart Command Prompt/PowerShell
3. Verify with: `node --version`

#### ❌ "Port already in use"
**Solution:**
1. Close any existing instances
2. Run: `taskkill /f /im python.exe && taskkill /f /im node.exe`
3. Restart the batch file

#### ❌ Frontend won't load
**Solutions:**
- Try: `http://localhost:3001` (alternative port)
- Wait 60-90 seconds for full startup
- Check Windows Firewall settings
- Restart the application

#### ❌ "npm install" fails
**Solutions:**
- Check internet connection
- Try running as Administrator
- Clear npm cache: `npm cache clean --force`
- Delete `frontend/node_modules` and retry

### Manual Commands (Advanced)

If batch files don't work, you can run manually:

```batch
:: Terminal 1 - Backend
cd project-folder
python run_microservices.py

:: Terminal 2 - Frontend
cd project-folder/frontend
npm install
npm start
```

## 🎯 Features Available

### 🏢 Bangalore Integration
- **WNS Vuram Office** (Whitefield) as transport hub
- **5 Zones**: East, West, North, South, Central
- **Real locations**: Electronic City, JP Nagar, Kengeri, etc.
- **Traffic calculations** with peak hour factors

### 👥 Role-Based Dashboards
- **Admin**: Analytics, user management, system overview
- **Driver**: Trip assignments, route management, status updates
- **Employee**: Trip requests, schedules, notifications

### 📊 Professional Features
- Interactive charts and analytics
- Real-time trip tracking
- Zone-based routing
- Transport policy compliance
- Mobile-responsive design

## 🚀 Performance Tips

### For Better Performance:
1. **Close unnecessary applications** before starting
2. **Use SSD** if available for faster loading
3. **Minimum 4GB RAM** recommended
4. **Good internet connection** for initial setup

### System Requirements:
- **Windows 10/11** (Windows 7+ may work)
- **4GB RAM minimum** (8GB recommended)
- **2GB free disk space**
- **Internet connection** (for initial setup)

## 🔐 Security Notes

- This is a **demo system** with sample data
- **Do not use in production** without proper security review
- Default passwords are for **demonstration only**
- **No real payment** or sensitive data handling

## 📞 Getting Help

If you encounter issues:

1. **Check this guide** for common solutions
2. **Verify prerequisites** are properly installed
3. **Try the manual commands** listed above
4. **Check Windows Event Viewer** for detailed errors
5. **Run as Administrator** if permission issues occur

## 🎉 Success!

When everything is working, you'll see:
- ✅ Backend running on port 8000
- ✅ Frontend running on port 3000
- ✅ Browser opens automatically
- ✅ Login page displays

**Enjoy exploring the WNS Bangalore Travel Management System!** 🚀

---

*Created for WNS Vuram, Whitefield, Bangalore*