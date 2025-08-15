import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
   "http://localhost:5173", // main app
   "http://localhost:5001"  // admin app
];

app.use(cors({
   origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow Postman or curl

      if (allowedOrigins.includes(origin)) {
         return callback(null, origin);  // ✅ return the exact origin, not "true"
      } else {
         return callback(new Error("Not allowed by CORS"));
      }
   },
   credentials: true,
}));

app.use(cookieParser());

// Database connection
connectDB();

// Import routes
import brandRouter from "./routes/brand.routes.js";
import showroomRouter from "./routes/showroom.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import vehicleRouter from "./routes/vehicle.routes.js";
import paymentRoutes from "./routes/payment.routes.js"
import filterRoutes from "./routes/filter.routes.js"
import searchRoutes from "./routes/search.routes.js"

// Routes
app.use("/api/brand", brandRouter);
app.use("/api/showroom", showroomRouter);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vehicle", vehicleRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/filter", filterRoutes);
app.use("/api/search", searchRoutes);


// Root route
app.get("/", (req, res) => {
   console.log("API Working");
   res.status(200).send("API is working");
});

// Start the server
app.listen(port, () => console.log(`Server is running on port: ${port}`));