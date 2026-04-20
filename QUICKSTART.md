# 🚀 Quick Start Guide

## Running the Complete Application

### Option 1: Manual Start (Recommended for Development)

#### Terminal 1 - Backend
```bash
cd campuscraft-backend
node server.js
```

The backend will start on `http://localhost:3000`

#### Terminal 2 - Frontend
```bash
cd campuscraft-frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Option 2: Using nodemon for Backend (Auto-restart)
```bash
cd campuscraft-backend
npx nodemon server.js
```

## First Time Setup

### 1. Backend Setup
```bash
cd campuscraft-backend
npm install
```

Make sure your `.env` file exists with:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/campuscraft
JWT_SECRET=your_secret_key_here
```

### 2. Frontend Setup
```bash
cd campuscraft-frontend
npm install
```

## Testing the Application

### 1. Open Your Browser
Navigate to: `http://localhost:5173`

### 2. Register a Test Account
- Click "Sign Up"
- Enter name: `Test User`
- Enter email: `test@college.edu` (must end with @college.edu)
- Enter password: `password123`
- Click "Create Account"

### 3. Login
- Use the credentials you just created
- Email: `test@college.edu`
- Password: `password123`

### 4. Test Features

#### Add a Product
1. Click "Sell Item" in the navbar
2. Fill in product details:
   - Title: `Calculus Textbook`
   - Description: `Brand new, barely used`
   - Price: `50`
   - Category: `Books`
   - Image URL: (optional) any image URL
   - Check "Allow Barter/Swap" if you want to enable swaps
3. Click "List Product"

#### Browse Products
- Use the search bar to find products
- Filter by category
- View product details

#### Make a Request
1. Find a product (create a second account to test this properly)
2. Click "Buy" or "Swap" button
3. View your request in "My Requests"

#### Manage Requests (As Seller)
1. Click "Received" in navbar
2. View incoming requests
3. Approve or reject requests

## Default Test Accounts

You'll need to create your own accounts. Remember:
- Email must end with `@college.edu`
- Password must be at least 6 characters

### Example Test Accounts to Create:

**Account 1 (Seller):**
- Name: `Alice Smith`
- Email: `alice@college.edu`
- Password: `password123`

**Account 2 (Buyer):**
- Name: `Bob Johnson`
- Email: `bob@college.edu`
- Password: `password123`

## Troubleshooting

### Backend Issues

**Error: MongoDB connection failed**
- Check your `MONGO_URI` in `.env`
- Ensure MongoDB Atlas allows your IP address
- Test connection string in MongoDB Compass

**Error: Port 3000 already in use**
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

### Frontend Issues

**Error: Cannot connect to backend**
- Ensure backend is running on port 3000
- Check console for CORS errors
- Verify API URL in `src/services/api.js`

**Error: Port 5173 already in use**
```bash
# Kill process on port 5173
lsof -i :5173
kill -9 <PID>
```

**Blank page/White screen**
- Check browser console for errors
- Clear browser cache and localStorage
- Try incognito mode

### Common Issues

**"Use college email only" error**
- Email must end with `@college.edu`
- Example: `yourname@college.edu`

**"User already exists"**
- Email is already registered
- Try logging in instead or use a different email

**Cannot send request**
- Make sure you're logged in
- Cannot request your own products
- Product may already be sold

**Requests not showing**
- Refresh the page
- Check if you're logged in with correct account
- Ensure requests were created successfully

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: Use `npx nodemon server.js` for auto-restart

### Testing Multiple Users
Open multiple browser profiles/incognito windows to test buyer-seller interactions:
1. Chrome Profile 1: Seller account
2. Chrome Profile 2: Buyer account
3. Test product listing, requests, and approvals

### Browser DevTools
Press `F12` to open DevTools:
- **Console**: Check for errors
- **Network**: Monitor API calls
- **Application > Local Storage**: View stored tokens

### API Testing with Postman/Thunder Client

Test backend endpoints directly:

**Register:**
```
POST http://localhost:3000/api/auth/register
Body: {
  "name": "Test User",
  "email": "test@college.edu",
  "password": "password123"
}
```

**Login:**
```
POST http://localhost:3000/api/auth/login
Body: {
  "email": "test@college.edu",
  "password": "password123"
}
```

**Get Products:**
```
GET http://localhost:3000/api/products
```

## Production Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables
2. Deploy from GitHub
3. Update frontend API URL

### Frontend Deployment (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Update API URL to production backend

## Need Help?

- Check the main `README.md` for detailed documentation
- Review the code comments
- Check console logs for errors
- Ensure both backend and frontend are running

---

**Happy Coding! 🎉**
