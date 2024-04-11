/*

    Create a post
        - req.body
        - req.user
        - req.image

    Get all posts and sort by updatedAt

    Get all posts by a user


*/

import { Router } from "express";
import { FriendsRepository } from "../repositories/friends_repository";
import { PostsRepository } from "../repositories/posts_repository";
import { authMiddleware } from "../middleware/authentication";

export const buildPostsController = (repository: PostsRepository) => {
    const router = Router();

    // ************ CREATE A POST ************
    router.post("/", authMiddleware, async (req, res) => {
        const post = await repository.create({
            body: req.body.body,
            image: req.body.image,
            userId: req.user!!.id
        });

        res.json({ post });
    });

    // ************ GET ALL POSTS ************
    router.get("/", authMiddleware, async (req, res) => {
        const posts = await repository.getPosts();
        res.json({ posts });
    });

    // ************ GET ALL POSTS BY USER ************
    router.get("/user/:id", authMiddleware, async (req, res) => {
        const posts = await repository.getPostsByUser(parseInt(req.params.id));
        res.json({ posts });
    });
    return router;
}