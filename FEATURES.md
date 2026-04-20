# 📸 CampusCraft - Application Overview

## 🎯 What is CampusCraft?

CampusCraft is a modern marketplace platform exclusively for college students. It enables students to buy, sell, and swap items within their campus community, creating a trusted environment for peer-to-peer transactions.

## ✨ Key Features Showcase

### 1. **Secure Authentication**
```
📧 College Email Validation
- Only @college.edu emails allowed
- Ensures community is limited to verified students
- JWT-based secure authentication

🔐 User Profiles
- Name, email, and rating (1-5 stars)
- Persistent sessions
- Protected routes for sensitive actions
```

### 2. **Product Marketplace**
```
🛍️ Browse Products
- Grid layout with product cards
- High-quality product images
- Price display
- Seller information with ratings
- Category badges
- Search functionality
- Filter by category
- Availability status

📦 Product Information
- Title and description
- Pricing
- Category (Books, Electronics, Furniture, etc.)
- Seller details
- Barter availability indicator
- Product status (Available/Sold)
```

### 3. **Sell Items**
```
📝 Easy Listing Process
- Title input
- Description textarea
- Price field (with validation)
- Category dropdown
- Image URL (optional)
- Barter toggle switch

🏷️ Categories
- Books
- Electronics
- Furniture
- Clothing
- Sports & Fitness
- Stationery
- Other
```

### 4. **Buy & Swap System**
```
💰 Purchase Requests
- One-click "Buy" button
- Instant request submission
- Status tracking

🔄 Barter/Swap Feature
- "Swap" button for barter-enabled items
- Alternative to cash transactions
- Great for item exchanges

📊 Request Status
- Pending (Yellow badge)
- Approved (Green badge)
- Rejected (Red badge)
```

### 5. **Request Management**
```
📨 My Requests (Buyer View)
- All sent requests
- Product details
- Current status
- Request timestamp
- Product images

📬 Received Requests (Seller View)
- Incoming buy/swap requests
- Buyer information
- Request type indicator
- Approve/Reject buttons
- One-click status updates
```

## 🎨 Design Highlights

### Color Scheme
```css
Primary Blue: #2563eb
Hover Blue: #1d4ed8
Success Green: #059669
Warning Yellow: #d97706
Error Red: #dc2626
Background: #f9fafb
```

### UI Components
- **Cards**: Elevated with subtle shadows and hover effects
- **Buttons**: Three variants (primary, secondary, outline)
- **Forms**: Clean inputs with focus states and validation
- **Badges**: Color-coded status indicators
- **Icons**: Lucide React icons throughout
- **Typography**: Clear hierarchy with multiple font weights

### Responsive Design
```
📱 Mobile: Single column layout, stacked navigation
💻 Tablet: Two columns, responsive sidebar
🖥️ Desktop: Three columns, full navigation bar
```

## 🔄 User Workflows

### New User Journey
```
1. Visit site → See all products
2. Click "Sign Up"
3. Enter name, college email, password
4. Register successfully
5. Redirected to login
6. Login with credentials
7. Full access granted
```

### Seller Workflow
```
1. Click "Sell Item" in navbar
2. Fill product form
   - Title: "Physics Textbook"
   - Description: "Brand new, barely used"
   - Price: $50
   - Category: Books
   - Image: [URL]
   - Barter: ✓ Enabled
3. Submit listing
4. Product appears on marketplace
5. Receive requests in "Received" tab
6. Review buyer information
7. Approve/Reject requests
8. Product marked as sold when approved
```

### Buyer Workflow
```
1. Browse marketplace
2. Search or filter products
3. View product details
4. Check seller rating
5. Click "Buy" or "Swap"
6. Request sent
7. Track status in "My Requests"
8. Receive notification on approval/rejection
```

## 🎭 User Interface Pages

