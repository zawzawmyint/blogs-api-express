const prisma = require("../../../prisma-client");

class UserService {
  async createUser(userData) {
    return await prisma.user.create({
      data: userData,
    });
  }

  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserById(id) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        blogs: true,
      },
    });
  }

  async updateProfile(id, profileData) {
    const { email, password, name } = profileData;

    const updateData = {};

    if (email) {
      updateData.email = email;
    }
    if (password) {
      updateData.password = password;
    }
    if (name) {
      updateData.name = name;
    }

    return await prisma.user.update({
      where: { id },
      data: profileData,
    });
  }

  async deleteUser(id) {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async getAllUsers(filters = {}) {
    const { search } = filters;

    const whereClause = {};

    if (search) {
      whereClause.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    return await prisma.user.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        blogs: true,
      },
    });
  }
}

module.exports = new UserService();
