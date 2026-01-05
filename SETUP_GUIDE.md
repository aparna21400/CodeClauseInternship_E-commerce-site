# 🛍️ Shopcase - Complete Setup & Running Guide

This guide will help you set up and run the complete Shopcase e-commerce application with frontend and backend.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (optional, for cloning the repository)

---

## 🔧 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd shopcase/BACKEND
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env` file in the `BACKEND` directory with the following variables:

```env
# MongoDB Connection String
MONGO_URL=mongodb://localhost:27017
# OR for MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net

# JWT Secret Key (change this to a secure random string in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port (optional, defaults to 5000)
PORT=5000

# Cloudinary Configuration (for image uploads - optional for basic setup)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Example `.env` file:**
```env
MONGO_URL=mongodb://localhost:27017
JWT_SECRET=shopcase_secret_key_2024
PORT=5000
```

### 4. Start MongoDB

**If using local MongoDB:**
```bash
# On Windows (if MongoDB is installed as a service, it should start automatically)
# Or start manually:
mongod

# On macOS/Linux
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

**If using MongoDB Atlas:**
- No local setup needed, just use your connection string in `.env`

### 5. Start the Backend Server

```bash
# Development mode (with auto-reload using nodemon)
npm run server

# OR production mode
npm start
```

You should see:
```
MongoDB CONNECTED
Server is working on port 5000
```

The backend API will be available at `http://localhost:5000`

---

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory

Open a **new terminal window** and navigate to:

```bash
cd shopcase/FRONTEND
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables (Optional)

Create a `.env` file in the `FRONTEND` directory:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

**Note:** The frontend is already configured to use `http://localhost:5000` as the default backend URL, so this is optional.

### 4. Start the Frontend Development Server

```bash
npm start
```

The React app will open automatically at `http://localhost:3000`

---

## 🚀 Running the Complete Application

### Option 1: Two Terminal Windows (Recommended)

**Terminal 1 - Backend:**
```bash
cd shopcase/BACKEND
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd shopcase/FRONTEND
npm start
```

### Option 2: Using npm scripts (if configured)

If you have a root `package.json` with scripts to run both:
```bash
# In the shopcase root directory
npm run dev
```

---

## 🧪 Testing the Application

### 1. Test Backend API

Open your browser or use Postman to test:

```
GET http://localhost:5000/
```

You should see: `API WORKING`

### 2. Test Frontend

1. Open `http://localhost:3000`
2. You should see the Shopcase homepage
3. Navigate through the site:
   - Browse categories (Men, Women, Kids)
   - View products
   - Add items to cart (requires login)
   - Complete checkout flow

### 3. Create a Test User

1. Navigate to `/Login` page
2. Click "Sign Up" or toggle to signup form
3. Fill in:
   - Name
   - Email
   - Password (min 6 characters)
   - Optional: Address, Phone
4. Click "Sign Up"
5. You should be automatically logged in

### 4. Test Cart & Checkout Flow

1. **Browse Products:**
   - Go to `/mens`, `/womens`, or `/kids`
   - Click on any product

2. **Add to Cart:**
   - Select a size
   - Click "Add to Cart"
   - You should see the cart icon update with item count

3. **View Cart:**
   - Click the cart icon in navbar
   - Or navigate to `/cart`
   - Verify items are displayed correctly

4. **Checkout:**
   - Click "PROCEED TO CHECKOUT"
   - Fill in shipping details
   - Select payment method
   - Click "Place Order"

5. **Order Success:**
   - You should be redirected to order success page
   - Order number should be displayed
   - Cart should be cleared

6. **View Orders:**
   - Navigate to `/orders` (if available in navbar or directly)
   - You should see your order history

---

## 📁 Project Structure

