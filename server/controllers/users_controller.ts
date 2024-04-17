import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";

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

  return router;
}

