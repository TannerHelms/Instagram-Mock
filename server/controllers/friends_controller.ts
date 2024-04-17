import { Router } from "express";
import { FriendsRepository } from "../repositories/friends_repository";

export const buildFriendsController = (repository: FriendsRepository) => {
    const router = Router();

    // ************ GET ALL FRIENDS ************
    router.get("/user/:id", async (req, res) => {
        try {
            const userId = req.params.id;
            const friends = await repository.getFriends(parseInt(userId));
            res.json({ friends });
        } catch (error) {
            res.status(500).json({ error: "Failed to Get Friends" });
        }
    });

    // ************ REMOVE A FRIEND ************
    router.delete("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            await repository.removeFriend(parseInt(id));
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: "Failed to remove friend" });
        }
    });

    // ************ ADD A FRIEND ************
    router.post("/", async (req, res) => {
        try {
            const { from, to } = req.body;
            await repository.addFriend(from, to);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: "Failed to add friend" });
        }
    });

    // ********** Accept a friend request **********
    router.post("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            await repository.acceptFriendRequest(parseInt(id));
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: "Failed to accept friend request" });
        }
    });

    // ************ GET ALL FRIEND REQUESTS ************
    router.get("/user/:id/requests", async (req, res) => {
        try {
            const userId = req.params.id;
            const sent = await repository.getSentFriendRequests(parseInt(userId));
            const received = await repository.getReceivedFriendRequests(parseInt(userId));
            res.json({ sent, received });
        } catch (error) {
            res.status(500).json({ error: "Failed to get friend requests" });
        }
    });

    return router;
}