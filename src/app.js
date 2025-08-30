const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const blogRoutes = require("./routes/blog/blog.route");
const userRoutes = require("./routes/user/user.route");
const errorHandler = require("./middlewares/error.middleware");

// Initialize app
const app = express();

const upload = multer();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/blogs", upload.none());

// Logger in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
    documentation: "/api/docs",
    version: "1.0.0",
  });
});

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error handler middleware
app.use(errorHandler);

module.exports = app;
