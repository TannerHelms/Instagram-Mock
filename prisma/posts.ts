import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


export async function CreatePosts(prisma: PrismaClient, userCount: number) {
    const users = await prisma.user.findMany({
        take: userCount,
    });



    for (let j = 0; j < userCount * 3; j++) {
        const user = faker.helpers.arrayElement(users);
        const post = await prisma.post.create({
            data: {
                body: faker.lorem.sentence(),
                image: faker.image.imageUrl(),
                author: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });

    }

    console.log("Posts created and seeded.")
}