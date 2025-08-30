const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

module.exports = prisma;
