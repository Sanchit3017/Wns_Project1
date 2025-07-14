#!/bin/bash

# WNS Bangalore Travel Management System - Complete System Startup
echo "🏢 WNS Bangalore Travel Management System"
echo "=========================================="
echo ""

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to wait for a service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Waiting for $service_name to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" >/dev/null 2>&1; then
            echo "✅ $service_name is ready!"
            return 0
        fi
        
        echo "   Attempt $attempt/$max_attempts - $service_name not ready yet..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "❌ $service_name failed to start within timeout"
    return 1
}

echo "🔍 Checking system requirements..."

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ and try again."
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check pip
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip3 and try again."
    exit 1
fi

echo "✅ System requirements satisfied"
echo ""

# Check if ports are available
echo "🔍 Checking port availability..."
ports=(8000 8001 8002 8003 8004 3000)
port_names=("API Gateway" "Auth Service" "User Service" "Trip Service" "Notification Service" "Frontend")

for i in "${!ports[@]}"; do
    port="${ports[$i]}"
    name="${port_names[$i]}"
    
    if check_port $port; then
        echo "⚠️  Port $port ($name) is already in use"
        read -p "Do you want to continue anyway? (y/N): " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "❌ Startup cancelled"
            exit 1
        fi
    else
        echo "✅ Port $port ($name) is available"
    fi
done

echo ""
echo "🚀 Starting Backend Services..."

# Start backend services in background
if [ -f "run_microservices.py" ]; then
    echo "📡 Starting microservices..."
    python3 run_microservices.py &
    BACKEND_PID=$!
    echo "✅ Backend services started (PID: $BACKEND_PID)"
else
    echo "❌ Backend startup script not found. Make sure you're in the project root directory."
    exit 1
fi

# Wait for API Gateway to be ready
echo ""
echo "⏳ Waiting for backend services to initialize..."
sleep 5

if wait_for_service "http://localhost:8000/health" "API Gateway"; then
    echo "✅ Backend services are ready!"
else
    echo "❌ Backend services failed to start"
    echo "💡 Try running the backend manually with: python3 run_microservices.py"
    exit 1
fi

echo ""
echo "🎨 Starting Frontend..."

# Check if frontend directory exists
if [ -d "frontend" ]; then
    cd frontend
    
    # Make start script executable
    chmod +x start.sh
    
    # Start frontend
    ./start.sh &
    FRONTEND_PID=$!
    
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
    
    # Wait for frontend to be ready
    sleep 10
    
    if wait_for_service "http://localhost:3000" "Frontend"; then
        echo "✅ Frontend is ready!"
    else
        echo "⚠️  Frontend may still be starting up..."
    fi
    
    cd ..
else
    echo "❌ Frontend directory not found"
    exit 1
fi

echo ""
echo "🎉 WNS Bangalore Travel Management System is now running!"
echo "=========================================================="
echo ""
echo "🌐 Application URLs:"
echo "   Frontend:    http://localhost:3000"
echo "   API Gateway: http://localhost:8000"
echo "   API Docs:    http://localhost:8000/docs"
echo ""
echo "🔑 Demo Login Credentials:"
echo "   Admin:    admin@wns.com    / admin123"
echo "   Driver:   driver@wns.com   / driver123" 
echo "   Employee: employee@wns.com / employee123"
echo ""
echo "📊 Service Status:"
echo "   - Auth Service:         http://localhost:8001"
echo "   - User Service:         http://localhost:8002"
echo "   - Trip Service:         http://localhost:8003"
echo "   - Notification Service: http://localhost:8004"
echo ""
echo "🛠️  Development Tools:"
echo "   - Backend Logs: Check terminal where run_microservices.py is running"
echo "   - Frontend Logs: Check browser developer console"
echo "   - API Testing: Use http://localhost:8000/docs (FastAPI auto-docs)"
echo ""
echo "⚠️  Important Notes:"
echo "   - Keep this terminal open to maintain services"
echo "   - Press Ctrl+C to stop all services"
echo "   - Frontend will auto-reload on code changes"
echo "   - Backend requires manual restart for changes"
echo ""
echo "🎯 Quick Start Guide:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Click on any demo role (Admin/Driver/Employee)"
echo "   3. Explore the role-specific dashboard"
echo "   4. Test trip creation and management features"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    
    if [ ! -z "$BACKEND_PID" ]; then
        echo "   Stopping backend services..."
        kill $BACKEND_PID 2>/dev/null
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        echo "   Stopping frontend..."
        kill $FRONTEND_PID 2>/dev/null
    fi
    
    # Kill any remaining processes on our ports
    for port in "${ports[@]}"; do
        if check_port $port; then
            echo "   Cleaning up port $port..."
            lsof -ti:$port | xargs kill -9 2>/dev/null
        fi
    done
    
    echo "✅ All services stopped"
    echo "👋 Thank you for using WNS Bangalore Travel Management System!"
}

# Set up signal handlers
trap cleanup EXIT INT TERM

# Keep the script running and show logs
echo "📝 System is running. Press Ctrl+C to stop all services."
echo "   Monitoring services..."
echo ""

# Monitor services
while true; do
    sleep 30
    
    # Check if services are still running
    if ! check_port 8000; then
        echo "⚠️  API Gateway appears to be down"
    fi
    
    if ! check_port 3000; then
        echo "⚠️  Frontend appears to be down"
    fi
done