import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";
import fileUpload, { UploadedFile } from 'express-fileupload';
import multer from "multer";

export type CreateProfilePayload = {
  age?: number;
  backgroundImage?: string;
};

// /users/...
export const buildUsersController = (usersRepository: UsersRepository) => {
  const router = Router();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./server/public/uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      // Preserve the original file extension
      const originalExtension = file.originalname.split(".").pop();
      const fileName = `${uniqueSuffix}.${originalExtension}`;
      console.log(fileName)
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage: storage });

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

  // ************ UPDATE PROFILE PICTURE ************
  router.put('/:id/profile-picture', upload.single('profilePicture'), async (req, res) => {
    const userId = req.params.id;

    if (req.file) {
      const profilePicturePath = req.file.path; // Store the file path
      const newPath = profilePicturePath.replace("server/public/", "");
      try {
        const updatedProfile = await usersRepository.updateProfilePicture(parseInt(userId), newPath);
        res.json({ updatedProfile });
      } catch (error) {
        res.status(500).json({ error: "Failed to update profile picture" });
      }
    } else {
      res.status(400).json({ error: "No file uploaded" });
    }
  });

  return router;
}

