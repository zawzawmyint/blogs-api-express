const prisma = require("../../../prisma-client");

class BlogService {
  async createBlog(userId, blog) {
    const { name, description } = blog;

    return prisma.blog.create({
      data: {
        name,
        description,
        userId,
      },
    });
  }

  async getBlogs(filters = {}) {
    const { search } = filters;
    const whereClause = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    return await prisma.blog.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        User: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async getBlogById(id) {
    return await prisma.blog.findUnique({
      where: { id: id },
      include: {
        User: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async updateBlog(id, blog) {
    const { name, description } = blog;

    console.log("Blog", blog);

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    return prisma.blog.update({
      where: { id: id },
      include: {
        User: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      data: updateData,
    });
  }

  async deleteBlog(id) {
    // Delete the blog
    return prisma.blog.delete({
      where: { id: id },
    });
  }

  async blogExists(id) {
    const count = await prisma.blog.count({
      where: { id: id },
    });
    return count > 0;
  }
}

module.exports = new BlogService();
