const blogService = require("../../services/blog/blog.service");
class BlogController {
  async createBlog(req, res, next) {
    console.log(req);
    try {
      const { name, description } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: "Name is required." });
      }

      const blog = await blogService.createBlog(req.user.id, {
        name,
        description,
      });

      res.status(201).json({
        success: true,
        data: blog,
        message: "Blog created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async getBlogs(req, res, next) {
    try {
      const { search } = req.query;
      console.log(search);
      const blogs = await blogService.getBlogs({
        search,
      });

      res.json({
        success: true,
        data: blogs,
        message: "Blogs retrieved successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async getBlogById(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const blog = await blogService.getBlogById(id);

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }

      res.json({
        success: true,
        data: blog,
        message: "Blog retrieved successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateBlog(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      // Initialize with existing values
      let updateData = {
        name,
        description,
      };

      const exists = await blogService.blogExists(id);

      if (!exists) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }

      // Check if user is authorized to update this user
      const blog = await blogService.getBlogById(id);

      if (req.user.id !== blog.userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this blog",
        });
      }

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Name is required.",
        });
      }

      const updatedBlog = await blogService.updateBlog(id, updateData);

      res.json({
        success: true,
        data: updatedBlog,
        message: "Blog updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteBlog(req, res, next) {
    try {
      const { id } = req.params;

      const exists = await blogService.blogExists(id);

      if (!exists) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }

      // Check if user is authorized to update this user
      const blog = await blogService.getBlogById(id);

      if (req.user.id !== blog.userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this blog",
        });
      }

      await blogService.deleteBlog(id);

      res.json({
        success: true,
        data: {},
        message: "Blog deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BlogController();
