import { UserModel } from "../../model/authModel.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role?.toLowerCase() !== "admin") {
      return res.status(403).json({ message: "Admins only." });
    }

    const users = await UserModel.find().populate({
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
