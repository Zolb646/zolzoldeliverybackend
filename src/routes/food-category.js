import express from "express";
import { getCategories } from "../resolvers/food-category/getCategories.js";
import { createFoodCategory } from "../resolvers/food-category/createCategory.js";
import { deleteCategory } from "../resolvers/food-category/deleteCategory.js";
import { updateFoodCategory } from "../resolvers/food-category/updateCategory.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

export const FoodCategoryRouter = express.Router();

FoodCategoryRouter.get("/", getCategories);
FoodCategoryRouter.post("/", protect, admin, createFoodCategory);
FoodCategoryRouter.patch("/:categoryId", protect, admin, updateFoodCategory);
FoodCategoryRouter.delete("/:categoryId", protect, admin, deleteCategory);
