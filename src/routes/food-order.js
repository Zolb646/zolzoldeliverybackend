import express from "express";
import { createFoodOrder } from "../resolvers/food-order/createOrders.js";
import { getFoodOrder } from "../resolvers/food-order/getOrders.js";
import { getFoodOrderById } from "../resolvers/food-order/getOrdersById.js";
import { bulkUpdateFoodOrder } from "../resolvers/food-order/BulkUpdateOrders.js";
import { updateFoodOrder } from "../resolvers/food-order/updateOrders.js";
import { deleteFoodOrder } from "../resolvers/food-order/deleteOrders.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

export const FoodOrderRouter = express.Router();

FoodOrderRouter.post("/", protect, createFoodOrder);
FoodOrderRouter.get("/", protect, admin, getFoodOrder);
FoodOrderRouter.get("/:userId", protect, getFoodOrderById);
FoodOrderRouter.patch("/bulk-update", protect, admin, bulkUpdateFoodOrder);
FoodOrderRouter.patch("/:foodOrderId", protect, admin, updateFoodOrder);
FoodOrderRouter.delete("/:foodOrderId", protect, deleteFoodOrder);
