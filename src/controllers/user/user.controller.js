const userService = require("../../services/user/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
  // Create user
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide email and password",
        });
      }

      // Check if user already exists
      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // Create user
      const user = await userService.createUser({
        email,
        password: await bcrypt.hash(password, 10),
        name,
      });

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide email and password",
        });
      }

      // Check if user exists
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION_TIME }
      );

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  // Get user profile
  async getProfile(req, res, next) {
    try {
      const user = await userService.getUserById(req.user.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          blogs: user.blogs,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  // Update user profile
  async updateProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { email, password, name } = req.body;

      // Check if user is authorized to update this user
      if (req.user.id !== id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this user",
        });
      }

      // Check if email already exists
      if (email) {
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
        }
      }

      const exists = await userService.getUserById(id);
      if (!exists) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const updateData = {
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        name,
      };

      const updatedUser = await userService.updateProfile(id, updateData);

      res.json({
        success: true,
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      // Check if user is authorized to update this user
      if (req.user.id !== id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this user",
        });
      }

      const exists = await userService.getUserById(id);
      if (!exists) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      await userService.deleteUser(id);

      res.json({
        success: true,
        data: {},
      });
    } catch (err) {
      next(err);
    }
  }

  // Get all users
  async getAllUsers(req, res, next) {
    try {
      const { search } = req.query;

      const users = await userService.getAllUsers({ search });

      res.json({
        success: true,
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
