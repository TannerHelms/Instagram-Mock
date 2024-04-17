import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { GroupsRepository } from "../repositories/groups_repository";

// /users/...
export const buildGroupsController = (repository: GroupsRepository) => {
    const router = Router();
    // ************ CREATE A GROUP CHAT ************
    router.post("/", authMiddleware, async (req, res) => {
        try {
            const group = await repository.create(req.body.users);
            res.json({ group });
        } catch (error) {
            res.status(500).json({ error: "Failed to create group" });
        }
    });

    // ************ ADD USERS TO A GROUP CHAT ************
    router.post("/add", authMiddleware, async (req, res) => {
        try {
            const group = await repository.addUsers(req.body.groupId, req.body.users);
            res.json({ group });
        } catch (error) {
            res.status(500).json({ error: "Failed add users" });
        }
    });


    // ************ GET ALL THE GROUPS THAT THE SIGNED IN USER IS IN ************
    router.get("/", authMiddleware, async (req, res) => {
        try {
            const groups = await repository.getGroups(req.user!!.id);
            res.json({ groups });
        } catch (error) {
            res.status(500).json({ error: "Cant find users groups" });
        }
    });

    // ************ GET A CONVERSATION BY ID ************
    router.get("/:id", authMiddleware, async (req, res) => {
        try {
            const conversation = await repository.getGroup(parseInt(req.params.id));
            res.json({ conversation });
        } catch (error) {
            res.status(500).json({ error: "Conversation not found" });
        }
    });



    return router;
}

