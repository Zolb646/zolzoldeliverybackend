import express from "express";
import { getFoods } from "../resolvers/food/getFoods.js";
import { getFoodsByCategory } from "../resolvers/food/getFoodsByCategory.js";
import { updateFoodDetails } from "../resolvers/food/updateFood.js";
import { deleteFood } from "../resolvers/food/deleteFood.js";
import { createFood } from "../resolvers/food/createFood.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

export const FoodRouter = express.Router();

FoodRouter.get("/", getFoods);
FoodRouter.get("/:categoryId", getFoodsByCategory);
FoodRouter.post("/", protect, admin, createFood);
FoodRouter.patch("/:foodId", protect, admin, updateFoodDetails);
FoodRouter.delete("/:foodId", protect, admin, deleteFood);
