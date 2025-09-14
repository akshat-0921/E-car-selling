# DriveIt – E-Car Selling & Booking Platform 🚗⚡

## Overview  
DriveIt is a full-stack MERN application that enables users to browse, book, and purchase cars online.  
It provides both **user-facing** and **admin-facing** features, including vehicle inventory management, test drive scheduling, payment integration, and booking history.  

---

## ✨ Features  

### 👤 User Side
- **Authentication**: Email OTP login/signup with JWT stored in HttpOnly cookies.  
- **Vehicle Browsing**: Explore cars by brands, models, and showrooms with filters (price, fuel type, etc.).  
- **Bookings**:  
  - Test drive booking with availability validation.  
  - Service booking with history tracking.  
  - Prevents conflicts via backend checks.  
- **Payments**: Secure Razorpay integration with backend signature verification.    
- **Profile Management**: View booking history and account details.  

### 🛠️ Admin Side
- **Authentication**: Secret key + JWT with refresh tokens.  
- **Inventory Management**: Add/update/delete vehicles, brands, and showrooms.  
- **Booking Oversight**: Monitor user bookings in real-time.  
- **Security**: Axios interceptors ensure smooth token refresh cycles.  

---

## 🏗️ Architecture
Frontend (User/Admin) → API Calls (Axios) → Backend (Express) → Database (MongoDB)  
Integrations: **Nodemailer** (OTP), **Razorpay** (Payments)  

---

## 📊 Tech Stack  
- **Frontend**: React, Redux Toolkit, Tailwind CSS, Axios  
- **Backend**: Node.js, Express.js, JWT, Nodemailer  
- **Database**: MongoDB (Mongoose ORM)  
- **Payments**: Razorpay  

---

## 📌 Installation & Setup  
```bash
# Clone the repo
git clone https://github.com/akshat-0921/E-car-selling

# Install dependencies
cd driveit-backend
npm install

cd driveit-frontend
npm install

# Run backend
npm run dev

# Run frontend
npm start
