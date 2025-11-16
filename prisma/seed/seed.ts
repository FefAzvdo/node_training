import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function run() {
  await prisma.user.create({
    data: { email: "demo@mail.com", password: "123456" },
  });
}

run();
