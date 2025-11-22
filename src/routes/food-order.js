import express from "express";
import { createFoodOrder } from "../resolvers/food-order/createOrders.js";
import { getFoodOrder } from "../resolvers/food-order/getOrders.js";
import { getFoodOrderById } from "../resolvers/food-order/getOrdersById.js";
import { bulkUpdateFoodOrder } from "../resolvers/food-order/BulkUpdateOrders.js";
import { updateFoodOrder } from "../resolvers/food-order/updateOrders.js";
import { deleteFoodOrder } from "../resolvers/food-order/deleteOrders.js";

export const FoodOrderRouter = express.Router();

FoodOrderRouter.post("/", createFoodOrder);
FoodOrderRouter.get("/", getFoodOrder);
FoodOrderRouter.get("/:userId", getFoodOrderById);
FoodOrderRouter.patch("/bulk-update", bulkUpdateFoodOrder);
FoodOrderRouter.patch("/:foodOrderId", updateFoodOrder);
FoodOrderRouter.delete("/:foodOrderId", deleteFoodOrder);
