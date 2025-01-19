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
app.use(cors());
app.use(cookieParser());

// Database connection
connectDB();

// Import routes
import brandRouter from "./routes/brand.routes.js";
import showroomRouter from "./routes/showroom.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import vehicleRouter from "./routes/vehicle.routes.js";
const paymentRoutes = require("./routes/payment.routes");

// Routes
app.use("/api/brand", brandRouter);
app.use("/api/showroom", showroomRouter);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vehicle", vehicleRouter);
app.use("/api/payment", paymentRoutes);

// Root route
app.get("/", (req, res) => {
   console.log("API Working");
   res.status(200).send("API is working");
});

// Start the server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
