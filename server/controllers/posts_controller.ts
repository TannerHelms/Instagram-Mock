/*
    Create a post
        - req.body
        - req.user
        - req.files.image (handled by express-fileupload)

    Get all posts and sort by updatedAt

    Get all posts by a user
*/

import { Router } from "express";
import fileUpload, { UploadedFile } from 'express-fileupload';
import { PostsRepository } from "../repositories/posts_repository";
import { authMiddleware } from "../middleware/authentication";


export const buildPostsController = (repository: PostsRepository) => {
    const router = Router();

    // Apply express-fileupload middleware at the router level
    // Note: Adjust settings as necessary for your use case
    router.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 }, // For example, limit file size to 50MB
        useTempFiles: true, // This will store files in temporary directory
        tempFileDir: '/tmp/' // Specify the temp file directory
    }));

    // ************ CREATE A POST ************
    router.post("/", authMiddleware, async (req, res) => {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: 'No image file was uploaded.'});
        }

        // Assuming 'image' is the name of the file input field
        const imageFile = req.files.image as UploadedFile;
        // For express-fileupload, when using temp files, use `tempFilePath` to get the path
        const imagePath = imageFile.tempFilePath;
        const userId = req.user!!.id; 
        try {
            const bodyText = req.body.body; // Correctly extracting 'body' text from req.body
            const post = await repository.create({
                body: bodyText,
                image: imagePath,
                userId // Assuming authMiddleware correctly sets req.user
            });
            res.json({ post });
        } catch (error) {
            console.error("Failed to create post:", error);
            res.status(500).json({ error: "Failed to create post." });
        }
    });

    // ************ GET ALL POSTS ************
    router.get("/", authMiddleware, async (req, res) => {
        try {
            const posts = await repository.getPosts();
            res.json({ posts });
        } catch (error) {
            console.error("Error getting posts:", error);
            res.status(500).json({ error: "Failed to get posts." });
        }
    });

    // ************ GET ALL POSTS BY USER ************
    router.get("/user/:id", authMiddleware, async (req, res) => {
        try {
            const posts = await repository.getPostsByUser(parseInt(req.params.id));
            res.json({ posts });
        } catch (error) {
            console.error("Error getting user posts:", error);
            res.status(500).json({ error: "Failed to get user posts." });
        }
    });

    return router;
}
