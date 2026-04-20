# 🗺️ CampusCraft Application Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│                    http://localhost:5173                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP Requests (axios)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    REACT FRONTEND                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Pages: Login, Register, Home, AddProduct,             │ │
│  │         MyRequests, ReceivedRequests, NotFound         │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Components: Navbar, ProtectedRoute                     │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Context: AuthContext (Global State)                    │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Services: API Client (axios with interceptors)         │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ API Calls (JWT Token)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   EXPRESS BACKEND API                        │
│                   http://localhost:3000                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Routes:                                                │ │
│  │  • /api/auth/register    (POST)                        │ │
│  │  • /api/auth/login       (POST)                        │ │
│  │  • /api/products         (GET)                         │ │
│  │  • /api/products/add     (POST - Protected)            │ │
│  │  • /api/requests/create  (POST - Protected)            │ │
│  │  • /api/requests/my-requests (GET - Protected)         │ │
│  │  • /api/requests/received    (GET - Protected)         │ │
│  │  • /api/requests/status/:id  (PUT - Protected)         │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Middleware: authMiddleware (JWT Verification)          │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Mongoose ODM
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    MONGODB DATABASE                          │
│                   MongoDB Atlas / Local                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Collections:                                           │ │
│  │  • users      - User accounts with ratings              │ │
│  │  • products   - Listed items for sale/swap              │ │
│  │  • requests   - Buy/swap requests                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## User Journey Flow

### 1. New User Registration
```
User → Register Page → Fill Form → Backend validates email
→ Password hashed → User saved to DB → Redirect to Login
```

### 2. User Login
```
User → Login Page → Enter credentials → Backend verifies
→ JWT token generated → Token stored in localStorage
→ User data stored → Redirect to Home
```

### 3. Browse Products
```
Home Page → Fetch all products → Display in grid
→ Search/Filter → Real-time filtering → Click product
→ View details (seller, price, category, rating)
```

### 4. List Product (Seller)
```
Click "Sell Item" → Add Product Page → Fill form
→ Submit → Backend validates → Product saved to DB
→ Redirect to Home → Product visible to all users
```

### 5. Make Request (Buyer)
```
Find product → Click "Buy" or "Swap" → Request created
→ Saved to DB → Success message → View in "My Requests"
→ Track status (pending/approved/rejected)
```

### 6. Manage Request (Seller)
```
"Received" tab → View incoming requests → See buyer info
→ Click "Approve" or "Reject" → Status updated in DB
→ If approved: Product marked as sold
→ Buyer sees updated status
```

---

## Data Relationships

```
User (1) ──── (Many) Products (as seller)
  │
  └──────── (Many) Requests (as buyer)

Product (1) ──── (Many) Requests
  │
  └──────── (1) User (seller reference)

Request (1) ──── (1) Product
  │
  └──────── (1) User (buyer reference)
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. User Login                                              │
│     • POST /api/auth/login with email & password           │
│     • Backend verifies credentials                          │
│     • JWT token generated with user ID                      │
│     • Token sent back to frontend                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│  2. Token Storage                                           │
│     • Frontend stores token in localStorage                 │
│     • Token added to axios default headers                  │
│     • User data stored for UI display                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│  3. Protected API Calls                                     │
│     • Token automatically included in request headers       │
│     • Backend middleware verifies token                     │
│     • User ID extracted from token                          │
│     • Request processed if valid                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│  4. Session Persistence                                     │
│     • On page refresh: Check localStorage                   │
│     • If token exists: Auto-login                           │
│     • If no token: Redirect to login                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Request Lifecycle

```
Product Listed (Available)
        │
        ▼
Buyer Sends Request
        │
        ├─── Type: "buy" or "swap"
        └─── Status: "pending"
        │
        ▼
Seller Reviews Request
        │
        ├────────┬────────┐
        │        │        │
        ▼        ▼        ▼
    Approve   Reject   Ignore
        │        │        │
        │        │        └─── Status: "pending" (remains)
        │        │
        │        └──────────── Status: "rejected"
        │                      Product: Still available
        │
        └───────────────────── Status: "approved"
                               Product: isAvailable = false
                               No more requests accepted
```

---

## Component Hierarchy

```
App.jsx
  │
  ├── AuthProvider (Context)
  │     └── Provides: user, token, login, register, logout
  │
  ├── Router
      │
      ├── Navbar (Always Visible)
      │     ├── Logo → Home
      │     ├── Sell Item → AddProduct (if logged in)
      │     ├── My Requests → MyRequests (if logged in)
      │     ├── Received → ReceivedRequests (if logged in)
      │     ├── User Info (if logged in)
      │     └── Login/Register buttons (if not logged in)
      │
      └── Routes
            ├── / → Home (Public)
            ├── /login → Login (Public)
            ├── /register → Register (Public)
            ├── /add-product → AddProduct (Protected)
            ├── /my-requests → MyRequests (Protected)
            ├── /received-requests → ReceivedRequests (Protected)
            └── /* → NotFound (Public)
```

---

## State Management

### Global State (AuthContext)
```javascript
{
  user: {
    id: "user_id",
    name: "User Name",
    email: "user@college.edu",
    rating: 5
  },
  token: "jwt_token_string",
  loading: false
}
```

### Local State Examples

**Home Page:**
```javascript
{
  products: [],           // All products from API
  filteredProducts: [],   // After search/filter
  searchTerm: "",
  selectedCategory: "all",
  loading: true,
  requestLoading: {}      // Per-product loading
}
```

**AddProduct Page:**
```javascript
{
  formData: {
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    barterAllowed: false
  },
  loading: false,
  error: ""
}
```

---

## API Request Flow Example

### Creating a Buy Request
```
1. User clicks "Buy" button
   ↓
2. handleRequest(productId, "buy") called
   ↓
3. requestAPI.create(productId, "buy")
   ↓
4. axios.post("/requests/create", {
     productId: "abc123",
     type: "buy"
   }, {
     headers: { Authorization: "Bearer jwt_token" }
   })
   ↓
5. Backend receives request
   ↓
6. authMiddleware verifies token
   ↓
7. Extract user ID from token
   ↓
8. Validate:
   - Product exists
   - Product not sold
   - Not requesting own product
   ↓
9. Create request in database:
   {
     product: "abc123",
     buyer: "user_id",
     type: "buy",
     status: "pending"
   }
   ↓
10. Send response to frontend
    ↓
11. Show success message
    ↓
12. Refresh product list
```

---

## Security Measures

### Frontend
- ✅ Protected routes redirect to login
- ✅ Token stored securely in localStorage
- ✅ Automatic token inclusion in requests
- ✅ Logout clears all stored data
- ✅ Form validation before submission

### Backend
- ✅ Password hashing (bcrypt)
- ✅ JWT token verification on protected routes
- ✅ Email format validation (@college.edu)
- ✅ Authorization checks (seller vs buyer)
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Mongoose schema validation

---

## Error Handling Flow

```
API Call
  │
  ├─── Success (200-299)
  │      └─── Update UI with data
  │
  └─── Error
         │
         ├─── 401 Unauthorized
         │      └─── Redirect to login
         │
         ├─── 400 Bad Request
         │      └─── Show validation errors
         │
         ├─── 404 Not Found
         │      └─── Show "Not found" message
         │
         └─── 500 Server Error
                └─── Show generic error message
```

---

This visual guide helps understand how all the pieces work together in CampusCraft! 🎓
