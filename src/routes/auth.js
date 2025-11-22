import express from "express";
import { getUsers } from "../resolvers/auth/getUsers.js";
import { signUpUsers } from "../resolvers/auth/sign-up.js";
import { updateUser } from "../resolvers/auth/updateUser.js";
import { deleteUser } from "../resolvers/auth/deleteUser.js";
import { signInUser } from "../resolvers/auth/sign-in.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

export const AuthRouter = express.Router();

AuthRouter.get("/", protect, admin, getUsers);
AuthRouter.post("/", signUpUsers);
AuthRouter.post("/login", signInUser);
AuthRouter.patch("/:userId", protect, admin, updateUser);
AuthRouter.delete("/:userId", protect, admin, deleteUser);
