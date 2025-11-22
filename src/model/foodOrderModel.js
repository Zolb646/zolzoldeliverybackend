import mongoose from "mongoose";

const FoodOrderItem = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
  quantity: { type: Number },
});

const FoodOrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
    orderNumber: { type: String, required: true, unique: true },
    userAddress: { type: String },
    foodOrderItems: [FoodOrderItem],
    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "DELIVERED"],
    },
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

export const foodOrderModel = mongoose.model("FoodOrder", FoodOrderSchema);
