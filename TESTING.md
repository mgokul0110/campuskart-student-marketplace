# 🧪 Testing Guide for CampusCraft

## Testing Checklist

### ✅ Authentication Tests

#### Registration
- [ ] Register with valid college email (`test@college.edu`)
- [ ] Try registering with non-college email (should fail)
- [ ] Try registering with existing email (should fail)
- [ ] Register with short password < 6 chars (should fail)
- [ ] Verify success message after registration
- [ ] Confirm redirect to login page

#### Login
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Login with non-existent email (should fail)
- [ ] Verify token is stored in localStorage
- [ ] Verify user data is stored in localStorage
- [ ] Check navbar shows user name and rating
- [ ] Confirm protected routes are accessible

#### Logout
- [ ] Click logout button
- [ ] Verify redirect to login page
- [ ] Check localStorage is cleared
- [ ] Confirm protected routes redirect to login

#### Session Persistence
- [ ] Login and refresh page (should stay logged in)
- [ ] Close tab and reopen (should stay logged in)
- [ ] Clear localStorage and refresh (should logout)

---

### ✅ Product Listing Tests

#### Add Product
- [ ] Navigate to "Sell Item"
- [ ] Fill all required fields (title, price)
- [ ] Add optional fields (description, category, image)
- [ ] Toggle barter option on/off
- [ ] Submit form
- [ ] Verify product appears on home page
- [ ] Check product shows your name as seller
- [ ] Confirm product is marked "Available"

#### Add Product - Validation
- [ ] Try submitting without title (should fail)
- [ ] Try submitting without price (should fail)
- [ ] Try negative price (should fail)
- [ ] Try price with more than 2 decimals
- [ ] Test very long title/description
- [ ] Test invalid image URL
- [ ] Verify cancel button works

#### Product Display
- [ ] Products show on home page in grid
- [ ] Product card shows image (or placeholder)
- [ ] Title, description, price visible
- [ ] Seller name and rating displayed
- [ ] Category badge appears
- [ ] Barter allowed products show swap button
- [ ] Sold products show "Sold" badge
- [ ] Sold products don't show Buy/Swap buttons

---

### ✅ Search & Filter Tests

#### Search Functionality
- [ ] Search by product title
- [ ] Search by description keywords
- [ ] Case-insensitive search works
- [ ] Clear search shows all products
- [ ] Search with no results shows empty state

#### Category Filter
- [ ] Select "Books" category
- [ ] Select "Electronics" category
- [ ] Select "All Categories"
- [ ] Verify correct products appear
- [ ] Combine search with category filter

#### Empty States
- [ ] Search for non-existent product
- [ ] Filter to category with no products
- [ ] Verify friendly empty state message

---

### ✅ Request Management Tests

#### Creating Requests (Buyer Side)

**Setup:** Create two accounts and login as buyer

- [ ] Click "Buy" on a product
- [ ] Verify success message
- [ ] Product remains available for others
- [ ] Try to buy same product twice
- [ ] Click "Swap" on barter-enabled product
- [ ] Try to request your own product (should fail)
- [ ] Try to request sold product (should fail)

#### Viewing My Requests
- [ ] Navigate to "My Requests"
- [ ] See all sent requests
- [ ] Check request shows "Pending" status
- [ ] Verify product details visible
- [ ] Check request type (Buy/Swap)
- [ ] Confirm timestamp is accurate

#### Managing Received Requests (Seller Side)

**Setup:** Login as seller who owns products

- [ ] Navigate to "Received" requests
- [ ] See incoming requests
- [ ] Buyer name and email visible
- [ ] Request type indicator present
- [ ] Click "Approve" button
- [ ] Verify product marked as "Sold"
- [ ] Check product no longer shows Buy/Swap
- [ ] Confirm request status updated

#### Rejecting Requests
- [ ] Create new request
- [ ] Login as seller
- [ ] Click "Reject" button
- [ ] Verify request marked as "Rejected"
- [ ] Product remains available
- [ ] Check buyer sees rejection status

---

### ✅ UI/UX Tests

#### Navigation
- [ ] All navbar links work
- [ ] Logo redirects to home
- [ ] Protected routes show when logged in
- [ ] Auth buttons show when logged out
- [ ] Active page is visually indicated

#### Responsive Design
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640-1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Navigation adapts to screen size
- [ ] Product grid adjusts columns
- [ ] Forms are usable on mobile

#### Loading States
- [ ] Products show loading spinner
- [ ] Requests show loading during fetch
- [ ] Buttons show loading during actions
- [ ] Disabled state during requests

#### Error Handling
- [ ] Invalid login shows error message
- [ ] Failed requests show alerts
- [ ] Network errors handled gracefully
- [ ] 404 page for invalid routes

---

### ✅ Data Flow Tests

#### Product Lifecycle
1. [ ] User A creates product
2. [ ] Product visible to User B
3. [ ] User B sends buy request
4. [ ] User A sees request in "Received"
5. [ ] User A approves request
6. [ ] Product marked as sold
7. [ ] User B sees approved status
8. [ ] Product no longer accepts requests

