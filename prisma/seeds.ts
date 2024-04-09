import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { config } from "dotenv";
import * as bcrypt from "bcryptjs";
import { CreateUsers } from './users';
import { CreateGroups } from './groups';
import { CreateMessages } from './messages';
import { CreateFriendReqeusts } from './friend_requests';
import { CreatePosts } from './posts';
config();


async function main() {
  await prisma.user.upsert({
    where: {
      id: 1,
    },
    create: {
      firstName: "SITE",
      lastName: "ADMIN",
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
      profile: {
        create: {}
      }
    },
    update: {
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
    }
  })

  const ct = 30;
  await CreateUsers(prisma, ct)
  await CreateGroups(prisma, ct)
  await CreateMessages(prisma, ct)
  await CreateFriendReqeusts(prisma, ct)
  await CreatePosts(prisma, ct)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })