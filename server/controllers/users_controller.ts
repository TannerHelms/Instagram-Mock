import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";

export type CreateProfilePayload = {
  age?: number;
  backgroundImage?: string;
};

// /users/...
export const buildUsersController = (usersRepository: UsersRepository) => {
  const router = Router();

  // ************ CREATE A USER************
  router.post("/", async (req, res) => {
    const user = await usersRepository.createUser(req.body);

    const token = jwt.sign({
      userId: user.id,
    }, process.env.ENCRYPTION_KEY as string);

    res.json({ user, token });
  });

  // ************ VERIFY TOKEN ************
  router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
  });

  // ************ GET ALL USERS ************
  router.get("/", async (req, res) => {
    const users = await usersRepository.getUsers();
    res.json({ users });
  });

  // ************ GET A USER ************
  router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    const users = await usersRepository.getUserById(parseInt(userId));
    res.json({ users });
  });

  // ************ GET PROFILE BY USER ID ************
  router.get('/:id/profile', async (req, res) => {
    const userId = req.params.id;
    const profile = await usersRepository.getProfileByUserId(parseInt(userId));
    res.json({ profile });
  });

  // ************ UPDATE PROFILE & USER ************
  router.put('/:id/profile', async (req, res) => {
    const userId = req.params.id;
    const data: Partial<CreateProfilePayload> = req.body;
    const updatedProfile = await usersRepository.updateUser(parseInt(userId), data);
    res.json({ updatedProfile });
  });

  return router;
}

