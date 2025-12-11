/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient, Anyag } from 'generated/prisma/client';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const jatekIds: number[] = [];
    const gyerekIds: number[] = [];
    const anyagEnum: Anyag[] = ["wood", "plastic", "metal", "other"]

    for (let i = 1; i <= 20; i++){
      const jatekok = await tx.jatek.create({
        data:{
          name: faker.commerce.productName(),
          anyag: faker.helpers.arrayElement(anyagEnum),
          suly: faker.number.float({min:0.1, max:5.0, multipleOf: 0.1}),
        }
      })

      jatekIds.push(jatekok.id)
    };

    for (let i = 1; i <= 20; i++){
      const gyerekek = await tx.gyerek.create({
        data: {
          name: faker.person.fullName(),
          lakcim: `${faker.location.country()}, ${faker.location.city()}, ${faker.location.streetAddress()}`,
          wasGood: faker.datatype.boolean(),
        }
      });
      gyerekIds.push(gyerekek.id)
    };

  });
}

main()
.then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
