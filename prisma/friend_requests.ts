import { PrismaClient } from '@prisma/client';

export const CreateFriendReqeusts = async (prisma: PrismaClient, ct: number) => {
    try {
        const users = await prisma.user.findMany();
        const userIds = users.map((user) => user.id);

        for (let i = 0; i < ct * 4; i++) {
            const randomUserIndex = Math.floor(Math.random() * userIds.length);
            const randomUser = userIds[randomUserIndex];

            const randomFriendIndex = Math.floor(Math.random() * userIds.length);
            const randomFriend = userIds[randomFriendIndex];

            if (randomUser !== randomFriend) {
                await prisma.friendRequest.create({
                    data: {
                        fromId: randomUser,
                        toId: randomFriend,
                    },
                });
            }
        }

        console.log(`${ct * 4} friend requests created successfully.`);
    } catch (error) {
        console.error('Error creating friend requests:', error);
    } finally {
        await prisma.$disconnect();
    }
};