### 1. Home/Marketplace
- **Header**: Gradient banner with title and tagline
- **Search Bar**: Full-width with icon
- **Filters**: Category dropdown
- **Product Grid**: 3 columns on desktop
- **Product Cards**: Image, title, description, price, seller, actions
- **Empty State**: Friendly message when no products

### 2. Login Page
- **Centered Layout**: Card on gradient background
- **Logo**: Large icon at top
- **Form**: Email and password fields with icons
- **Submit Button**: Full-width primary button
- **Link**: "Don't have an account? Sign up"
- **Error Display**: Red banner for login errors

### 3. Register Page
- **Similar Layout**: Matches login page
- **Additional Field**: Name input
- **Email Validation**: Helper text about college email
- **Password Rules**: Minimum 6 characters
- **Link**: "Already have an account? Sign in"

### 4. Add Product Page
- **Two Column Form**: Desktop layout
- **Rich Inputs**: Icons, placeholders, validation
- **Barter Section**: Highlighted info box
- **Action Buttons**: Cancel and Submit
- **Responsive**: Single column on mobile

### 5. My Requests
- **List View**: Stacked request cards
- **Status Badges**: Color-coded indicators
- **Product Info**: Title, description, price
- **Timestamps**: When request was made
- **Empty State**: Message with icon

### 6. Received Requests
- **Similar Layout**: Request cards with actions
- **Buyer Info**: Name and email display
- **Action Buttons**: Large approve/reject buttons
- **Request Type**: Buy or Swap indicator
- **Status Updates**: Real-time feedback

### 7. 404 Page
- **Centered Design**: Error message with icon
- **Large 404**: Bold typography
- **Home Button**: Easy navigation back
- **Gradient Background**: Matches brand

## 🚀 Technical Features

### Performance
- **Vite Build**: Lightning-fast compilation
- **Code Splitting**: Optimized bundle size
- **Lazy Loading**: Images load on demand
- **Caching**: localStorage for auth tokens

### State Management
- **React Context**: Global auth state
- **useState**: Local component state
- **useEffect**: Side effects and data fetching
- **Custom Hooks**: useAuth for authentication

### API Integration
- **Axios**: HTTP client with interceptors
- **Token Injection**: Automatic auth headers
- **Error Handling**: Graceful error messages
- **Loading States**: Spinners and disabled buttons

### Security
- **Protected Routes**: Redirect to login
- **Token Validation**: Server-side verification
- **Password Hashing**: bcrypt on backend
- **CORS**: Configured for cross-origin requests

## 📊 Data Models

### User
```javascript
{
  name: String,
  email: String (unique, @college.edu),
  password: String (hashed),
  rating: Number (default: 5)
}
```

### Product
```javascript
{
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String (URL),
  barterAllowed: Boolean,
  seller: ObjectId (User),
  isAvailable: Boolean
}
```

### Request
```javascript
{
  product: ObjectId (Product),
  buyer: ObjectId (User),
  type: String (buy/swap),
  status: String (pending/approved/rejected)
}
```

## 🎯 Target Audience

- **College Students**: Primary users
- **Age Range**: 18-25 years
- **Use Cases**: 
  - Buy/sell textbooks
  - Trade electronics
  - Swap furniture
  - Exchange clothing
  - Sell sports equipment
  - Share stationery

## 💡 Business Logic

### Validation Rules
- Email must end with `@college.edu`
- Password minimum 6 characters
- Price must be positive number
- Cannot request own products
- Cannot request sold products
- Only seller can approve/reject requests

### Automatic Features
- Product marked unavailable when approved
- Ratings displayed on all product cards
- Timestamps on all requests
- JWT token expiration (24 hours)
- Auto-login with valid token

## 🔮 Future Enhancements

Potential features for v2:
- Image upload (vs URL only)
- In-app messaging between users
- Product ratings and reviews
- Favorite/Wishlist functionality
- Price negotiation system
- Location-based filtering
- Email notifications
- Admin dashboard
- Report inappropriate listings
- User verification badges

---

**CampusCraft - Building Trust in Campus Commerce** 🎓
