# Running WNS Bangalore Travel Management System in VS Code

## 🎯 Quick Start from VS Code

### Prerequisites Check
Make sure you have installed:
- **Python 3.8+** - Check with: `python --version`
- **Node.js 16+** - Check with: `node --version`
- **npm** - Check with: `npm --version`

## 🚀 Method 1: Automated Startup (Easiest)

### Step 1: Open VS Code Terminal
- Press `Ctrl + `` (Ctrl + Backtick)
- Or: **Terminal** → **New Terminal**

### Step 2: Verify Location
```bash
pwd
ls -la
```
You should see `pyproject.toml` and `frontend/` directory.

### Step 3: Run Automated Script

**For Linux/Mac:**
```bash
./start_complete_system.sh
```

**For Windows:**
```cmd
start_wns_system.bat
```

## 🔧 Method 2: Manual Setup (Step by Step)

### Step 1: Install Python Dependencies
```bash
pip install fastapi uvicorn sqlalchemy pydantic aiofiles email-validator httpx jinja2 passlib psycopg2-binary pydantic-settings python-jose python-multipart requests
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Step 3: Start Backend Services
```bash
python run_microservices.py
```
**Keep this terminal open** - backend will run here.

### Step 4: Start Frontend (New Terminal)
- Open a **new terminal** in VS Code (`Ctrl + Shift + `` )
- Run:
```bash
cd frontend
npm start
```

## 🎯 Method 3: Using VS Code Tasks (Professional)

### Step 1: Create VS Code Tasks
Create `.vscode/tasks.json` in your project root:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Start Backend",
            "type": "shell",
            "command": "python",
            "args": ["run_microservices.py"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "new",
                "showReuseMessage": true,
                "clear": false
            },
            "isBackground": true,
            "problemMatcher": []
        },
        {
            "label": "Start Frontend",
            "type": "shell",
            "command": "npm",
            "args": ["start"],
            "options": {
                "cwd": "${workspaceFolder}/frontend"
            },
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "new",
                "showReuseMessage": true,
                "clear": false
            },
            "isBackground": true,
            "problemMatcher": []
        },
        {
            "label": "Start Complete System",
            "dependsOrder": "parallel",
            "dependsOn": ["Start Backend", "Start Frontend"],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

### Step 2: Run Tasks
- Press `Ctrl + Shift + P`
- Type: "Tasks: Run Task"
- Select: "Start Complete System"

## 🔌 Method 4: Using VS Code Extensions

### Recommended Extensions:
1. **Python** (by Microsoft)
2. **JavaScript (ES6) code snippets**
3. **ES7+ React/Redux/React-Native snippets**
4. **Live Server** (for additional testing)
5. **Thunder Client** (for API testing)

### Using Python Extension:
1. Open `run_microservices.py`
2. Click **Run Python File** button (▷)

### Using Integrated Terminal:
1. Use **split terminal** for backend and frontend
2. **Terminal** → **Split Terminal**

## 🌐 Access Your Application

Once running, access:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Health Check**: http://localhost:8000/health

## 🔑 Demo Credentials

| Role | Email | Password | Features |
|------|-------|----------|----------|
| **Admin** | admin@wns.com | admin123 | Analytics, user management |
| **Driver** | driver@wns.com | driver123 | Trip assignments, routes |
| **Employee** | employee@wns.com | employee123 | Trip requests, schedules |

## 🐛 Debugging in VS Code

### Backend Debugging:
1. Open `run_microservices.py`
2. Set breakpoints (click left margin)
3. Press `F5` to start debugging
4. Choose **Python File**

### Frontend Debugging:
1. Install **Debugger for Chrome** extension
2. Set breakpoints in `.js`/`.jsx` files
3. Use VS Code's built-in debugger

## 🔧 VS Code Settings for Better Development

Create `.vscode/settings.json`:
```json
{
    "python.defaultInterpreterPath": "python",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "editor.formatOnSave": true,
    "files.exclude": {
        "**/__pycache__": true,
        "**/node_modules": true,
        "**/.git": true
    },
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    }
}
```

## 📋 VS Code Workspace Setup

### Create Multi-Root Workspace:
1. **File** → **Add Folder to Workspace**
2. Add both root directory and frontend directory
3. **File** → **Save Workspace As** → `wns-travel-system.code-workspace`

## 🚨 Troubleshooting in VS Code

### Common Issues:

#### 1. Python not found
```bash
# Check Python installation
which python
python --version

# If not found, install Python and add to PATH
```

#### 2. Node.js not found
```bash
# Check Node installation  
which node
node --version

# Install from nodejs.org if needed
```

#### 3. Port already in use
```bash
# Kill existing processes
pkill -f python
pkill -f node

# Or for Windows:
# taskkill /f /im python.exe
# taskkill /f /im node.exe
```

#### 4. Module not found errors
```bash
# Reinstall dependencies
pip install -r requirements.txt
cd frontend && npm install
```

#### 5. VS Code terminal issues
- **Terminal** → **New Terminal**
- Try different shell: **Terminal** → **Select Default Profile**
- Restart VS Code

## 🎯 Pro Tips for VS Code Development

### 1. Use Multiple Terminals
- `Ctrl + Shift + `` - New terminal
- `Ctrl + `` - Toggle terminal
- **Split terminal** for backend/frontend

### 2. Quick Commands
- `Ctrl + Shift + P` - Command palette
- `Ctrl + P` - Quick file open
- `F5` - Start debugging

### 3. Extensions for Better Experience
- **Auto Rename Tag**
- **Bracket Pair Colorizer**
- **GitLens**
- **REST Client** (for API testing)

### 4. Keyboard Shortcuts
- `Ctrl + `` - Toggle terminal
- `Ctrl + B` - Toggle sidebar
- `Ctrl + J` - Toggle panel
- `F11` - Toggle fullscreen

## ✅ Verification Checklist

When everything is running correctly, you should see:

- [ ] VS Code terminal shows backend starting
- [ ] Another terminal shows frontend compiling
- [ ] Browser opens to http://localhost:3000
- [ ] Login page displays properly
- [ ] Can log in with demo credentials
- [ ] All three role dashboards work
- [ ] No console errors in browser
- [ ] Backend health check responds: http://localhost:8000/health

## 🎉 Success!

You now have the **WNS Bangalore Travel Management System** running in VS Code with:
- ✅ Professional development environment
- ✅ Integrated debugging capabilities
- ✅ Multiple development workflows
- ✅ Full-stack application ready for development

Happy coding! 🚀