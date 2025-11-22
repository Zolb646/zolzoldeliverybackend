import { UserModel } from "../../model/authModel.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password")
      .populate({
        path: "orderedFoods",
        populate: {
          path: "foodOrderItems",
          populate: {
            path: "food",
            select: "foodName",
          },
        },
      });

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    if (
      err instanceof jwt.TokenExpiredError ||
      err instanceof jwt.JsonWebTokenError
    ) {
      return res.status(403).json({
        message: "Invalid or expired token.",
        error: err.message,
      });
    }

    console.error(err);
    res.status(500).json({
      message: "Failed to fetch users",
      error: err.message,
    });
  }
};
