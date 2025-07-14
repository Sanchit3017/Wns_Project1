#!/bin/bash

# WNS Bangalore Travel Management System - Frontend Startup Script
echo "🚀 Starting WNS Bangalore Travel Management System Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="16.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is not supported. Please install Node.js 16+ and try again."
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the frontend directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies. Please check your internet connection and try again."
        exit 1
    fi
    echo "✅ Dependencies installed successfully!"
else
    echo "✅ Dependencies already installed"
fi

# Check if .env file exists, if not create one
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
# WNS Bangalore Travel Management System - Frontend Environment
REACT_APP_API_URL=http://localhost:8000
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=false
EOL
    echo "✅ .env file created with default settings"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎯 Frontend Configuration:"
echo "   - API URL: http://localhost:8000"
echo "   - Frontend URL: http://localhost:3000"
echo "   - Environment: Development"
echo ""
echo "🔑 Demo Credentials:"
echo "   - Admin: admin@wns.com / admin123"
echo "   - Driver: driver@wns.com / driver123"
echo "   - Employee: employee@wns.com / employee123"
echo ""
echo "⚠️  Make sure your backend services are running:"
echo "   - API Gateway: http://localhost:8000"
echo "   - Auth Service: http://localhost:8001"
echo "   - User Service: http://localhost:8002"
echo "   - Trip Service: http://localhost:8003"
echo "   - Notification Service: http://localhost:8004"
echo ""
echo "🚀 Starting React development server..."
echo "   Opening browser at http://localhost:3000"
echo ""
echo "📝 Development Tips:"
echo "   - Press Ctrl+C to stop the server"
echo "   - Changes will automatically reload the browser"
echo "   - Check browser console for any errors"
echo ""

# Start the development server
npm start