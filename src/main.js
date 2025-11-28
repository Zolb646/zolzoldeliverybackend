import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDb.js";
import { AuthRouter } from "./routes/auth.js";
import { FoodRouter } from "./routes/food.js";
import { FoodCategoryRouter } from "./routes/food-category.js";
import { FoodOrderRouter } from "./routes/food-order.js";

dotenv.config({ path: ".env.local" });
const app = express();
const PORT = 8000;

app.use(cors());

app.use("/auth", AuthRouter);
app.use("/food", FoodRouter);
app.use("/food-category", FoodCategoryRouter);
app.use("/food-order", FoodOrderRouter);

app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
