const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/user.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");

// Public routes
// create user
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected routes
// get user profile
router.get("/profile", authMiddleware, userController.getProfile);
router.get("/:id", authMiddleware, userController.getUserById);
// get all users
router.get("/", authMiddleware, userController.getAllUsers);
// update user
router.put("/:id", authMiddleware, userController.updateProfile);
// delete user
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
