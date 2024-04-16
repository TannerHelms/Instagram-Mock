import { PrismaClient } from "@prisma/client";

export class FriendsRepository {
    private db: PrismaClient
    private static instance: FriendsRepository
    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): FriendsRepository {
        if (!this.instance) {
            this.instance = new FriendsRepository(db!!);
        }
        return this.instance;
    }

    getFriends(userId: number) {
        return this.db.friendRequest.findMany({
            where: {
                OR: [
                    { fromId: userId },
                    { toId: userId }
                ],
                AND: [
                    { accepted: true }
                ]
            },
            include: {
                from: true,
                to: true
            }
        })
    }

    removeFriend(id: number) {
        return this.db.friendRequest.delete({
            where: {
                id
            }
        })
    }

    addFriend(fromId: number, toId: number) {
        return this.db.friendRequest.create({
            data: {
                fromId,
                toId
            }
        })
    }

    acceptFriendRequest(id: number) {
        return this.db.friendRequest.update({
            where: {
                id
            },
            data: {
                accepted: true
            }
        })
    }

    getSentFriendRequests(userId: number) {
        return this.db.friendRequest.findMany({
            where: {
                fromId: userId,
                accepted: false
            },
            include: {
                to: true
            }
        })
    }

    getReceivedFriendRequests(userId: number) {
        return this.db.friendRequest.findMany({
            where: {
                toId: userId,
                accepted: false
            },
            include: {
                from: {
                    include: {
                        user: true
                    }
                }
            }
        })
    }
}