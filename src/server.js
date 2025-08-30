const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

// Only start server in development/local environment
if (process.env.NODE_ENV !== "production" && require.main === module) {
  const PORT = process.env.PORT || 3000;

  const server = app.listen(PORT, () => {
    console.log(
      `Server is running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}`
    );
  });

  process.on("unhandledRejection", (err) => {
    console.log(`UNHANDLED REJECTION! Shutting down...`);
    console.error(err);
    console.log(err.name, err.message);

    server.close(() => {
      process.exit(1);
    });
  });

  process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
  });
}

// Export the app for Vercel
module.exports = app;
