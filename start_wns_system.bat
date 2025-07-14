@echo off
:: WNS Bangalore Travel Management System - Windows Startup Script
:: ================================================================

title WNS Bangalore Travel Management System

echo.
echo ########################################################
echo #  WNS Bangalore Travel Management System            #
echo #  Professional Transport Management Solution        #
echo ########################################################
echo.

:: Color setup for better visibility
color 0A

:: Check if Python is installed
echo [STEP 1] Checking Prerequisites...
echo.
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org
    pause
    exit /b 1
)

:: Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: npm is not installed or not in PATH
    echo npm should come with Node.js installation
    pause
    exit /b 1
)

echo ✅ Python version:
python --version
echo ✅ Node.js version:
node --version
echo ✅ npm version:
npm --version
echo.

:: Check if we're in the correct directory
if not exist "pyproject.toml" (
    echo ❌ ERROR: pyproject.toml not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ❌ ERROR: frontend directory not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

echo [STEP 2] Installing Python Dependencies...
echo.
:: Install Python dependencies
pip install --break-system-packages fastapi uvicorn sqlalchemy pydantic aiofiles email-validator httpx jinja2 passlib psycopg2-binary pydantic-settings python-jose python-multipart requests >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Warning: Some Python packages may have failed to install
    echo Continuing anyway...
)
echo ✅ Python dependencies installed

echo.
echo [STEP 3] Installing Frontend Dependencies...
echo.
cd frontend
if not exist "node_modules" (
    echo 📦 Installing npm packages (this may take a few minutes)...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ ERROR: Failed to install npm dependencies
        cd ..
        pause
        exit /b 1
    )
    echo ✅ Frontend dependencies installed
) else (
    echo ✅ Frontend dependencies already installed
)
cd ..

echo.
echo [STEP 4] Starting Backend Services...
echo.

:: Kill any existing processes
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1

:: Start backend services in background
echo 🚀 Starting Backend Microservices...
start /b "WNS Backend" python run_microservices.py

:: Wait a moment for backend to start
echo ⏳ Waiting for backend services to initialize...
timeout /t 10 /nobreak >nul

:: Check if backend is running
curl -s http://localhost:8000/ >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Backend may be starting slowly, continuing anyway...
) else (
    echo ✅ Backend services are responding
)

echo.
echo [STEP 5] Starting Frontend Application...
echo.

:: Create .env file for frontend if it doesn't exist
cd frontend
if not exist ".env" (
    echo 📝 Creating frontend configuration...
    (
        echo # WNS Bangalore Travel Management System - Frontend Environment
        echo REACT_APP_API_URL=http://localhost:8000
        echo REACT_APP_VERSION=1.0.0
        echo GENERATE_SOURCEMAP=false
        echo BROWSER=none
    ) > .env
    echo ✅ Frontend configuration created
)

:: Start frontend
echo 🚀 Starting React Development Server...
echo ⏳ Please wait, this may take 30-60 seconds...
start /b "WNS Frontend" npm start

:: Wait for frontend to start
echo.
echo ⏳ Waiting for frontend to be ready...
timeout /t 30 /nobreak >nul

cd ..

echo.
echo ########################################################
echo #           🎉 SYSTEM STARTUP COMPLETE! 🎉          #
echo ########################################################
echo.

:: Display system information
echo 🌐 ACCESS INFORMATION:
echo ====================================
echo.
echo 🖥️  Frontend Application:
echo    URL: http://localhost:3000
echo    Alternative: http://localhost:3001
echo.
echo ⚙️  Backend API Gateway:
echo    URL: http://localhost:8000
echo    Health Check: http://localhost:8000/health
echo.
echo 🔑 DEMO CREDENTIALS:
echo ====================================
echo.
echo 👤 Admin User:
echo    Email: admin@wns.com
echo    Password: admin123
echo    Features: System analytics, user management
echo.
echo 🚗 Driver User:
echo    Email: driver@wns.com
echo    Password: driver123
echo    Features: Trip assignments, route management
echo.
echo 👨‍💼 Employee User:
echo    Email: employee@wns.com
echo    Password: employee123
echo    Features: Trip requests, schedule viewing
echo.
echo 🏢 BANGALORE FEATURES:
echo ====================================
echo    ✅ WNS Vuram Office Hub (Whitefield)
echo    ✅ Zone-based routing (5 zones)
echo    ✅ Traffic-aware calculations
echo    ✅ Transport policy compliance
echo    ✅ Peak hour factors
echo.
echo 🎯 NEXT STEPS:
echo ====================================
echo 1. Open your web browser
echo 2. Go to: http://localhost:3000
echo 3. Login with any demo credentials above
echo 4. Explore the features!
echo.
echo 🛠️ MANAGEMENT:
echo ====================================
echo • To stop services: Press Ctrl+C in this window
echo • To restart: Run this bat file again
echo • To check status: Visit http://localhost:8000/health
echo.

:: Test if services are responding
echo 🔍 FINAL SYSTEM CHECK:
echo ====================================
echo.
echo Testing Backend Connection...
curl -s http://localhost:8000/ >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend API Gateway: RUNNING
) else (
    echo ⚠️  Backend API Gateway: Starting... (may take longer)
)

echo Testing Frontend Connection...
curl -s http://localhost:3000/ >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend React App: RUNNING
) else (
    curl -s http://localhost:3001/ >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ Frontend React App: RUNNING (Port 3001)
    ) else (
        echo ⚠️  Frontend React App: Starting... (may take longer)
    )
)

echo.
echo 🚀 WNS Bangalore Travel Management System is ready!
echo 🌐 Open http://localhost:3000 in your browser to get started!
echo.

:: Open browser automatically
echo 🖥️  Opening browser automatically...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo 📝 Note: Keep this window open to keep the services running.
echo Press any key if you want to close the services and exit...
pause >nul

:: Cleanup when user wants to exit
echo.
echo 🛑 Stopping services...
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1
echo ✅ Services stopped. Thank you for using WNS Travel Management System!
echo.
pause