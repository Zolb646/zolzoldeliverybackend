import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    ttl: { type: Date },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    orderedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodOrder" }],
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