```
shopcase/
├── BACKEND/
│   ├── config/
│   │   ├── db.js          # MongoDB connection
│   │   ├── cloudinary.js  # Cloudinary setup (for image uploads)
│   │   └── keys.js        # Configuration keys
│   ├── controller/
│   │   ├── auth.js        # Authentication logic
│   │   ├── cartCon.js     # Cart operations
│   │   ├── orderCon.js    # Order operations
│   │   └── productCon.js  # Product operations
│   ├── middleware/
│   │   ├── auth.js        # JWT authentication middleware
│   │   ├── adminAuth.js   # Admin authentication
│   │   └── multer.js      # File upload handling
│   ├── models/
│   │   ├── users.js       # User schema
│   │   ├── product.js     # Product schema
│   │   ├── cart.js        # Cart schema
│   │   └── orders.js      # Order schema
│   ├── routes/
│   │   ├── auth.js        # Auth routes
│   │   ├── product.js     # Product routes
│   │   ├── cart.js        # Cart routes
│   │   └── orders.js      # Order routes
│   ├── app.js             # Express server setup
│   ├── package.json
│   └── .env               # Environment variables (create this)
│
└── FRONTEND/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Context/
    │   │   │   └── ShopContext.jsx  # Global state management
    │   │   ├── cartItems/
    │   │   │   └── CartItems.jsx    # Cart page component
    │   │   └── ... (other components)
    │   ├── pages/
    │   │   ├── Home.jsx             # Homepage
    │   │   ├── Category.jsx         # Category/product listing
    │   │   ├── Product.jsx          # Product detail page
    │   │   ├── Checkout.jsx         # Checkout page
    │   │   ├── OrderSuccess.jsx     # Order confirmation
    │   │   ├── Orders.jsx           # Order history
    │   │   └── LoginSignup.jsx      # Auth page
    │   ├── App.js                   # Main app component with routes
    │   └── index.js                 # Entry point
    ├── package.json
    └── .env                         # Frontend env vars (optional)
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/product/list` - Get all products
- `GET /api/product/:productId` - Get single product
- `GET /api/product/category/:category` - Get products by category
- `POST /api/product/add` - Add product (admin only)
- `POST /api/product/remove` - Remove product (admin only)

### Cart
- `GET /api/cart/get` - Get user cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `POST /api/cart/remove` - Remove item from cart (protected)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:orderId` - Get single order (protected)
- `GET /api/orders/number/:orderNumber` - Get order by number (protected)

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check your `MONGO_URL` in `.env`
- Verify MongoDB port (default: 27017)

**Port Already in Use:**
- Change `PORT` in `.env` to a different port (e.g., 5001)
- Update frontend `.env` to match: `REACT_APP_BACKEND_URL=http://localhost:5001`

**JWT Secret Error:**
- Ensure `JWT_SECRET` is set in `.env`
- Use a strong, random string

### Frontend Issues

**Backend Connection Error:**
- Ensure backend server is running
- Check `REACT_APP_BACKEND_URL` in frontend `.env`
- Verify CORS is enabled in backend

**Products Not Loading:**
- Check browser console for errors
- Verify backend `/api/product/list` endpoint works
- Check network tab in browser dev tools

**Cart/Orders Not Working:**
- Ensure you're logged in
- Check token is stored in localStorage
- Verify backend authentication middleware

---

## 📝 Features Implemented

✅ **Complete User Flow:**
- User registration and login
- Product browsing by category
- Product detail pages with size selection
- Add to cart functionality
- Cart management (view, remove items)
- Checkout with shipping form
- Order placement
- Order confirmation page
- Order history

✅ **Backend Features:**
- User authentication with JWT
- Password hashing with bcrypt
- Product CRUD operations
- Cart management per user
- Order creation and tracking
- Protected routes with middleware

✅ **Frontend Features:**
- Responsive design
- Context API for state management
- React Router for navigation
- Form validation
- Error handling
- Loading states

---

## 🎯 Next Steps / Improvements

- [ ] Add payment gateway integration (Stripe, PayPal)
- [ ] Implement order status updates
- [ ] Add product search functionality
- [ ] Implement product reviews and ratings
- [ ] Add email notifications for orders
- [ ] Implement wishlist feature
- [ ] Add product filters (price, size, color)
- [ ] Implement admin dashboard
- [ ] Add image upload for products
- [ ] Implement forgot password functionality

---

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check console/terminal for error messages
5. Verify MongoDB is running and accessible

---

## 🎉 You're All Set!

Your Shopcase e-commerce application should now be fully functional. Happy coding! 🚀
