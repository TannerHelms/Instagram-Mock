import { PrismaClient } from "@prisma/client";


export class PostsRepository {
    private db: PrismaClient
    private static instance: PostsRepository
    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): PostsRepository {
        if (!this.instance) {
            this.instance = new PostsRepository(db!!);
        }
        return this.instance;
    }

    create({ body, image, userId }: { body: string, image: string, userId: number }) {
        return this.db.post.create({
            data: {
                body,
                image,
                authorId: userId
            }
        })
    }

    getPosts() {
        return this.db.post.findMany({
            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                author: {
                    include: {
                        user: true
                    }
                }
            }
        })
    }

    getPostsByUser(userId: number) {
        return this.db.post.findMany({
            where: {
                authorId: userId
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
    }
}