import { PrismaClient } from "@prisma/client";


export type messagePayload = {
    body: string,
    image: string,
    senderId: number,
    groupId: number
}

export class MessagesRepository {
    private db: PrismaClient
    private static instance: MessagesRepository
    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): MessagesRepository {
        if (!this.instance) {
            this.instance = new MessagesRepository(db!!);
        }
        return this.instance;
    }

    async create({ body, image, senderId, groupId }: messagePayload) {
        try {
            await this.db.message.create({
                data: {
                    body,
                    image,
                    senderId,
                    groupId
                }
            })
            await this.db.group.update({
                where: {
                    id: groupId
                },
                data: {
                    lastMessage: body,
                    lastMessageAt: new Date()
                }
            })

            return { error: null, success: true }
        } catch (error) {
            return { error, success: false }
        }
    }

    async delete(messageId: number) {
        try {
            await this.db.message.delete({
                where: {
                    id: messageId
                }
            })
            return { error: null, success: true }
        } catch (error) {
            return { error, success: false }
        }
    }
}