import express from "express";
import { getFoods } from "../resolvers/food/getFoods.js";
import { getFoodsByCategory } from "../resolvers/food/getFoodsByCategory.js";
import { updateFoodDetails } from "../resolvers/food/updateFood.js";
import { deleteFood } from "../resolvers/food/deleteFood.js";
import { createFood } from "../resolvers/food/createFood.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { upload } from "../config/multer-storage.js";

export const FoodRouter = express.Router();

FoodRouter.get("/", getFoods);
FoodRouter.get("/:categoryId", getFoodsByCategory);
FoodRouter.post("/", protect, admin, upload.single("image"), createFood);
FoodRouter.patch(
  "/:foodId",
  protect,
  admin,
  upload.single("image"),
  updateFoodDetails
);
FoodRouter.delete("/:foodId", protect, admin, deleteFood);
