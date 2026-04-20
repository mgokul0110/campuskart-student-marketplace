# ✅ CampusCraft Setup Checklist

## 📋 Pre-Launch Checklist

### Backend Setup
- [ ] Navigate to `campuscraft-backend` directory
- [ ] Check `.env` file exists with `MONGO_URI` and `JWT_SECRET`
- [ ] MongoDB Atlas cluster is running
- [ ] IP address whitelisted in MongoDB Atlas
- [ ] Run `npm install` (if not done)
- [ ] Test MongoDB connection
- [ ] Start server with `node server.js`
- [ ] Verify "Server running on port 3000" message
- [ ] Verify "MongoDB Connected" message
- [ ] Test API endpoint: http://localhost:3000

### Frontend Setup
- [ ] Navigate to `campuscraft-frontend` directory
- [ ] Run `npm install` (if not done)
- [ ] Verify `node_modules` directory exists
- [ ] Check API URL in `src/services/api.js` (http://localhost:3000)
- [ ] Start dev server with `npm run dev`
- [ ] Verify server starts on port 5173
- [ ] Browser opens automatically
- [ ] No console errors in browser DevTools

### Initial Testing
- [ ] Homepage loads successfully
- [ ] Navbar displays correctly
- [ ] Login/Register buttons visible
- [ ] Click "Sign Up" - Register page loads
- [ ] Click "Login" - Login page loads
- [ ] No 404 errors in Network tab

---

## 🧪 Feature Testing Checklist

### Authentication
- [ ] Register new user with `@college.edu` email
- [ ] Try registering with non-college email (should fail)
- [ ] Login with created credentials
- [ ] Verify user name appears in navbar
- [ ] Verify user rating displayed
- [ ] Refresh page - still logged in
- [ ] Logout successfully
- [ ] Verify redirect to login page

### Product Listing
- [ ] Click "Sell Item" in navbar
- [ ] Fill product form with all fields
- [ ] Toggle "Allow Barter" checkbox
- [ ] Submit product
- [ ] Product appears on homepage
- [ ] Your name shows as seller
- [ ] Product marked as "Available"

### Browsing Products
- [ ] Homepage displays all products
- [ ] Search bar works
- [ ] Category filter works
- [ ] Products show images (or placeholder)
- [ ] Price displayed correctly
- [ ] Seller info visible
- [ ] Ratings display properly

### Request Management
- [ ] Create second account (buyer)
- [ ] Click "Buy" on product
- [ ] Request appears in "My Requests"
- [ ] Status shows "Pending"
- [ ] Switch to seller account
- [ ] Request appears in "Received"
- [ ] Buyer info displayed
- [ ] Click "Approve"
- [ ] Product marked as "Sold"
- [ ] Switch to buyer account
- [ ] Status shows "Approved"

### UI/UX
- [ ] All buttons have hover effects
- [ ] Loading spinners display during operations
- [ ] Success messages show after actions
- [ ] Error messages display when needed
- [ ] Empty states show helpful messages
- [ ] 404 page works for invalid routes
- [ ] Mobile view is responsive
- [ ] Tablet view is responsive

---

## 🔧 Troubleshooting Checklist

### Backend Issues

**MongoDB Connection Failed**
- [ ] Check MONGO_URI format in `.env`
- [ ] Verify MongoDB Atlas cluster is running
- [ ] Confirm IP address is whitelisted
- [ ] Test connection with MongoDB Compass
- [ ] Check network/firewall settings

**Port 3000 Already in Use**
- [ ] Find process: `lsof -i :3000`
- [ ] Kill process: `kill -9 <PID>`
- [ ] Restart backend server

**JWT Errors**
- [ ] Verify JWT_SECRET is set in `.env`
- [ ] Check token format in requests
- [ ] Ensure token not expired (24h default)
- [ ] Clear localStorage and re-login

### Frontend Issues

**Cannot Connect to Backend**
- [ ] Backend server is running
- [ ] Check URL in `src/services/api.js`
- [ ] Verify CORS enabled in backend
- [ ] Check Network tab for errors

**Build Errors**
- [ ] Run `npm install` again
- [ ] Delete `node_modules` and reinstall
- [ ] Check for syntax errors
- [ ] Verify all imports are correct

**White Screen / Blank Page**
- [ ] Check browser console for errors
- [ ] Clear browser cache
- [ ] Try incognito mode
- [ ] Verify `index.html` loads

**Authentication Issues**
- [ ] Clear localStorage: `localStorage.clear()`
- [ ] Delete cookies
- [ ] Refresh page
- [ ] Login again

---

## 📊 Daily Development Checklist

### Starting Work
- [ ] Pull latest code (if using git)
- [ ] Check `.env` file exists
- [ ] Start MongoDB (if local)
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Verify both running
- [ ] Check for console errors

### During Development
- [ ] Save files regularly
- [ ] Check browser console
- [ ] Test changes immediately
- [ ] Clear cache if issues
- [ ] Monitor Network tab

### Before Committing (if using git)
- [ ] Test all features work
- [ ] No console errors
- [ ] No console warnings
- [ ] Build succeeds
- [ ] Remove debug code
- [ ] Update documentation
- [ ] Commit with clear message

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Production build works
- [ ] Environment variables documented
- [ ] Database backed up
- [ ] API URLs configured for production

### Backend Deployment
- [ ] Choose hosting (Railway/Render/Heroku)
- [ ] Set environment variables
- [ ] Deploy from repository
- [ ] Test API endpoints
- [ ] Verify database connection
- [ ] Check logs for errors

### Frontend Deployment
- [ ] Choose hosting (Vercel/Netlify)
- [ ] Update API URL to production backend
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `dist`
- [ ] Deploy from repository
- [ ] Test deployed site
- [ ] Verify all features work

### Post-Deployment
- [ ] Test registration
- [ ] Test login
- [ ] Test product listing
- [ ] Test requests
- [ ] Monitor error logs
- [ ] Check analytics (if enabled)

---

## 📱 Testing Matrix

### Browsers
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Screen Sizes
- [ ] Mobile (< 640px)
- [ ] Tablet (640-1024px)
- [ ] Desktop (> 1024px)
- [ ] Large Desktop (> 1440px)

### Features by Role

**Guest User**
- [ ] View products
- [ ] Search products
- [ ] Filter by category
- [ ] Register account
- [ ] Login

**Logged-in User (Buyer)**
- [ ] All guest features
- [ ] Send buy requests
- [ ] Send swap requests
- [ ] View my requests
- [ ] Track request status
- [ ] List products

**Logged-in User (Seller)**
- [ ] All buyer features
- [ ] View received requests
- [ ] Approve requests
- [ ] Reject requests
- [ ] See products marked sold

---

## 🎯 Performance Checklist

### Load Time
- [ ] Homepage loads < 3 seconds
- [ ] Subsequent pages load < 1 second
- [ ] Images load progressively
- [ ] No layout shift during load

### API Performance
- [ ] Product list loads quickly
- [ ] Requests fetch fast
- [ ] Form submissions instant
- [ ] No timeout errors

### Optimization
- [ ] Images optimized
- [ ] CSS minified in production
- [ ] JS bundled and minified
- [ ] No unused dependencies

---

## 📝 Documentation Checklist

### Files Created
- [ ] README.md
- [ ] QUICKSTART.md
- [ ] FEATURES.md
- [ ] TESTING.md
- [ ] ARCHITECTURE.md
- [ ] PROJECT_SUMMARY.md
- [ ] CHECKLIST.md (this file)
- [ ] Frontend README.md

### Documentation Quality
- [ ] Setup instructions clear
- [ ] All features documented
- [ ] Code examples provided
- [ ] Troubleshooting section included
- [ ] Screenshots/diagrams helpful

---

## ✨ Final Launch Checklist

### Code Quality
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Consistent naming conventions
- [ ] Proper error handling
- [ ] Loading states everywhere
- [ ] Input validation present

### Security
- [ ] Passwords hashed
- [ ] JWT tokens used correctly
- [ ] Protected routes enforced
- [ ] SQL injection prevented
- [ ] XSS protection in place
- [ ] CORS configured properly

### User Experience
- [ ] Intuitive navigation
- [ ] Clear error messages
- [ ] Helpful empty states
- [ ] Consistent design
- [ ] Smooth transitions
- [ ] Responsive on all devices

### Business Logic
- [ ] Email validation works
- [ ] Cannot request own products
- [ ] Cannot request sold products
- [ ] Product status updates correctly
- [ ] Request status transitions properly
- [ ] Ratings display accurately

---

## 🎉 Success Criteria

Your CampusCraft application is ready when:

- ✅ Backend runs without errors
- ✅ Frontend builds successfully
- ✅ Users can register and login
- ✅ Products can be listed and viewed
- ✅ Requests can be sent and managed
- ✅ All pages are responsive
- ✅ No console errors
- ✅ Documentation is complete
- ✅ Ready for deployment

---

**Use this checklist to ensure everything is working perfectly!** 🚀
