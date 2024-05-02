import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";
import { MessagesRepository } from "../repositories/messages_repository";

// /users/...
export const buildMessagesController = (repository: MessagesRepository) => {
    const router = Router();

    // ************ CREATE A MESSAGE ************

    /*
        req.body
        req.image
        req.senderId,
        req.groupId
    */

    router.post("/", authMiddleware, async (req, res) => {
        const message = await repository.create({
            ...req.body,
            senderId: req.user!!.id
        });

        res.json({ message });
    });

    // ************ DELETE A MESSAGE ************
    router.delete("/:id", authMiddleware, async (req, res) => {
        const { id } = req.params;
        const message = await repository.delete(parseInt(id));
        res.json({ message });
    });

    return router;
}

