# 🎓 CampusCraft - Campus Marketplace Platform

A full-stack marketplace platform designed for college students to buy, sell, and swap items within their campus community.

![Tech Stack](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🔐 Authentication
- Secure registration with college email validation (`@college.edu`)
- JWT-based authentication
- Protected routes and API endpoints
- User profiles with ratings

### 🛍️ Marketplace
- Browse products with search and category filters
- Add products with images, descriptions, and pricing
- Support for both cash purchases and barter/swap
- Product availability tracking
- Seller ratings display

### 📦 Request Management
- Send buy or swap requests on products
- Track request status (pending, approved, rejected)
- Manage incoming requests on your products
- Approve or reject offers
- Automatic product status updates when sold

### 🎨 Modern UI/UX
- Clean, professional design
- Fully responsive (mobile, tablet, desktop)
- Intuitive navigation
- Real-time status updates
- Beautiful icons and animations

## 🚀 Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📁 Project Structure

```
ecom2/
├── campuscraft-backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Request.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── requestRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── .env
│
└── campuscraft-frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd campuscraft-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```bash
   node server.js
   ```
   
   Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd campuscraft-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `POST /api/products/add` - Add new product (protected)

### Requests
- `POST /api/requests/create` - Create buy/swap request (protected)
- `GET /api/requests/my-requests` - Get user's requests (protected)
- `GET /api/requests/received` - Get received requests (protected)
- `PUT /api/requests/status/:id` - Update request status (protected)

## 📱 Screenshots & Features

### Home Page / Marketplace
- Grid layout of available products
- Search bar for finding specific items
- Category filter dropdown
- Product cards showing image, title, price, seller info
- Buy and Swap buttons (when available)
- "Sold" badge for unavailable items

### Add Product
- Form to list new items
- Fields: title, description, price, category, image URL
- Checkbox to allow barter/swap
- Category options: Books, Electronics, Furniture, Clothing, Sports, Stationery, Other

### My Requests
- View all sent requests (buy/swap)
- Status badges: Pending (yellow), Approved (green), Rejected (red)
- Product details with images
- Request timestamp

### Received Requests
- Manage incoming requests on your products
- Buyer information display
- Approve/Reject buttons for pending requests
- Request type indicator (buy/swap)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes with middleware
- College email validation
- Authorization checks for request management
- CORS configuration for API security

## 🎯 User Flow

1. **Registration**: Students sign up with college email
2. **Browse**: View available products on marketplace
3. **List**: Sellers add products they want to sell/swap
4. **Request**: Buyers send purchase or swap requests
5. **Manage**: Sellers approve/reject incoming requests
6. **Track**: Both parties track request status

## 🌟 Key Highlights

- **College Email Only**: Ensures community is limited to verified students
- **Barter System**: Unique swap feature for item exchange
- **User Ratings**: Trust system with seller ratings
- **Request Management**: Organized workflow for transactions
- **Clean UI**: Professional, modern interface
- **Responsive Design**: Works on all devices
- **Fast Performance**: Vite for lightning-fast builds

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 👨‍💻 Development

### Run Backend in Development
```bash
cd campuscraft-backend
npm install nodemon -D
npx nodemon server.js
```

### Build Frontend for Production
```bash
cd campuscraft-frontend
npm run build
```

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Ensure MongoDB Atlas allows your IP address
- Verify JWT_SECRET is set

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check CORS settings in `server.js`
- Verify API URLs in frontend `api.js`

### Authentication issues
- Clear localStorage and try logging in again
- Check JWT_SECRET matches between requests
- Verify token isn't expired

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for the campus community**
