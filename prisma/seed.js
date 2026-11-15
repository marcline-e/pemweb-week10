// Isi data awal (sama seperti data array di tugas sebelumnya)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'Product'`).catch(() => {});
  await prisma.product.createMany({
    data: [
      { name: 'Buku', price: 15000 },
      { name: 'Pulpen', price: 5000 },
    ],
  });
  console.log('Seed selesai:', await prisma.product.findMany());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
