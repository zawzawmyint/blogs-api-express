const express = require("express");
const router = express.Router();
const blogController = require("../../controllers/blog/blog.controller");

const { authMiddleware } = require("../../middlewares/auth.middleware");

// Apply authenticaiton middleware to all blog routes
router.use(authMiddleware);

// Public routes (accessible to all authenticated users)
router.get("/", blogController.getBlogs);
router.post("/", blogController.createBlog);
router.get("/:id", blogController.getBlogById);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
