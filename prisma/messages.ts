import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export async function CreateMessages(prisma: PrismaClient, ct: number) {
    const users = await prisma.user.findMany();

    // Assuming you have an array of existing groups in the database
    const existingGroups = await prisma.group.findMany();

    for (let i = 0; i < ct * 3; i++) {
        const randomGroup = faker.helpers.arrayElement(existingGroups);
        const randomUser = faker.helpers.arrayElement(users);
        const randomMessage = faker.lorem.sentence();

        await prisma.message.create({
            data: {
                body: randomMessage,
                senderId: randomUser.id,
                groupId: randomGroup.id,
            },
        });
    }
    console.log(`${ct * 3} messages created and seeded.`);
}