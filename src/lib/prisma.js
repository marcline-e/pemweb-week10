const { PrismaClient } = require('@prisma/client');

// Satu instance PrismaClient dipakai bersama di seluruh aplikasi
const prisma = new PrismaClient();

module.exports = prisma;
