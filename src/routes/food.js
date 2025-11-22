import express from "express";
import { getFoods } from "../resolvers/food/getFoods.js";
import { getFoodsByCategory } from "../resolvers/food/getFoodsByCategory.js";
import { updateFoodDetails } from "../resolvers/food/updateFood.js";
import { deleteFood } from "../resolvers/food/deleteFood.js";
import { createFood } from "../resolvers/food/createFood.js";

export const FoodRouter = express.Router();

FoodRouter.get("/", getFoods);
FoodRouter.get("/:categoryId", getFoodsByCategory);
FoodRouter.post("/", createFood);
FoodRouter.patch("/:foodId", updateFoodDetails);
FoodRouter.delete("/:foodId", deleteFood);
