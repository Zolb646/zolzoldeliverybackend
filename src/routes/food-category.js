import express from "express";
import { getCategories } from "../resolvers/food-category/getCategories.js";
import { createFoodCategory } from "../resolvers/food-category/createCategory.js";
import { deleteCategory } from "../resolvers/food-category/deleteCategory.js";
import { updateFoodCategory } from "../resolvers/food-category/updateCategory.js";

export const FoodCategoryRouter = express.Router();

FoodCategoryRouter.get("/", getCategories);
FoodCategoryRouter.post("/", createFoodCategory);
FoodCategoryRouter.patch("/:categoryId", updateFoodCategory);
FoodCategoryRouter.delete("/:categoryId", deleteCategory);
