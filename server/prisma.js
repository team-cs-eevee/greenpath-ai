//creating instance of prisma
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
console.log('PRISMA IN prisma.js', prisma);

module.exports = prisma;
