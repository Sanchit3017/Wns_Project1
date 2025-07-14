@echo off
:: WNS Bangalore Travel Management - Quick Start
title WNS Travel System - Quick Start

echo.
echo 🚀 WNS Bangalore Travel Management System - Quick Start
echo ======================================================
echo.

:: Check prerequisites quickly
python --version >nul 2>&1 || (echo ❌ Python not found! Install from https://python.org & pause & exit)
node --version >nul 2>&1 || (echo ❌ Node.js not found! Install from https://nodejs.org & pause & exit)

echo ✅ Prerequisites OK
echo.

:: Kill existing processes
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1

:: Start backend
echo 🔧 Starting Backend...
start /b python run_microservices.py
timeout /t 8 /nobreak >nul

:: Start frontend
echo 🌐 Starting Frontend...
cd frontend 2>nul || (echo ❌ Run from project root directory! & pause & exit)
start /b npm start
cd ..

echo.
echo ⏳ Starting services... Please wait 30-60 seconds
timeout /t 20 /nobreak >nul

echo.
echo 🎉 READY TO USE!
echo ================
echo.
echo 🌐 Frontend: http://localhost:3000
echo ⚙️  Backend:  http://localhost:8000
echo.
echo 🔑 Login with:
echo   admin@wns.com / admin123
echo   driver@wns.com / driver123
echo   employee@wns.com / employee123
echo.

:: Auto-open browser
start http://localhost:3000

echo Press any key to stop services...
pause >nul

:: Cleanup
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1
echo ✅ Services stopped
pause