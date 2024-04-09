import express from "express";
import path from "path";
import { engine } from 'express-handlebars';
import fs from "fs";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { buildUsersController } from "./server/controllers/users_controller";
import { buildSessionsController } from "./server/controllers/sessions_controller";
import { buildHomeController } from "./server/controllers/home_controller";
import { UsersRepository } from "./server/repositories/users_respository";
import { GroupsRepository } from "./server/repositories/groups_repository";
import { MessagesRepository } from "./server/repositories/messages_repository";
import { FriendsRepository } from "./server/repositories/friends_repository";
import { buildGroupsController } from "./server/controllers/groups_controller";
import { buildMessagesController } from "./server/controllers/messages_controller";
import { buildFriendsController } from "./server/controllers/friends_controller";
import { PostsRepository } from "./server/repositories/posts_repository";
import { buildPostsController } from "./server/controllers/posts_controller";


const db = new PrismaClient();
const usersRepository = UsersRepository.getInstance(db);
const groupsRepository = GroupsRepository.getInstance(db);
const messagesRepository = MessagesRepository.getInstance(db);
const friendsReposiotry = FriendsRepository.getInstance(db);
const postsReposiotry = PostsRepository.getInstance(db);

dotenv.config();

export const DEBUG = process.env.NODE_ENV !== "production";
export const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }
  });
}

app.use("/", buildHomeController());
app.use("/users", buildUsersController(usersRepository));
app.use("/sessions", buildSessionsController(db));
app.use("/groups", buildGroupsController(groupsRepository));
app.use("/messages", buildMessagesController(messagesRepository));
app.use("/friends", buildFriendsController(friendsReposiotry));
app.use("/posts", buildPostsController(postsReposiotry));


app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


