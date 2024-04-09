import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


export async function CreateUsers(prisma: PrismaClient, numUsers: number) {
    for (let i = 0; i < numUsers; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password_hash: password,
                profile: {
                    create: {
                    },
                },
            },
        });
    }

    console.log(`${numUsers} users created and seeded.`);
}