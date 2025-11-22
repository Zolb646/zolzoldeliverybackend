import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "FoodCategory",
    },
    ingredients: { type: [String] },
  },
  { timestamps: true }
);

export const FoodModel = mongoose.model("Food", FoodSchema);
