const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Trust Render's proxy so express-rate-limit reads the X-Forwarded-For header correctly
app.set('trust proxy', 1);

// Connect to MongoDB
connectDB();

// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Too many requests from this IP, please try again after 15 minutes" }
});

// CORS configuration
const allowedOrigins = [
  "https://kasun-akalanka-web.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json({ limit: "10kb" }));

// Apply general rate limiter to all API routes
app.use("/api", apiLimiter);

// Routes
app.use("/api", require("./src/routes/healthRoutes"));
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api", require("./src/routes/messageRoutes"));
app.use("/api/admin", require("./src/routes/adminRoutes"));
app.use("/api/download-cv", require("./src/routes/cvRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
