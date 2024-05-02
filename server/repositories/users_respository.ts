import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type CreateUserPayload = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

export type UpdateProfilePayload = {
  firstName: string,
  lastName: string,
  age?: number;
  backgroundImage?: string;
  likedPosts?: number[];
};

export class UsersRepository {
  private db: PrismaClient
  private static instance: UsersRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): UsersRepository {
    if (!this.instance) {
      this.instance = new UsersRepository(db!!);
    }
    return this.instance;
  }


  async createUser({ email, password, firstName, lastName }: CreateUserPayload) {
    return this.db.user.create({
      data: {
        email: email,
        password_hash: bcrypt.hashSync(password),
        firstName: firstName,
        lastName: lastName,
        profile: {
          create: {}
        }
      }
    });
  }

  async getUserById(id: number) {
    return this.db.user.findUnique({
      where: {
        id: id
      },
      include: {
        profile: true
      }
    });
  }

  async getUsers(userId: number) {
    return this.db.user.findMany({
      include: {
        profile: true
      },
      where: {
        NOT: {
          id: userId
        }
      }
    });
  }

  // PROFILE

  async getProfileByUserId(id: number) {
    return await this.db.profile.findUnique({
      where: { id },
      include: {
        user: true,
        likedPosts: true
      }
    });
  }

  async updateUser(id: number, data: Partial<UpdateProfilePayload>) {
    const likedPosts = data.likedPosts || [];
    await this.db.profile.update({
      where: { id },
      data: {
        age: data.age,
        backgroundImage: data.backgroundImage,
        updatedAt: new Date(),
        likedPosts: {
          connect: likedPosts.map((postId) => ({ id: postId }))
        }
      },
      include: {
        user: true,
        likedPosts: true
      }
    });
    return await this.db.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        updatedAt: new Date()
      },
      include: {
        profile: true
      }
    })
  }

  async updateProfilePicture(id: number, profilePicturePath: string) {
    return this.db.profile.update({
      where: { id },
      data: {
        backgroundImage: profilePicturePath,
        updatedAt: new Date(),
      },
      include: {
        user: true
      }
    });
  }

}