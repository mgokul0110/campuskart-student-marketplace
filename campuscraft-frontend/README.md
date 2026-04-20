# CampusCraft Frontend

A modern, professional frontend for the CampusCraft campus marketplace platform.

## Features

- 🎨 **Modern UI** - Clean, professional design with TailwindCSS
- 🔐 **Authentication** - Secure login and registration with college email validation
- 🛍️ **Product Marketplace** - Browse, search, and filter products
- 📦 **Sell Items** - Easy product listing with categories and barter options
- 💱 **Buy & Swap** - Support for both purchase and barter transactions
- 📨 **Request Management** - Track your requests and manage incoming offers
- ⭐ **User Ratings** - View seller ratings for trusted transactions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:3000`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd campuscraft-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

### Backend Setup

Make sure your backend server is running on `http://localhost:3000`. The frontend expects the following API endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products` - Get all products
- `POST /api/products/add` - Add new product (protected)
- `POST /api/requests/create` - Create buy/swap request (protected)
- `GET /api/requests/my-requests` - Get user's requests (protected)
- `GET /api/requests/received` - Get received requests (protected)
- `PUT /api/requests/status/:id` - Update request status (protected)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation bar component
│   └── ProtectedRoute.jsx   # Route protection wrapper
├── context/
│   └── AuthContext.jsx      # Authentication context
├── pages/
│   ├── Login.jsx            # Login page
│   ├── Register.jsx         # Registration page
│   ├── Home.jsx             # Product marketplace
│   ├── AddProduct.jsx       # Add product form
│   ├── MyRequests.jsx       # User's requests
│   └── ReceivedRequests.jsx # Incoming requests
├── services/
│   └── api.js               # API service layer
├── App.jsx                  # Main app component
├── main.jsx                 # App entry point
└── index.css                # Global styles
```

## Features Overview

### For Buyers
- Browse available products with search and category filters
- View product details including seller ratings
- Send purchase requests or swap offers
- Track request status (pending, approved, rejected)

### For Sellers
- List products with images, descriptions, and categories
- Enable/disable barter options
- Receive and manage incoming requests
- Approve or reject offers

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Configuration

The API base URL is configured in `src/services/api.js`. Update it if your backend runs on a different port:

```javascript
const API_URL = 'http://localhost:3000/api';
```

## Design Highlights

- **Color Scheme**: Professional blue theme with primary-600 (#2563eb)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Reusable button styles (btn-primary, btn-secondary, btn-outline)
- **Cards**: Elevated cards with subtle shadows and hover effects
- **Icons**: Lucide React icons for consistent visual language
- **Forms**: Well-styled input fields with focus states
- **Responsive**: Mobile-first approach with Tailwind breakpoints

## Authentication

The app uses JWT token-based authentication:
- Tokens are stored in localStorage
- Auto-login on page refresh if valid token exists
- Protected routes redirect to login if not authenticated
- Logout clears token and user data

## License

MIT