#### Multi-User Scenarios
- [ ] Two buyers request same product
- [ ] Seller approves one, rejects other
- [ ] Only approved buyer sees success
- [ ] Product becomes unavailable
- [ ] Verify data consistency

---

### ✅ Security Tests

#### Authentication
- [ ] Cannot access protected routes without login
- [ ] Token required for API calls
- [ ] Invalid token redirects to login
- [ ] Expired token handled properly

#### Authorization
- [ ] Cannot approve/reject others' requests
- [ ] Cannot modify others' products
- [ ] Cannot see others' "My Requests"
- [ ] Seller-only actions protected

#### Input Validation
- [ ] XSS protection in text fields
- [ ] SQL injection prevention (MongoDB)
- [ ] Email format validation
- [ ] Price validation (numbers only)

---

### ✅ Performance Tests

#### Load Time
- [ ] Home page loads < 2 seconds
- [ ] Product images lazy load
- [ ] API calls complete quickly
- [ ] No excessive re-renders

#### Data Handling
- [ ] Test with 0 products
- [ ] Test with 50+ products
- [ ] Test with long descriptions
- [ ] Test with large images

---

## 🤖 Automated Testing Scenarios

### Test Data Setup

```javascript
// Test Accounts
const seller = {
  name: "Alice Smith",
  email: "alice@college.edu",
  password: "password123"
};

const buyer = {
  name: "Bob Johnson",
  email: "bob@college.edu",
  password: "password123"
};

// Test Products
const product1 = {
  title: "Calculus Textbook",
  description: "Brand new, barely used",
  price: 50,
  category: "Books",
  barterAllowed: true
};

const product2 = {
  title: "Gaming Laptop",
  description: "High performance laptop",
  price: 800,
  category: "Electronics",
  barterAllowed: false
};
```

### Test Scenarios

#### Scenario 1: Complete Transaction Flow
```
1. Register seller account
2. Login as seller
3. Create product with barter enabled
4. Logout
5. Register buyer account
6. Login as buyer
7. Search for product
8. Send buy request
9. Check "My Requests" - see pending
10. Logout
11. Login as seller
12. Check "Received" - see request
13. Approve request
14. Verify product marked sold
15. Logout
16. Login as buyer
17. Check "My Requests" - see approved
```

#### Scenario 2: Rejection Flow
```
1. Buyer sends swap request
2. Seller rejects request
3. Verify request status is rejected
4. Verify product still available
5. Verify buyer can send new request
```

#### Scenario 3: Multiple Requests
```
1. Create one product
2. Buyer A sends buy request
3. Buyer B sends swap request
4. Seller sees both requests
5. Seller approves Buyer A
6. Product marked sold
7. Buyer A sees approved
8. Buyer B sees pending (frozen)
```

---

## 🐛 Bug Testing Checklist

### Common Issues to Check
- [ ] Memory leaks from useEffect
- [ ] Infinite loops in data fetching
- [ ] Race conditions in async calls
- [ ] Stale data after mutations
- [ ] Incorrect error messages
- [ ] Missing loading states
- [ ] Broken links/routes
- [ ] Image loading failures
- [ ] API timeout handling
- [ ] CORS errors

### Edge Cases
- [ ] Empty string inputs
- [ ] Very long strings
- [ ] Special characters in text
- [ ] Unicode characters
- [ ] Whitespace-only inputs
- [ ] Decimal prices (.00, .99)
- [ ] Zero price
- [ ] Missing optional fields
- [ ] Rapid button clicks
- [ ] Network disconnect/reconnect

---

## 📊 Test Results Template

### Test Session Info
- **Date:** _______________
- **Tester:** _______________
- **Browser:** _______________
- **Device:** _______________
- **Backend Version:** _______________
- **Frontend Version:** _______________

### Results Summary
- **Total Tests:** ___
- **Passed:** ___
- **Failed:** ___
- **Blocked:** ___
- **Pass Rate:** ___%

### Issues Found
1. **Issue:** _______________
   - **Severity:** Critical/High/Medium/Low
   - **Steps to Reproduce:** _______________
   - **Expected:** _______________
   - **Actual:** _______________

---

## 🔧 Developer Testing Tools

### Browser DevTools
```
F12 - Open DevTools
Console - Check for errors
Network - Monitor API calls
Application > Local Storage - View tokens
Elements - Inspect UI
```

### API Testing with cURL
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@college.edu","password":"pass123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@college.edu","password":"pass123"}'

# Get Products
curl http://localhost:3000/api/products
```

### React DevTools
- Install React DevTools browser extension
- Inspect component tree
- View props and state
- Check context values
- Monitor re-renders

---

## ✅ Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] No console warnings
- [ ] Build completes successfully
- [ ] Production build loads correctly
- [ ] Environment variables configured
- [ ] API endpoints correct
- [ ] CORS configured properly
- [ ] Error handling in place
- [ ] Loading states work
- [ ] Authentication flow works
- [ ] All routes accessible
- [ ] Mobile responsive
- [ ] Images load correctly
- [ ] Forms validated properly

---

**Happy Testing! 🎉**
