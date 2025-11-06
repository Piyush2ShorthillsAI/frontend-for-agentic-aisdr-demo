# Frontend Setup Guide

This guide will help you set up and run the AI SDR Insights Dashboard.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
  - Check: `node --version`
  - Download: https://nodejs.org/

- **npm** (usually comes with Node.js)
  - Check: `npm --version`

- **Backend API** running on port 8000
  - The dashboard requires the backend API to be running

## 🚀 Step-by-Step Setup

### Step 1: Install Dependencies

```bash
# Navigate to the frontend directory
cd /path/to/project/frontend

# Install all dependencies
npm install
```

This will install all required packages including:
- React
- React Router
- Axios
- Recharts
- Lucide Icons
- Vite

### Step 2: Configure Environment

The frontend needs to know where your backend API is running.

**Option A: Use default settings**
The frontend is pre-configured to connect to `http://localhost:8000/api`

**Option B: Custom configuration**
Create a `.env` file in the frontend directory:

```bash
# Create .env file
touch .env

# Add your API URL
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env
```

### Step 3: Start Development Server

```bash
npm run dev
```

The dashboard will start on `http://localhost:3000`

You should see output like:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.x:3000/
```

### Step 4: Access the Dashboard

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the dashboard homepage with navigation to:
- Dashboard Overview
- Sender Performance
- Campaign Analytics
- Funnel Analysis

## 🔧 Troubleshooting

### Issue: Dependencies won't install

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Port 3000 is already in use

**Solution 1:** Kill the process using port 3000
```bash
# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution 2:** Use a different port
```bash
# Edit vite.config.js and change the port
server: {
  port: 3001,  // Change to any available port
}
```

### Issue: "Cannot connect to API" error

**Checklist:**
1. ✅ Backend is running on port 8000
   ```bash
   curl http://localhost:8000/api/insights/overview
   ```

2. ✅ `.env` file has correct API URL
   ```bash
   cat .env
   # Should show: VITE_API_BASE_URL=http://localhost:8000/api
   ```

3. ✅ CORS is enabled on backend
   - Backend should allow requests from `http://localhost:3000`

4. ✅ Check browser console for errors
   - Press F12 in browser
   - Look for network errors in Console tab

### Issue: Blank page or white screen

**Solution:**
```bash
# Check browser console (F12)
# Common causes:
# 1. JavaScript error - fix the error shown in console
# 2. Missing environment variables - check .env file
# 3. Build cache issue - clear cache and rebuild

# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

### Issue: Hot reload not working

**Solution:**
```bash
# Restart the dev server
# Press Ctrl+C to stop
# Run again:
npm run dev
```

## 🏗️ Building for Production

### Step 1: Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Step 2: Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

### Step 3: Deploy

The `build/` directory contains all static files ready for deployment:

**Deploy to common platforms:**

**Nginx:**
```bash
# Copy build files to nginx
cp -r build/* /var/www/html/
```

**Apache:**
```bash
# Copy build files to apache
cp -r build/* /var/www/html/
```

**Cloud Services:**
- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `build/` folder
- **AWS S3**: Upload to S3 bucket and enable static hosting

## 📊 Verifying Setup

### Test Backend Connection

```bash
# Test if backend is accessible
curl http://localhost:8000/api/insights/overview

# Expected: JSON response with metrics data
```

### Test Frontend

1. Open `http://localhost:3000/dashboard`
2. You should see:
   - Metric cards with numbers
   - Top campaigns table
   - No error messages

### Test API Integration

Open browser console (F12) and check Network tab:
- Should see successful API calls (status 200)
- Should see data being loaded
- No CORS errors

## 🎯 Next Steps

After successful setup:

1. **Explore the Dashboard**: Navigate through all pages
2. **Check Data**: Verify metrics are displaying correctly
3. **Test Filters**: Try different date ranges
4. **Responsive Design**: Check on different screen sizes
5. **Customization**: Modify colors, layouts as needed

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Recharts Documentation](https://recharts.org/)
- Backend API Documentation: Check main project README

## 🆘 Getting Help

If you encounter issues not covered here:

1. Check the main README.md
2. Review backend logs for API errors
3. Check browser console for frontend errors
4. Verify all prerequisites are installed
5. Contact the development team

## ✅ Setup Checklist

- [ ] Node.js 16+ installed
- [ ] npm installed
- [ ] Backend API running on port 8000
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured (if needed)
- [ ] Dev server running (`npm run dev`)
- [ ] Dashboard accessible at http://localhost:3000
- [ ] API calls successful (check browser console)
- [ ] Data displaying correctly

---

🎉 **Congratulations!** Your dashboard is now set up and running!


