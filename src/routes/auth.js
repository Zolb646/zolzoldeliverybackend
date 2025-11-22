import express from "express";
import { getUsers } from "../resolvers/auth/getUsers.js";
import { signUpUsers } from "../resolvers/auth/sign-up.js";
import { updateUser } from "../resolvers/auth/updateUser.js";
import { deleteUser } from "../resolvers/auth/deleteUser.js";
import { signInUser } from "../resolvers/auth/sign-in.js";

export const AuthRouter = express.Router();

AuthRouter.get("/", getUsers);
AuthRouter.post("/", signUpUsers);
AuthRouter.post("/login", signInUser);
AuthRouter.patch("/:userId", updateUser);
AuthRouter.delete("/:userId", deleteUser);
