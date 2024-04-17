import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";


export const CreateGroups = async (prisma: PrismaClient, ct: number) => {
    try {
        const users = await prisma.user.findMany();
        const groupCount = Math.floor(ct / 3);

        for (let i = 0; i < groupCount; i++) {

            const group = await prisma.group.create({
                data: {
                },
            });

            const usersInGroup = users.slice(i * (ct / 3), (i + 1) * (ct / 3));

            await prisma.group.update({
                where: { id: group.id },
                data: {
                    profiles: {
                        connect: usersInGroup.map((user) => ({ id: user.id })),
                    },
                },
            });
        }

        console.log(`${groupCount} groups created and seeded with users.`);
    } catch (error) {
        console.error("Error creating groups:", error);
    }
};