import { PrismaClient } from "@prisma/client";

export class GroupsRepository {
    private db: PrismaClient
    private static instance: GroupsRepository
    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): GroupsRepository {
        if (!this.instance) {
            this.instance = new GroupsRepository(db!!);
        }
        return this.instance;
    }

    create(users: number[]) {
        return this.db.group.create({
            data: {
                profiles: {
                    connect: users.map(id => ({ id }))
                }
            }
        })
    }

    addUsers(groupId: number, users: number[]) {
        return this.db.group.update({
            where: {
                id: groupId
            },
            data: {
                profiles: {
                    connect: users.map(id => ({ id }))
                }
            }
        })
    }

    getGroups(userId: number) {
        return this.db.group.findMany({
            where: {
                profiles: {
                    some: {
                        id: userId
                    }
                }
            },
            include: {
                profiles: true,
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        sender: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        })
    }

    getGroup(id: number) {
        return this.db.group.findUnique({
            where: {
                id
            },
            include: {
                profiles: {
                    include: {
                        user: true
                    }

                },
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    },
                    include: {
                        sender: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        })
    }
}