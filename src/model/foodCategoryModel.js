import mongoose from "mongoose";

const FoodCategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);
export const foodCategoryModel = mongoose.model(
  "FoodCategory",
  FoodCategorySchema
);
